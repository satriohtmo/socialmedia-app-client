"use client";

import { likedContentByUser } from "@/api/like";
import ProfileGallery from "@/components/Shared/ProfileGallery";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Likes() {
  const [content, setContent] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("access_token");
    if (!isLoggedIn) {
      router.push("/sign-in");
    }
    likedContentByUser().then((res) => {
      if (res) {
        setContent(res);
      }
    });
  }, []);

  return (
    <section className="relative">
      <p className="absolute top-0 left-0 text-light-1 bg-black bg-opacity-50 p-2 rounded-md">Liked Content by You</p>
      <ProfileGallery likedContent={content} />
    </section>
  );
}
