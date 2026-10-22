import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LuxuryVehicle3DProps {
  color: string;
  headlightsOn?: boolean;
  autoRotate?: boolean;
  mousePosition: { x: number; y: number };
  vehicleType?: 'sedan' | 'suv' | 'ev' | 'van' | 'coach';
  isDriving?: boolean;
}

/**
 * Realistic Corporate Passenger Vehicle (Executive MPV / Premium SUV)
 * Modeled for professional corporate mobility (Innova Hycross / Executive Passenger Van style)
 * Clean proportions, realistic wheels, headlights, chrome grille, panoramic windows
 */
export const LuxuryVehicle3D: React.FC<LuxuryVehicle3DProps> = ({
  color,
  headlightsOn = true,
  autoRotate = true,
  mousePosition,
  vehicleType = 'suv',
  isDriving = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);
  const targetRotation = useRef({ x: 0, y: 0 });
  const autoRotateAngle = useRef<number>(-0.52);

  // 1. Realistic Automotive Paint (Metallic / Pearl Coat)
  const carPaintMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      metalness: 0.65,
      roughness: 0.22,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.85,
    });
  }, [color]);

  // 2. Tinted Executive Privacy Glass
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1E293B'),
      metalness: 0.2,
      roughness: 0.08,
      transmission: 0.8,
      transparent: true,
      opacity: 0.82,
    });
  }, []);

  // 3. Chrome Trim Material (Grille, Window surround, Emblems)
  const chromeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E2E8F0'),
      metalness: 0.95,
      roughness: 0.12,
    });
  }, []);

  // 4. Matte Black Trim & Undercarriage
  const blackTrimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1F2937'),
      roughness: 0.7,
      metalness: 0.1,
    });
  }, []);

  // 5. Tire Rubber Material
  const tireMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#181E29'),
      roughness: 0.85,
      metalness: 0.05,
    });
  }, []);

  // 6. Alloy Wheel Rim Material
  const alloyRimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#CBD5E1'),
      metalness: 0.9,
      roughness: 0.25,
    });
  }, []);

  // 7. Clean Corporate Headlight Glass & Reflectors
  const headlightLensMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#F8FAFC'),
      transmission: 0.9,
      transparent: true,
      opacity: 0.9,
      roughness: 0.05,
    });
  }, []);

  const headlightBulbMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: headlightsOn ? new THREE.Color('#FFFFFF') : new THREE.Color('#CBD5E1'),
      emissive: headlightsOn ? new THREE.Color('#F8FAFC') : new THREE.Color('#000000'),
      emissiveIntensity: headlightsOn ? 1.8 : 0,
      roughness: 0.2,
    });
  }, [headlightsOn]);

  // 8. Elegant Taillight Lens
  const taillightMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#DC2626'),
      emissive: new THREE.Color('#991B1B'),
      emissiveIntensity: 0.9,
      roughness: 0.2,
    });
  }, []);

  // Subtle natural floating, showroom turntable rotation & wheel spinning
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Showroom rotation sweep or interactive mouse lock
    if (autoRotate) {
      autoRotateAngle.current += 0.006;
      targetRotation.current.y = autoRotateAngle.current + (mousePosition.x * 0.15);
    } else {
      const baseAngleY = -0.52;
      targetRotation.current.y = baseAngleY + (mousePosition.x * 0.25);
    }
    targetRotation.current.x = (-mousePosition.y * 0.08) + 0.02;

    // Dynamic suspension float and road driving rumble
    const driveRumble = isDriving ? Math.sin(time * 18) * 0.015 : 0;
    const suspensionFloat = Math.sin(time * 1.6) * 0.035 + driveRumble;
    groupRef.current.position.y = suspensionFloat;
    
    // Dynamic forward/backward movement surge when in driving mode
    if (isDriving) {
      groupRef.current.position.z = Math.sin(time * 2.8) * 0.15;
    } else {
      groupRef.current.position.z = 0;
    }

    // Smooth lerp for professional damping
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation.current.y, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation.current.x, 0.05);

    // Dynamic headlight emissive pulsation
    if (headlightsOn && headlightBulbMaterial) {
      headlightBulbMaterial.emissiveIntensity = 1.6 + Math.sin(time * 3) * 0.25;
    }

    // Active wheel spin and front steering angle
    const wheelSpinSpeed = isDriving ? 0.18 : autoRotate ? 0.035 : 0.008;
    wheelsRef.current.forEach((wheel, idx) => {
      if (wheel) {
        wheel.rotation.x += wheelSpinSpeed;
        // Front wheels turn with mouse/steering
        if (idx === 0 || idx === 1) {
          wheel.rotation.y = mousePosition.x * 0.3;
        }
      }
    });

    // Dynamic vehicle category proportions
    const targetScale = vehicleType === 'sedan' ? [0.94, 0.82, 0.96] :
                        vehicleType === 'ev' ? [0.96, 0.90, 0.96] :
                        vehicleType === 'van' ? [1.02, 1.15, 1.18] :
                        vehicleType === 'coach' ? [1.10, 1.25, 1.35] : [1, 1, 1];
    groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale[0], 0.05);
    groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale[1], 0.05);
    groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale[2], 0.05);
  });

  return (
    <group ref={groupRef} position={[0.2, 0, 0]}>
      {/* ── LOWER CHASSIS & UNDERBODY ── */}
      <mesh position={[0, -0.22, 0]} material={blackTrimMaterial}>
        <boxGeometry args={[1.95, 0.15, 4.4]} />
      </mesh>

      {/* ── MAIN VEHICLE LOWER BODY ── */}
      <mesh position={[0, 0.1, 0.05]} material={carPaintMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.96, 0.52, 4.3]} />
      </mesh>

      {/* Hood Slope (Aerodynamic Front) */}
      <mesh position={[0, 0.26, 1.45]} rotation={[-0.12, 0, 0]} material={carPaintMaterial} castShadow>
        <boxGeometry args={[1.9, 0.2, 1.35]} />
      </mesh>

      {/* Front Bumper & Lower Air Dam */}
      <mesh position={[0, -0.05, 2.18]} material={carPaintMaterial}>
        <boxGeometry args={[1.94, 0.38, 0.25]} />
      </mesh>
      <mesh position={[0, -0.16, 2.22]} material={blackTrimMaterial}>
        <boxGeometry args={[1.5, 0.14, 0.12]} />
      </mesh>

      {/* Front Chrome Grille */}
      <group position={[0, 0.12, 2.22]}>
        <mesh material={chromeMaterial}>
          <boxGeometry args={[1.35, 0.28, 0.06]} />
        </mesh>
        {/* Horizontal Chrome Slats */}
        {[-0.07, 0, 0.07].map((yOffset, i) => (
          <mesh key={i} position={[0, yOffset, 0.04]} material={chromeMaterial}>
            <boxGeometry args={[1.25, 0.02, 0.02]} />
          </mesh>
        ))}
        {/* SVT Corporate Emblem Badge */}
        <mesh position={[0, 0.02, 0.05]}>
          <cylinderGeometry args={[0.07, 0.07, 0.02, 24]} />
          <meshStandardMaterial color="#17365D" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Front LED Projector Headlights (Dual Sleek Clusters) */}
      {[-0.78, 0.78].map((xOffset, i) => (
        <group key={i} position={[xOffset, 0.16, 2.14]} rotation={[0, xOffset > 0 ? 0.2 : -0.2, 0]}>
          {/* Headlight Housing */}
          <mesh material={blackTrimMaterial}>
            <boxGeometry args={[0.34, 0.15, 0.12]} />
          </mesh>
          {/* LED Projector Bulb */}
          <mesh position={[0, 0, 0.04]} material={headlightBulbMaterial}>
            <boxGeometry args={[0.26, 0.08, 0.04]} />
          </mesh>
          {/* Transparent Polycarbonate Lens */}
          <mesh position={[0, 0, 0.06]} material={headlightLensMaterial}>
            <boxGeometry args={[0.32, 0.13, 0.02]} />
          </mesh>
        </group>
      ))}

      {/* ── PASSENGER CABIN & GREENHOUSE ── */}
      {/* Cabin Body Frame (Pillars & Roof) */}
      <mesh position={[0, 0.62, -0.32]} material={carPaintMaterial} castShadow>
        <boxGeometry args={[1.74, 0.54, 2.7]} />
      </mesh>

      {/* Front Windshield (Aerodynamic Rake) */}
      <mesh position={[0, 0.54, 0.96]} rotation={[0.55, 0, 0]} material={glassMaterial}>
        <boxGeometry args={[1.7, 0.68, 0.06]} />
      </mesh>

      {/* Panoramic Side Windows (Executive Tint) */}
      {[-0.88, 0.88].map((xOffset, i) => (
        <group key={i} position={[xOffset, 0.60, -0.32]}>
          {/* Front Row Window */}
          <mesh position={[0, 0, 0.8]} material={glassMaterial}>
            <boxGeometry args={[0.04, 0.44, 0.75]} />
          </mesh>
          {/* Middle Passenger Window */}
          <mesh position={[0, 0, -0.05]} material={glassMaterial}>
            <boxGeometry args={[0.04, 0.44, 0.85]} />
          </mesh>
          {/* Rear Quarter Window */}
          <mesh position={[0, 0, -0.85]} material={glassMaterial}>
            <boxGeometry args={[0.04, 0.40, 0.65]} />
          </mesh>
          {/* Chrome Window Beltline Trim */}
          <mesh position={[0, -0.23, 0]} material={chromeMaterial}>
            <boxGeometry args={[0.05, 0.025, 2.5]} />
          </mesh>
        </group>
      ))}

      {/* Rear Windshield */}
      <mesh position={[0, 0.58, -1.68]} rotation={[-0.32, 0, 0]} material={glassMaterial}>
        <boxGeometry args={[1.66, 0.58, 0.06]} />
      </mesh>

      {/* Rear Tailgate & LED Taillights */}
      <mesh position={[0, 0.1, -2.12]} material={carPaintMaterial}>
        <boxGeometry args={[1.94, 0.54, 0.18]} />
      </mesh>
      {/* Horizontal Taillight Bar */}
      <mesh position={[0, 0.22, -2.2]} material={taillightMaterial}>
        <boxGeometry args={[1.72, 0.1, 0.05]} />
      </mesh>
      {/* Rear Bumper & Reflector */}
      <mesh position={[0, -0.08, -2.16]} material={blackTrimMaterial}>
        <boxGeometry args={[1.92, 0.24, 0.18]} />
      </mesh>

      {/* Low-Profile Chrome Roof Rails */}
      {[-0.72, 0.72].map((xOffset, i) => (
        <mesh key={i} position={[xOffset, 0.91, -0.32]} material={chromeMaterial}>
          <boxGeometry args={[0.04, 0.03, 2.3]} />
        </mesh>
      ))}

      {/* Aerodynamic Side Mirrors with Chrome Cap */}
      {[-1.02, 1.02].map((xOffset, i) => (
        <group key={i} position={[xOffset, 0.45, 0.95]}>
          <mesh material={carPaintMaterial}>
            <boxGeometry args={[0.2, 0.11, 0.14]} />
          </mesh>
          <mesh position={[xOffset > 0 ? -0.09 : 0.09, 0, -0.02]} material={glassMaterial}>
            <boxGeometry args={[0.02, 0.09, 0.11]} />
          </mesh>
        </group>
      ))}

      {/* Chrome Flush Door Handles */}
      {[
        [-0.99, 0.25, 0.4],
        [-0.99, 0.25, -0.5],
        [0.99, 0.25, 0.4],
        [0.99, 0.25, -0.5],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} material={chromeMaterial}>
          <boxGeometry args={[0.03, 0.035, 0.18]} />
        </mesh>
      ))}

      {/* ── 4 REALISTIC WHEELS & ALLOY RIMS ── */}
      {[
        { x: -0.96, y: -0.25, z: 1.35, isLeft: true },
        { x: 0.96, y: -0.25, z: 1.35, isLeft: false },
        { x: -0.96, y: -0.25, z: -1.35, isLeft: true },
        { x: 0.96, y: -0.25, z: -1.35, isLeft: false },
      ].map((wheelConfig, idx) => (
        <group
          key={idx}
          ref={(el) => {
            if (el) wheelsRef.current[idx] = el;
          }}
          position={[wheelConfig.x, wheelConfig.y, wheelConfig.z]}
        >
          {/* Wheel Arch Lining */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[wheelConfig.isLeft ? 0.04 : -0.04, 0, 0]}>
            <cylinderGeometry args={[0.42, 0.42, 0.18, 28]} />
            <meshStandardMaterial color="#0F172A" roughness={0.9} />
          </mesh>

          {/* Tire Rubber */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={tireMaterial} castShadow>
            <cylinderGeometry args={[0.39, 0.39, 0.24, 32]} />
          </mesh>

          {/* Alloy Wheel Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={alloyRimMaterial}>
            <cylinderGeometry args={[0.26, 0.26, 0.25, 32]} />
          </mesh>

          {/* Chrome Multi-Spoke Face (Flush with outer wheel rim) */}
          <group position={[wheelConfig.isLeft ? -0.12 : 0.12, 0, 0]}>
            {[0, 36, 72, 108, 144].map((deg, sIdx) => (
              <mesh key={sIdx} rotation={[(deg * Math.PI) / 180, 0, 0]} material={chromeMaterial}>
                <boxGeometry args={[0.02, 0.42, 0.03]} />
              </mesh>
            ))}
            {/* Center Cap */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.08, 0.08, 0.03, 24]} />
              <meshStandardMaterial color="#17365D" metalness={0.85} roughness={0.2} />
            </mesh>
          </group>

          {/* Disc Brake Rotor */}
          <mesh
            position={[wheelConfig.isLeft ? 0.05 : -0.05, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.2, 0.2, 0.02, 24]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
