import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Vehicle {
  id: number;
  pathId: number;
  type: 'sedan' | 'suv' | 'tempo' | 'bus' | 'coach';
  color: string;
  roofColor: string;
  speed: number;
  progress: number;
  length: number;
  width: number;
  laneOffset: number;
}

/**
 * Evaluates a cubic Bezier curve at parameter t [0, 1]
 */
function getCubicBezier(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const oneMinusT = 1 - t;
  const a = oneMinusT * oneMinusT * oneMinusT;
  const b = 3 * oneMinusT * oneMinusT * t;
  const c = 3 * oneMinusT * t * t;
  const d = t * t * t;

  return {
    x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
    y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
  };
}

/**
 * Calculates tangent vector and angle on cubic Bezier
 */
function getCubicBezierTangent(p0: Point, p1: Point, p2: Point, p3: Point, t: number): { angle: number } {
  const oneMinusT = 1 - t;
  const dx = 3 * oneMinusT * oneMinusT * (p1.x - p0.x) + 6 * oneMinusT * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x);
  const dy = 3 * oneMinusT * oneMinusT * (p1.y - p0.y) + 6 * oneMinusT * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y);
  return { angle: Math.atan2(dy, dx) };
}

export const HighwayTrafficScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Highway Curves mapped to the visible lanes on the Bengaluru interchange background
    const getRoadPaths = (w: number, h: number) => [
      // 0: Main Lower Expressway — Outbound (Bottom-Left to Mid-Right)
      {
        p0: { x: -w * 0.05, y: h * 0.94 },
        p1: { x: w * 0.28, y: h * 0.76 },
        p2: { x: w * 0.62, y: h * 0.58 },
        p3: { x: w * 1.05, y: h * 0.42 },
      },
      // 1: Main Lower Expressway — Inbound (Mid-Right to Bottom-Left)
      {
        p0: { x: w * 1.05, y: h * 0.45 },
        p1: { x: w * 0.62, y: h * 0.61 },
        p2: { x: w * 0.28, y: h * 0.79 },
        p3: { x: -w * 0.05, y: h * 0.97 },
      },
      // 2: Sweeping Elevated Flyover Interchange Loop
      {
        p0: { x: w * 0.12, y: h * 0.35 },
        p1: { x: w * 0.38, y: h * 0.42 },
        p2: { x: w * 0.58, y: h * 0.52 },
        p3: { x: w * 0.88, y: h * 0.76 },
      },
      // 3: Northern Overpass Expressway (West to East)
      {
        p0: { x: -w * 0.05, y: h * 0.32 },
        p1: { x: w * 0.35, y: h * 0.38 },
        p2: { x: w * 0.68, y: h * 0.28 },
        p3: { x: w * 1.05, y: h * 0.18 },
      },
      // 4: Interchange Cloverleaf Ramp
      {
        p0: { x: w * 0.86, y: h * 0.74 },
        p1: { x: w * 0.66, y: h * 0.66 },
        p2: { x: w * 0.54, y: h * 0.48 },
        p3: { x: w * 0.42, y: h * 0.36 },
      },
    ];

    // Corporate Fleet Vehicle Palette
    const fleetVehicleTypes: Omit<Vehicle, 'id' | 'progress'>[] = [
      // 1. Staff Bus (Tata / Ashok Leyland Enterprise Transit)
      { pathId: 0, type: 'bus', color: '#1E3A8A', roofColor: '#F8FAFC', speed: 0.022, length: 48, width: 14, laneOffset: -6 },
      // 2. Toyota Innova Crysta (Silver Metallic MUV)
      { pathId: 0, type: 'suv', color: '#E2E8F0', roofColor: '#CBD5E1', speed: 0.034, length: 26, width: 11, laneOffset: 5 },
      // 3. Executive Sedan (Pearl White Dzire/Etios)
      { pathId: 0, type: 'sedan', color: '#F8FAFC', roofColor: '#E2E8F0', speed: 0.038, length: 22, width: 10, laneOffset: 6 },
      // 4. Force Tempo Traveller (Corporate Commuter Van)
      { pathId: 0, type: 'tempo', color: '#FFFFFF', roofColor: '#E2E8F0', speed: 0.028, length: 32, width: 12, laneOffset: -5 },
      // 5. Volvo Luxury Multi-Axle Coach (Intercity Delegation)
      { pathId: 1, type: 'coach', color: '#0F766E', roofColor: '#F1F5F9', speed: 0.024, length: 54, width: 15, laneOffset: -6 },
      // 6. Executive Sedan (Midnight Slate)
      { pathId: 1, type: 'sedan', color: '#1F2937', roofColor: '#374151', speed: 0.037, length: 22, width: 10, laneOffset: 5 },
      // 7. Toyota Innova Crysta (Gold / Bronze)
      { pathId: 1, type: 'suv', color: '#D97706', roofColor: '#B45309', speed: 0.032, length: 26, width: 11, laneOffset: -5 },
      // 8. Staff Bus (Blue)
      { pathId: 1, type: 'bus', color: '#2563EB', roofColor: '#FFFFFF', speed: 0.021, length: 48, width: 14, laneOffset: 6 },
      // 9. Tempo Traveller (Flyover Loop)
      { pathId: 2, type: 'tempo', color: '#FFFFFF', roofColor: '#E5E7EB', speed: 0.028, length: 30, width: 11, laneOffset: 0 },
      // 10. Corporate SUV (Flyover Loop)
      { pathId: 2, type: 'suv', color: '#CBD5E1', roofColor: '#94A3B8', speed: 0.036, length: 25, width: 10, laneOffset: 3 },
      // 11. Executive Sedan (North Flyover)
      { pathId: 3, type: 'sedan', color: '#F8FAFC', roofColor: '#E2E8F0', speed: 0.035, length: 20, width: 9, laneOffset: -4 },
      // 12. Corporate Coach (North Flyover)
      { pathId: 3, type: 'coach', color: '#1E40AF', roofColor: '#FFFFFF', speed: 0.025, length: 50, width: 13, laneOffset: 4 },
      // 13. Innova Crysta (Cloverleaf Ramp)
      { pathId: 4, type: 'suv', color: '#E2E8F0', roofColor: '#CBD5E1', speed: 0.031, length: 24, width: 10, laneOffset: 0 },
    ];

    // Initialize vehicle instances with staggered start positions
    const vehicles: Vehicle[] = fleetVehicleTypes.map((v, i) => ({
      ...v,
      id: i,
      progress: (i * 0.17 + 0.05) % 1,
    }));

    // Render Loop
    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const paths = getRoadPaths(w, h);

      // Draw and advance each vehicle
      vehicles.forEach((vehicle) => {
        if (!prefersReducedMotion) {
          vehicle.progress = (vehicle.progress + vehicle.speed * dt) % 1;
        }

        const path = paths[vehicle.pathId];
        if (!path) return;

        // Base point and orientation on curve
        const basePoint = getCubicBezier(path.p0, path.p1, path.p2, path.p3, vehicle.progress);
        const { angle } = getCubicBezierTangent(path.p0, path.p1, path.p2, path.p3, vehicle.progress);

        // Perspective depth scaling: farther up (smaller y) = smaller, closer (larger y) = larger
        const depthFactor = Math.max(0.36, Math.min(1.15, 0.32 + 0.78 * (basePoint.y / h)));

        // Perpendicular offset for multilane positioning
        const normalX = -Math.sin(angle);
        const normalY = Math.cos(angle);
        const posX = basePoint.x + normalX * vehicle.laneOffset * depthFactor;
        const posY = basePoint.y + normalY * vehicle.laneOffset * depthFactor;

        // Scaled dimensions
        const len = vehicle.length * depthFactor;
        const wid = vehicle.width * depthFactor;

        ctx.save();
        ctx.translate(posX, posY);
        ctx.rotate(angle);

        // 1. Soft Dynamic Ground Contact Shadow
        ctx.fillStyle = 'rgba(8, 12, 10, 0.42)';
        ctx.beginPath();
        ctx.ellipse(2 * depthFactor, 3 * depthFactor, (len * 0.54), (wid * 0.58), 0, 0, Math.PI * 2);
        ctx.fill();

        // 2. Realistic Vehicle Body
        // Main Chassis Base
        ctx.fillStyle = vehicle.color;
        ctx.beginPath();
        ctx.roundRect(-len / 2, -wid / 2, len, wid, 3 * depthFactor);
        ctx.fill();

        // Front Headlights & Projected Light Cones
        ctx.fillStyle = 'rgba(255, 250, 220, 0.9)';
        ctx.fillRect(len / 2 - 2 * depthFactor, -wid / 2 + 1 * depthFactor, 2 * depthFactor, 2.5 * depthFactor);
        ctx.fillRect(len / 2 - 2 * depthFactor, wid / 2 - 3.5 * depthFactor, 2 * depthFactor, 2.5 * depthFactor);

        // Soft Forward Light Beams on Road
        const beamGradient = ctx.createLinearGradient(len / 2, 0, len / 2 + 18 * depthFactor, 0);
        beamGradient.addColorStop(0, 'rgba(255, 245, 180, 0.35)');
        beamGradient.addColorStop(1, 'rgba(255, 245, 180, 0.0)');
        ctx.fillStyle = beamGradient;
        ctx.beginPath();
        ctx.moveTo(len / 2, -wid / 2);
        ctx.lineTo(len / 2 + 20 * depthFactor, -wid * 0.9);
        ctx.lineTo(len / 2 + 20 * depthFactor, wid * 0.9);
        ctx.lineTo(len / 2, wid / 2);
        ctx.closePath();
        ctx.fill();

        // Rear Dual LED Red Taillights
        ctx.fillStyle = 'rgba(239, 68, 68, 0.95)';
        ctx.fillRect(-len / 2, -wid / 2 + 1 * depthFactor, 1.5 * depthFactor, 2.2 * depthFactor);
        ctx.fillRect(-len / 2, wid / 2 - 3.2 * depthFactor, 1.5 * depthFactor, 2.2 * depthFactor);

        // Cabin Glass & Roof Highlights based on vehicle archetype
        if (vehicle.type === 'bus' || vehicle.type === 'coach') {
          // Large Panoramic Side Windows
          ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
          ctx.fillRect(-len * 0.38, -wid * 0.42, len * 0.72, wid * 0.84);
          // Roof AC Unit
          ctx.fillStyle = vehicle.roofColor;
          ctx.fillRect(-len * 0.1, -wid * 0.28, len * 0.38, wid * 0.56);
          // Destination board
          ctx.fillStyle = 'rgba(255, 121, 0, 0.75)';
          ctx.fillRect(len * 0.38, -wid * 0.25, 2 * depthFactor, wid * 0.5);
        } else if (vehicle.type === 'tempo') {
          // Passenger Van Windshield & Roof
          ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
          ctx.fillRect(-len * 0.32, -wid * 0.4, len * 0.62, wid * 0.8);
          ctx.fillStyle = vehicle.roofColor;
          ctx.fillRect(-len * 0.2, -wid * 0.3, len * 0.45, wid * 0.6);
        } else {
          // Sedan / SUV Windshield, Side Windows, and Roof
          ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
          ctx.beginPath();
          ctx.roundRect(-len * 0.28, -wid * 0.38, len * 0.52, wid * 0.76, 2 * depthFactor);
          ctx.fill();
          // Roof Panel
          ctx.fillStyle = vehicle.roofColor;
          ctx.beginPath();
          ctx.roundRect(-len * 0.15, -wid * 0.28, len * 0.32, wid * 0.56, 1.5 * depthFactor);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ opacity: 0.95 }}
    />
  );
};
