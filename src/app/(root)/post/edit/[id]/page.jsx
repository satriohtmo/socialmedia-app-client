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

  console.log(content);

  return (
    <div className="flex flex-1">
      <div className="common-container -mt-10">
        {/* <div className="max-w-5xl flex-start gap-3 justify-start w-full items-center">
          <div className="flex items-center gap-4 mb-9">
            <Image src="/assets/create.svg" width={36} height={36} alt="post" />
            <h2 className="h3-bold md:h2-bold text-light-1 text-left">edit post</h2>
          </div>
        </div> */}
        {/* <FormPost edit={true} postId={content} /> */}
        <EditForm postId={content} />
      </div>
    </div>
  );
};

export default EditPost;
