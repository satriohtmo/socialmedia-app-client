import Image from "next/image";
import React from "react";

const PostStats = () => {
  return (
    <div>
      <div className="flex justify-between items-center z-20 mt-4">
        <div className="flex gap-2 mr-5">
          <Image src="/assets/like.svg" alt="like" width={20} height={20} className="cursor-pointer" />
          <p className="small-medium lg:base-medium text-light-2">5</p>
        </div>

        <div className="flex gap-2">
          <Image src="/assets/edit.svg" alt="share" width={20} height={20} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default PostStats;
