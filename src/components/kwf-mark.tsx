type KwfMarkProps = {
  className?: string;
};

export function KwfMark({ className }: KwfMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 96 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <path d="M2 2h6v10.5h3L21 2h8L16.2 15.25H10V14H8v1.25H2V2Z" />
        <path d="M2 16.75h6V18h2v-1.25h6.2L29 30h-8L11 19.5H8V30H2V16.75Z" />
        <path d="M30 2h7l5 18 5-13h6l5 13 5-18h7l-9 28h-6l-5-13-5 13h-6L30 2Z" />
        <path d="M72 2h22v6H79v5h12v2.25H72V2Z" />
        <path d="M72 16.75h19V19H79v11h-7V16.75Z" />
      </g>
      <rect
        className="opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        fill="#D7F75B"
        height="4"
        width="4"
        x="91"
        y="26"
      />
    </svg>
  );
}
