"use client";
import { getUserByUsername } from "@/api/user";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Leftsidebar() {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        setIsLoggedIn(true);
        try {
          const userData = await getUserByUsername();
          if (userData) {
            setUsers(userData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    checkLoggedIn();
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
      route: "/create-post",
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
      label: "Profile",
    },
  ];

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {/* {users && (
          <Link href={`/user/${users.username}`} className="flex gap-3 items-center">
            <img src={users.profilepicture} alt="profile" className="h-14 w-14 rounded-full" />
            <div className="flex flex-col">
              <p className="body-bold text-light-1">{users.name}</p>
              <p className="small-regular text-gray-1">@{users.username}</p>
            </div>
          </Link>
        )} */}
        {sidebarLinks.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
          return (
            <Link href={link.route} key={link.label} className={`leftsidebar_link ${isActive && "bg-slate-700"}`}>
              <Image src={link.imgURL} alt={`Link to ${link.label}`} width={24} height={24} />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
