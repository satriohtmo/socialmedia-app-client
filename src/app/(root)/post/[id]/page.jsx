"use client";

import { contentById } from "@/api/post";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PostId = () => {
  const [contents, setContents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    contentById(id).then((res) => {
      if (res) {
        setContents(res);
        console.log(res);
        console.log(contents);
      }
    });
  }, []);

  console.log(contents);

  return (
    <div>
      <h1>post detail</h1>
    </div>
  );
};

export default PostId;
