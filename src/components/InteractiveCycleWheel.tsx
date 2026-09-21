import React, { useState, useEffect } from 'react';
import { Play, Pause, Sparkles, Sprout, ShieldCheck, Sun, RotateCw, ArrowRight } from 'lucide-react';
import { ProcessStep } from '../types';

interface InteractiveCycleWheelProps {
  steps: ProcessStep[];
  activeStepIndex: number;
  onSelectStep: (index: number) => void;
}

// Stage metadata with specific biological indicators
const STAGE_METRICS = [
  {
    icon: Sparkles,
    label: 'Seed Sanctity',
    stageName: 'Indigenous Seeds',
    stat: '50+ Yrs',
    statDesc: 'Lineage',
    microMetric: 'Panchagavya Primed • 0% GMO Seeds',
    angle: 270, // 12 o'clock (top)
  },
  {
    icon: Sprout,
    label: 'Soil Living Loam',
    stageName: 'Living Loam',
    stat: '10x',
    statDesc: 'Earthworms',
    microMetric: 'Active Loam • 0.00% Synthetic NPK',
    angle: 0, // 3 o'clock (right)
  },
  {
    icon: ShieldCheck,
    label: 'Ecological Shield',
    stageName: 'Agniastra Shield',
    stat: '100%',
    statDesc: 'Safe Bio',
    microMetric: 'Marigold Traps • Ladybirds Preserved',
    angle: 90, // 6 o'clock (bottom)
  },
  {
    icon: Sun,
    label: 'Dawn Dispatch',
    stageName: 'Dawn Dispatch',
    stat: '< 12h',
    statDesc: 'Fresh Pluck',
    microMetric: '5 AM Hand-Plucked • 0% Plastic',
    angle: 180, // 9 o'clock (left)
  },
];

