"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPost } from "@/api/post";
import { getUserByUsername } from "@/api/user";
import { dislikeContent, likeContent } from "@/api/like";
import Modal from "./Modal";

const PostCard = () => {
  const [contents, setContents] = useState([]);
  const [currentUserID, setCurrentUserID] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleLike = async (postId) => {
    const updatedContents = contents.map((content) => {
      if (content.id === postId) {
        if (content.Likes.includes(currentUserID)) {
          // User already liked the post, so dislike it
          dislikeContent(postId);
          // Remove current user from Likes array
          content.Likes = content.Likes.filter((userId) => userId !== currentUserID);
        } else {
          // User has not liked the post, so like it
          likeContent(postId);
          // Add current user to Likes array
          content.Likes.push(currentUserID);
        }
      }
      return content;
    });

    setContents(updatedContents);
  };

  const openModal = (contents) => {
    setModalContent(contents);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
            <div onClick={() => openModal(content)}>
              <img src={content.photo} alt="post" className="post-card_img mt-4 rounded-md cursor-pointer" />
            </div>
            <div className="mt-4 md:mt-6 ">
              <p className="text-light-2 text-sm md:text-base mb-2">{content.description}</p>
              <div className="flex justify-between items-center z-20  border-t border-gray-300">
                <div className="flex gap-2 mr-5 mt-2">
                  <Image src={content.Likes.includes(currentUserID) ? "/assets/liked.svg" : "/assets/like.svg"} alt="like" width={20} height={20} className="cursor-pointer" onClick={() => handleLike(content.id)} />
                  <Link href={`/post/${content.id}`}>
                    <Image src="/assets/comment.svg" alt="comment" width={29} height={25} className="cursor-pointer" />
                  </Link>
                </div>
                <div className="flex gap-2 mt-4">
                  {currentUserID === content.User.id && (
                    <Link href={`/post/edit/${content.id}`}>
                      <Image src="/assets/edit.svg" alt="edit" width={20} height={20} className="cursor-pointer" />
                    </Link>
                  )}
                </div>
              </div>
              <p className="subtle-medium lg:subtle-medium text-light-2 ml-1 mt-0.5">{content.Likes.length} likes</p>
            </div>
          </div>
        ))}
      <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
    </div>
  );
};

export default PostCard;
