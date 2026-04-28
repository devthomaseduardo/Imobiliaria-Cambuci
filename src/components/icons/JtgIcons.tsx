import React from "react";

type IconProps = {
  size?: number;
  className?: string;
};

function Svg({
  size = 20,
  className,
  children,
  viewBox = "0 0 24 24",
}: React.PropsWithChildren<IconProps & { viewBox?: string }>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// Ícones proprietários: traço mais “editorial/premium” (monoline + cantos levemente arredondados).
export function IconPortfolio({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M8 7.2V6.6C8 5.716 8.716 5 9.6 5h4.8c.884 0 1.6.716 1.6 1.6v.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6.5 8.5h11c1.105 0 2 .895 2 2v7c0 1.105-.895 2-2 2h-11c-1.105 0-2-.895-2-2v-7c0-1.105.895-2 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 12h5.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function IconSpark({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M12 3l1.2 4.2L17.4 9 13.2 10.2 12 14.4 10.8 10.2 6.6 9l4.2-1.8L12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 12.5l.6 2.1 2.1.6-2.1.6-.6 2.1-.6-2.1-2.1-.6 2.1-.6.6-2.1Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconShieldCheck({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M12 3.5c2.8 2 5.2 2.3 7 2.5v7.1c0 4.2-3.2 7.2-7 8.4-3.8-1.2-7-4.2-7-8.4V6c1.8-.2 4.2-.5 7-2.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m9.2 12.3 1.8 1.8 3.8-4.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconChartUp({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M5.5 18.5V6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5.5 18.5H18.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7.8 14.2 10.7 11.3 13 13.6 17 9.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 9.6h-3.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17 9.6v3.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

