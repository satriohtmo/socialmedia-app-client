"use client";
import { sidebarLinks } from "../../constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Leftsidebar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        <Link href="/user/1" className="flex gap-3 items-center">
          <img src="/assets/profile-placeholder.svg" alt="profile" className="h-14 w-14 rounded-full" />
          <div className="flex flex-col">
            <p className="body-bold text-light-1">satriohutomo</p>
            <p className="small-regular text-gray-1">@user</p>
          </div>
        </Link>
        {sidebarLinks.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
          return (
            <Link href={link.route} key={link.label} className={`leftsidebar_link ${isActive && "bg-slate-700"}`}>
              <Image src={link.imgURL} alt={link.label} width={24} height={24} />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
