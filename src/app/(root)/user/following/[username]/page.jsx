"use client";
import { getFollowing } from "@/api/follow";
import { getUserByName } from "@/api/user";
import Profile from "@/components/Shared/Profile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Following() {
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserByName(username);
        if (user) {
          setUsers(user);
        }

        const userFollowing = await getFollowing(user.id);
        if (userFollowing) {
          setFollowing(userFollowing);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto pt-2">
      <div className="text-center">
        <div className="text-lg font-semibold text-light-1">Following</div>
        <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-4"></div>
        <Profile userFollowing={following} />
      </div>
    </div>
  );
}
