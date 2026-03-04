import type React from "react";

interface LeafMotifProps {
  className?: string;
  count?: number;
  opacity?: number;
  color?: string;
}

const LeafMotif: React.FC<LeafMotifProps> = ({
  className = "",
  count = 4,
  opacity = 0.08,
  color = "#8FAF7E",
}) => {
  const positions = [
    { top: "-5%", right: "-3%", size: 280, rotate: 0 },
    { top: "30%", left: "-4%", size: 200, rotate: 45 },
    { bottom: "-5%", right: "10%", size: 240, rotate: 90 },
    { top: "10%", right: "20%", size: 160, rotate: 135 },
    { bottom: "20%", left: "5%", size: 180, rotate: 60 },
  ];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {positions.slice(0, count).map((pos) => (
        <div
          key={`leaf-${pos.top ?? ""}-${pos.left ?? ""}-${pos.right ?? ""}-${pos.bottom ?? ""}`}
          style={{
            position: "absolute",
            top: pos.top,
            left: pos.left,
            right: pos.right,
            bottom: pos.bottom,
            width: pos.size,
            height: pos.size,
            borderRadius: "50% 0 50% 0",
            backgroundColor: color,
            opacity,
            transform: `rotate(${pos.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default LeafMotif;
