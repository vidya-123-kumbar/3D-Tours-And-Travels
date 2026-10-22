import React, { useState, useEffect, useRef } from 'react';
import { Award, Car, Building2, Clock, ShieldCheck, Zap } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './common/MotionReveal';

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  isActive: boolean;
}

const AnimatedCounter: React.FC<CounterProps> = ({ target, suffix = '', duration = 1800, isActive }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!isActive) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive, target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export const StatsSection: React.FC = () => {
  const [inView, setInView] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      numeric: 500,
      suffix: '+',
      label: 'Fleet Vehicles',
      sublabel: 'GPS & Telemetry Monitored',
      icon: Car,
    },
    {
      numeric: 10,
      suffix: '+',
      label: 'Corporate Clients',
      sublabel: 'Tech Parks & MNCs',
      icon: Building2,
    },
    {
      numeric: 15,
      suffix: '+',
      label: 'Years Experience',
      sublabel: 'Karnataka Operations',
      icon: Award,
    },
    {
      textDisplay: '24/7',
      label: 'Support Desk',
      sublabel: 'Live Operations Hub',
      icon: Clock,
    },
    {
      numeric: 100,
      suffix: '%',
      label: 'Police Verified',
      sublabel: 'POSH Compliant Chauffeurs',
      icon: ShieldCheck,
    },
    {
      numeric: 99.8,
      isFloat: true,
      suffix: '%',
      label: 'On-Time SLA',
      sublabel: 'Audited Punctuality',
      icon: Zap,
    },
  ];

  return (
    <section ref={sectionRef} id="stats" className="relative py-12 bg-[#111827] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer
          staggerChildren={0.08}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 perspective-container"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <StaggerItem
                key={stat.label}
                direction="up"
                className="h-full"
              >
                <div className="card-3d-tilt bg-[#1f2937]/80 h-full p-5 rounded-2xl border border-white/10 hover:border-orange-500/40 transition-all duration-300 group shadow-sm hover:shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-gray-600">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight group-hover:text-orange-400 transition-colors">
                      {stat.numeric !== undefined ? (
                        stat.isFloat ? (
                          <span>{inView ? '99.8%' : '0%'}</span>
                        ) : (
                          <AnimatedCounter target={stat.numeric} suffix={stat.suffix} isActive={inView} />
                        )
                      ) : (
                        <span>{stat.textDisplay}</span>
                      )}
                    </div>

                    <div className="text-xs sm:text-sm font-semibold text-white mt-1">
                      {stat.label}
                    </div>
                  </div>

                  <div className="text-[11px] text-gray-500 mt-2 line-clamp-1">
                    {stat.sublabel}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
