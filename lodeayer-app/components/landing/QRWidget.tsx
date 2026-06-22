import Link from "next/link";

export default function QRWidget() {
  return (
    <Link
      href="/evento/demo"
      className="hidden md:inline-flex fixed bottom-6 left-6 z-50 items-center gap-4 bg-[#0b0b0c]/80 border border-white/[0.10] rounded-2xl backdrop-blur-xl px-4 py-3 cursor-pointer hover:border-[#d9b98a]/30 transition-colors group shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
    >
      <svg width="52" height="52" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <rect x="1" y="1" width="7" height="7" rx="1" fill="#d9b98a" opacity="0.9"/>
        <rect x="2" y="2" width="5" height="5" rx="0.5" fill="#0b0b0c"/>
        <rect x="3" y="3" width="3" height="3" rx="0.3" fill="#d9b98a"/>
        <rect x="13" y="1" width="7" height="7" rx="1" fill="#d9b98a" opacity="0.9"/>
        <rect x="14" y="2" width="5" height="5" rx="0.5" fill="#0b0b0c"/>
        <rect x="15" y="3" width="3" height="3" rx="0.3" fill="#d9b98a"/>
        <rect x="1" y="13" width="7" height="7" rx="1" fill="#d9b98a" opacity="0.9"/>
        <rect x="2" y="14" width="5" height="5" rx="0.5" fill="#0b0b0c"/>
        <rect x="3" y="15" width="3" height="3" rx="0.3" fill="#d9b98a"/>
        <rect x="9" y="1" width="1" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="11" y="1" width="1" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="9" y="3" width="2" height="1" fill="#d9b98a" opacity="0.6"/>
        <rect x="9" y="5" width="1" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="11" y="5" width="1" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="9" y="7" width="2" height="1" fill="#d9b98a" opacity="0.6"/>
        <rect x="1" y="9" width="1" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="3" y="9" width="2" height="1" fill="#d9b98a" opacity="0.6"/>
        <rect x="6" y="9" width="1" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="9" y="9" width="1" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="11" y="9" width="1" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="13" y="9" width="2" height="1" fill="#d9b98a" opacity="0.6"/>
        <rect x="16" y="9" width="2" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="1" y="11" width="2" height="1" fill="#d9b98a" opacity="0.6"/>
        <rect x="4" y="11" width="1" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="7" y="11" width="1" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="9" y="11" width="2" height="1" fill="#d9b98a" opacity="0.6"/>
        <rect x="12" y="11" width="1" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="14" y="11" width="2" height="1" fill="#d9b98a" opacity="0.6"/>
        <rect x="17" y="11" width="1" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="9" y="13" width="1" height="2" fill="#d9b98a" opacity="0.8"/>
        <rect x="11" y="13" width="2" height="1" fill="#d9b98a" opacity="0.6"/>
        <rect x="14" y="13" width="1" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="16" y="13" width="1" height="2" fill="#d9b98a" opacity="0.6"/>
        <rect x="9" y="15" width="2" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="12" y="15" width="1" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="15" y="15" width="1" height="1" fill="#d9b98a" opacity="0.6"/>
        <rect x="18" y="15" width="1" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="9" y="17" width="1" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="11" y="17" width="2" height="1" fill="#d9b98a" opacity="0.6"/>
        <rect x="14" y="17" width="1" height="2" fill="#d9b98a" opacity="0.8"/>
        <rect x="16" y="17" width="2" height="1" fill="#d9b98a" opacity="0.6"/>
        <rect x="9" y="19" width="2" height="1" fill="#d9b98a" opacity="0.8"/>
        <rect x="12" y="19" width="1" height="1" fill="#d9b98a" opacity="0.6"/>
        <rect x="17" y="19" width="1" height="1" fill="#d9b98a" opacity="0.8"/>
      </svg>
      <div>
        <p className="text-[#f4efe7] text-sm font-medium group-hover:text-[#d9b98a] transition-colors">Escanear QR demo</p>
        <p className="text-[#f4efe7]/35 text-xs mt-0.5">Así lo ven tus invitados</p>
      </div>
    </Link>
  );
}
