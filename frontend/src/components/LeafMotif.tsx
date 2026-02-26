import React from 'react';

interface LeafMotifProps {
  count?: number;
  opacity?: number;
  color?: string;
}

const positions = [
  { top: '10%', left: '5%', rotate: 15, size: 80 },
  { top: '60%', left: '2%', rotate: -20, size: 60 },
  { top: '20%', right: '4%', rotate: 45, size: 70 },
  { top: '75%', right: '6%', rotate: -10, size: 90 },
  { top: '45%', left: '50%', rotate: 30, size: 50 },
];

export default function LeafMotif({ count = 3, opacity = 0.08, color = '#8B1A1A' }: LeafMotifProps) {
  return (
    <>
      {positions.slice(0, Math.min(count, 5)).map((pos, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: pos.top,
            left: 'left' in pos ? pos.left : undefined,
            right: 'right' in pos ? (pos as any).right : undefined,
            transform: `rotate(${pos.rotate}deg)`,
            width: pos.size,
            height: pos.size,
            opacity,
          }}
        >
          <svg viewBox="0 0 100 100" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5 L95 50 L50 95 L5 50 Z" />
          </svg>
        </div>
      ))}
    </>
  );
}
