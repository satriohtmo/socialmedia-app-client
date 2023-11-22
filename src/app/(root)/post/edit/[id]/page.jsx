"use client";

import { contentById } from "@/api/post";
import EditForm from "@/components/Form/EditPostForm";
import FormPost from "@/components/Form/PostForm";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditPost = () => {
  const [content, setContent] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    contentById(id).then((res) => {
      if (res) {
        setContent(res);
      }
    });
  }, []);

  return (
    <div className="flex flex-1">
      <div className="common-container -mt-10">
        <EditForm postId={content} />
      </div>
    </div>
  );
};

export default EditPost;