export const InteractiveCycleWheel: React.FC<InteractiveCycleWheelProps> = ({
  steps,
  activeStepIndex,
  onSelectStep,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const activeStep = steps[activeStepIndex] || steps[0];
  const activeMeta = STAGE_METRICS[activeStepIndex] || STAGE_METRICS[0];
  const ActiveIcon = activeMeta.icon;

  // Autoplay cycle timer
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50; // smooth 50ms ticks
    const totalStepDuration = 4500; // 4.5 seconds per stage
    const stepIncrement = (intervalTime / totalStepDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          onSelectStep((activeStepIndex + 1) % steps.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, activeStepIndex, steps.length, onSelectStep]);

  const handleNodeClick = (index: number) => {
    onSelectStep(index);
    setProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Base circular geometry math
  const size = 340;
  const center = size / 2; // 170
  const radius = 118; // radius where the 4 node centers sit

  return (
    <div className="w-full h-full bg-white rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#C68B59]/20 shadow-xl relative overflow-hidden flex flex-col justify-between">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(45,106,79,0.08)_0%,rgba(255,255,255,0)_70%)] pointer-events-none" />

      {/* Top Header of Wheel Container */}
      <div className="w-full flex items-center justify-between gap-2 pb-4 mb-2 border-b border-[#C68B59]/15 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C68B59] animate-ping" />
          <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#1A2421]">
            Biological Cycle Wheel
          </span>
        </div>

        {/* Autoplay toggle & manual rotation buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={togglePlay}
            id="toggle-wheel-autoplay"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1B4332] hover:bg-[#C68B59] text-[#FAF8F5] text-[11px] font-accent font-bold border border-[#C68B59]/40 transition-all cursor-pointer shadow-xs"
            aria-label={isPlaying ? 'Pause auto cycle' : 'Start auto cycle'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Auto</span>
              </>
            )}
          </button>
          <button
            onClick={() => handleNodeClick((activeStepIndex + 1) % steps.length)}
            className="p-1 rounded-lg border border-[#C68B59]/30 text-[#1B4332] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            title="Next stage"
            aria-label="Advance stage"
          >
            <RotateCw className="w-3 h-3 text-[#C68B59]" />
          </button>
        </div>
      </div>

      {/* THE INTERACTIVE CIRCULAR WHEEL STAGE */}
      <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-square mx-auto flex items-center justify-center my-2 select-none">
        {/* SVG Orbital Track with Ample Padding and No Intersecting Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Primary Orbital Path */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#1B4332"
            strokeOpacity="0.15"
            strokeWidth="2.5"
          />

          {/* Rotating Closed-Loop Energy Pulse Arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#C68B59"
            strokeWidth="2.5"
            strokeDasharray="6 8"
            className="animate-spin"
            style={{ animationDuration: '30s', transformOrigin: `${center}px ${center}px` }}
          />

          {/* Green Connector Ray to Active Stage */}
          {(() => {
            const angleRad = (activeMeta.angle * Math.PI) / 180;
            const x = center + (radius - 12) * Math.cos(angleRad);
            const y = center + (radius - 12) * Math.sin(angleRad);
            return (
              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#C68B59"
                strokeWidth="2"
                strokeDasharray="2 3"
                strokeOpacity="0.75"
              />
            );
          })()}
        </svg>

        {/* 4 INTERACTIVE CIRCULAR NODES WITH UNIFORM, EVEN PADDING */}
        {steps.map((step, idx) => {
          const meta = STAGE_METRICS[idx];
          const NodeIcon = meta.icon;
          const isActive = activeStepIndex === idx;

          // Trigonometric placement on circle perimeter
          const angleRad = (meta.angle * Math.PI) / 180;
          const xPercent = 50 + ((radius / (size / 2)) * 50 * Math.cos(angleRad));
          const yPercent = 50 + ((radius / (size / 2)) * 50 * Math.sin(angleRad));

          return (
            <div
              key={step.step}
              style={{
                position: 'absolute',
                left: `${xPercent}%`,
                top: `${yPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="z-20 group"
            >
              {/* Circular Node Button with clean, comfortable proportions */}
              <button
                onClick={() => handleNodeClick(idx)}
                id={`interactive-circle-node-${step.step}`}
                aria-label={`Stage 0${step.step}: ${step.title}`}
                className={`relative w-12 h-12 sm:w-13 sm:h-13 rounded-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer shadow-md active:scale-95 ${
                  isActive
                    ? 'bg-[#1B4332] text-[#FAF8F5] ring-3 ring-[#C68B59] scale-110 shadow-xl'
                    : 'bg-white text-[#1A2421] border-2 border-[#C68B59]/30 hover:border-[#1B4332] hover:scale-105 hover:bg-[#FAF8F5]'
                }`}
              >
                {/* Active Ping Beacon Ring */}
                {isActive && (
                  <span className="absolute -inset-1 rounded-full border border-[#40916C] animate-ping opacity-60 pointer-events-none" />
                )}

                {/* Node Index Badge with clear vertical offset */}
                <span
                  className={`text-[8px] font-heading font-extrabold uppercase px-1.5 py-0.2 rounded-full absolute -top-2 shadow-xs ${
                    isActive
                      ? 'bg-[#C68B59] text-white'
                      : 'bg-[#1B4332] text-[#FAF8F5]'
                  }`}
                >
                  0{step.step}
                </span>

                <NodeIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-[#40916C]' : 'text-[#1B4332]'}`} />
              </button>

              {/* Floating Stage Label with Even Symmetric Padding (Never touches the circle line) */}
              <div
                className={`absolute pointer-events-none whitespace-nowrap transition-all duration-200 z-30 ${
                  meta.angle === 270 // Stage 1 (top): float above
                    ? 'bottom-full mb-2.5 left-1/2 -translate-x-1/2'
                    : 'top-full mt-2.5 left-1/2 -translate-x-1/2' // Stages 2, 3, 4: float below with equal symmetric padding
                }`}
              >
                <div
                  className={`px-2.5 py-1 rounded-md text-[10px] font-accent font-bold shadow-md border ${
                    isActive
                      ? 'bg-[#1B4332] text-[#FAF8F5] border-[#C68B59]'
                      : 'bg-white text-[#1A2421] border-[#C68B59]/30 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {meta.stageName}
                </div>
              </div>
            </div>
          );
        })}

        {/* THE CENTER HUB - SIZED WITH GENEROUS INNER PADDING (NO TEXT TOUCHES CIRCLE RIM) */}
        <div
          onClick={() => handleNodeClick((activeStepIndex + 1) % steps.length)}
          className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-[#1B4332] border-2 border-[#C68B59] text-white p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-2xl z-10 cursor-pointer group hover:scale-102 transition-transform"
          title="Click to cycle next stage"
        >
          {/* Circular SVG Timer Progress Rim with ample clearance */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="69"
              className="text-white/10"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="80"
              cy="80"
              r="69"
              className="text-[#40916C] transition-all duration-100"
              strokeWidth="3"
              strokeDasharray={2 * Math.PI * 69}
              strokeDashoffset={2 * Math.PI * 69 * (1 - progress / 100)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Center Inner Content - STRICTLY BOUNDED WITH AMPLE EVEN CLEARANCE */}
          <div className="w-full max-w-[96px] sm:max-w-[108px] flex flex-col items-center justify-center space-y-1">
            <div className="flex items-center gap-1 text-[#40916C]">
              <ActiveIcon className="w-3.5 h-3.5 animate-bounce shrink-0" />
              <span className="text-[9px] font-accent uppercase tracking-wider font-extrabold truncate">
                Stage 0{activeStep.step} / 04
              </span>
            </div>

            {/* Stage Title with generous margin and constrained width */}
            <h4 className="font-heading font-bold text-[11px] sm:text-xs text-white leading-tight line-clamp-1 px-1 text-center truncate max-w-[94px]">
              {activeMeta.label}
            </h4>

            {/* Biological Stat Badge with even padding */}
            <div className="px-2 py-0.5 rounded-full bg-[#C68B59]/40 border border-[#40916C]/40 text-[#FAF8F5] text-[9px] font-accent font-bold max-w-[94px] truncate text-center">
              {activeMeta.stat} • {activeMeta.statDesc}
            </div>

            <span className="text-[8px] font-accent text-white/60 flex items-center gap-0.5 group-hover:text-[#40916C] transition-colors mt-0.5">
              <span>Tap next</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>
      </div>

      {/* 4-STAGE INTERACTIVE SELECTOR STRIP (CLEAN PADDING, PREVENTS EMPTY GUTTERS) */}
      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#C68B59]/15 relative z-10">
        {steps.map((step, idx) => {
          const meta = STAGE_METRICS[idx];
          const isSelected = activeStepIndex === idx;
          const NodeIcon = meta.icon;

          return (
            <button
              key={step.step}
              onClick={() => handleNodeClick(idx)}
              className={`p-2 rounded-xl text-left transition-all cursor-pointer flex items-center gap-2 border ${
                isSelected
                  ? 'bg-[#1B4332] text-white border-[#C68B59] shadow-sm ring-1 ring-[#40916C]/40'
                  : 'bg-[#FAF8F5] text-[#1A2421] border-[#C68B59]/20 hover:border-[#1B4332]'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-[#C68B59] text-[#FAF8F5]' : 'bg-white text-[#C68B59] border border-[#C68B59]/30'
                }`}
              >
                <NodeIcon className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-accent uppercase tracking-wider text-[#C68B59] font-bold leading-none">
                  Stage 0{step.step}
                </span>
                <span className={`text-[11px] font-heading font-semibold truncate ${isSelected ? 'text-white' : 'text-[#1A2421]'}`}>
                  {meta.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

