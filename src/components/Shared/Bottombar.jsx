"use client";

import { getUserByUsername } from "@/api/user";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Bottombar() {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    getUserByUsername().then((res) => {
      if (res) {
        setUsers(res);
      }
    });
  }, []);

  const sidebarLinks = [
    {
      imgURL: "/assets/home.svg",
      route: "/",
      label: "Home",
    },
    {
      imgURL: "/assets/search.svg",
      route: "/search",
      label: "Search",
    },
    {
      imgURL: "/assets/heart.svg",
      route: "/post/likes",
      label: "Activity",
    },
    {
      imgURL: "/assets/create.svg",
      route: "/create-post",
      label: "Post",
    },
    {
      imgURL: "/assets/user.svg",
      route: `/user/${users.username}`,
      label: "User",
    },
  ];
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
          return (
            <Link href={link.route} key={link.label} className={`bottombar_link ${isActive && "bg-slate-700"}`}>
              <Image src={link.imgURL} alt={`Link to ${link.label}`} width={24} height={24} />
              <p className="text-subtle-medium text-light-1 max-sm:hidden">{link.label.split(/\s+/)[0]}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
