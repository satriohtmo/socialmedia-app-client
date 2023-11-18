"use client";
import ProfileHeader from "@/components/Shared/ProfileHeader";
import { getUserByName, getUserByUsername } from "@/api/user";
import { useEffect, useState } from "react";
import ProfileGallery from "@/components/Shared/ProfileGallery";
import { useParams, useRouter } from "next/navigation";

export default function Profile() {
  const [users, setUsers] = useState([]);
  const { username } = useParams();
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("access_token");

    if (!isLoggedIn) {
      router.push("/sign-in");
    }

    getUserByName(username).then((res) => {
      if (res) {
        setUsers(res.Posts);
      }
    });
  }, []);

  return (
    <section>
      <ProfileHeader />
      <div className="mt-9">
        <ProfileGallery userContent={users} />
      </div>
    </section>
  );
}
