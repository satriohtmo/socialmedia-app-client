"use client";
import ProfileHeader from "@/components/Shared/ProfileHeader";
import { getUserByName, getUserByUsername } from "@/api/user";
import { useEffect, useState } from "react";
import ProfileGallery from "@/components/Shared/ProfileGallery";
import { useParams } from "next/navigation";

export default function Profile() {
  const [users, setUsers] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    getUserByName(username).then((res) => {
      if (res) {
        setUsers(res.Posts);
        console.log(res.Posts);
      }
      console.log(users);
    });
  }, []);

  //   console.log(users.Post);

  return (
    <section>
      <ProfileHeader />
      <div className="mt-9">
        <ProfileGallery userContent={users} />
      </div>
    </section>
  );
}
