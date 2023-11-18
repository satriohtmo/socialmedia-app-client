"use client";
import { allUsers } from "@/api/user";
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

  console.log(users);
  console.log(search);

  return (
    <div className="container mx-auto pt-2">
      <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-8">
        <input type="text" placeholder="Search..." className="border-none focus:outline-none text-lg font-medium rounded-lg px-4 py-2 bg-gray-100 w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {users &&
        users.map((user, index) => (
          <div className="flex items-center border-b border-gray-300 pb-4 mb-4" key={index}>
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <img src={user.profilepicture} alt="Profile Picture" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="ml-4">
              <Link href={`/user/${user.username}`}>
                <p className="text-sm text-light-1">@{user.username}</p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
