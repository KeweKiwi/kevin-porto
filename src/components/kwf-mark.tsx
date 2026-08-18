import Image from "next/image";

type KwfMarkProps = {
  className?: string;
};

export function KwfMark({ className }: KwfMarkProps) {
  return (
    <Image
      alt="KWF logo"
      className={className}
      height={32}
      priority
      src="/icons/kwf-logo.png"
      style={{ height: "auto", objectFit: "contain" }}
      width={96}
    />
  );
}
