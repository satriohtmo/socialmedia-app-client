import Image from "next/image";
import Link from "next/link";

export default function Topbar() {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo.png" alt="logo" width={28} height={28} />
        <p className="font-dosis text-heading3-bold text-light-1 max-xs:hidden">Captiverse</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <div className="flex cursor-pointer">
            <Image src="/logo.png" width={24} height={24} />
          </div>
        </div>
      </div>
    </nav>
  );
}
