"use client";
import { getFollowers } from "@/api/follow";
import { getUserByName } from "@/api/user";
import Profile from "@/components/Shared/Profile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Follower() {
  const [users, setUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserByName(username);
        if (user) {
          setUsers(user);
        }

        const userFollower = await getFollowers(user.id);
        if (userFollower) {
          setFollowers(userFollower);
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
        <div className="text-lg font-semibold text-light-1">Followers</div>
        <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-4"></div>
        <Profile userFollowers={followers} />
      </div>
    </div>
  );
}
