"use client";
import { allUsers } from "@/api/user";
import Profile from "@/components/Shared/Profile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Search() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    allUsers(search).then((res) => {
      if (res) {
        setUsers(res);
      }
    });
  }, [search]);

  return (
    <div className="container mx-auto pt-2">
      <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-8">
        <input type="text" placeholder="Search..." className="border-none focus:outline-none text-lg font-medium rounded-lg px-4 py-2 bg-gray-100 w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div>
        <Profile searchUser={users} />
      </div>
    </div>
  );
}
