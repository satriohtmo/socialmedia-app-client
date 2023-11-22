"use client";

import { contentById } from "@/api/post";
import PostDetail from "@/components/PostDetail/PostDetail";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PostId = () => {
  const [contents, setContents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    contentById(id).then((res) => {
      if (res) {
        setContents(res);
      }
    });
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <PostDetail postDetail={contents} />
    </div>
  );
};

export default PostId;
