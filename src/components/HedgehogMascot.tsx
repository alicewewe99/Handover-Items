import React from 'react';

interface HedgehogMascotProps {
  className?: string;
  size?: number | string;
  showHalo?: boolean;
}

export const HedgehogMascot: React.FC<HedgehogMascotProps> = ({
  className = '',
  size = 64,
}) => {
  return (
    <div
      className={`inline-block relative select-none shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-label="刺蝟拿著看板：交班"
      role="img"
    >
      <img
        src="/pwa-192x192.png"
        alt="刺蝟拿著看板：交班"
        className="w-full h-full object-contain rounded-2xl drop-shadow-md transition-transform hover:scale-105"
        loading="eager"
      />
    </div>
  );
};
