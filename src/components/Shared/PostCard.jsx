"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PostStats from "./PostStats";
import { useRouter } from "next/navigation";
import { getPost } from "@/api/post";
import Image from "next/image";
import { getUserByUsername } from "@/api/user";

const PostCard = () => {
  const [contents, setContents] = useState([]);
  const [currentUserID, setCurrentUserID] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getPost().then((res) => {
      if (res) {
        setContents(res);
      }
    });

    const token = localStorage.getItem("access_token");
    if (token) {
      getUserByUsername(token).then((userInfo) => {
        if (userInfo) {
          setCurrentUserID(userInfo.id);
        }
      });
    }
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto">
      {contents &&
        contents.map((content, index) => (
          <div key={index} className={`post-card bg-white p-4 px-4 md:p-6 rounded-lg shadow-md relative ${index !== contents.length - 1 ? "mb-6" : ""}`}>
            <div className="flex flex-col lg:flex-row items-start justify-between">
              <div className="flex items-center gap-3">
                <Link href={`/user/${content.User.username}`}>
                  <img src={content.User.profilepicture} alt="creator" className="w-12 lg:w-12 lg:h-12 rounded-full" />
                </Link>

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">{content.User.username}</p>
                </div>
              </div>
            </div>
            <Link href={`/post/${content.id}`}>
              <img src={content.photo} alt="post" className="post-card_img mt-4 rounded-md" style={{ width: "100%", height: "auto" }} />
            </Link>
            <div className="mt-4 md:mt-6">
              <p className="text-light-2 text-sm md:text-base">{content.description}</p>
            </div>

            {/* <PostStats /> */}
            <div>
              <div className="flex justify-between items-center z-20 mt-4">
                <div className="flex gap-2 mr-5">
                  <Image src="/assets/like.svg" alt="like" width={20} height={20} className="cursor-pointer" />
                  <p className="small-medium lg:base-medium text-light-2">{content.Likes.like}</p>
                </div>

                <div className="flex gap-2">
                  {currentUserID === content.User.id && ( // Compare current user's ID with the post creator's ID
                    <Link href={`/post/edit/${content.id}`}>
                      <Image src="/assets/edit.svg" alt="edit" width={20} height={20} className="cursor-pointer" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostCard;
