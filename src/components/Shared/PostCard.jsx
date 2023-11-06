import React from "react";
import Link from "next/link";
import PostStats from "./PostStats";

const PostCard = () => {
  return (
    <div className="post-card bg-white p-4 md:p-6 rounded-lg shadow-md relative">
      <div className="flex flex-col lg:flex-row items-start justify-between">
        <div className="flex items-center gap-3">
          <Link href="/user/1">
            <img src="/assets/profile-placeholder.svg" alt="creator" className="w-12 lg:w-12 lg:h-12 rounded-full" />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {/* {post.creator.name} */}
              saul
            </p>
            {/* <div className="flex items-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular"></p>
              <p className="subtle-semibold lg:small-regular">
              
                hawai
              </p>
            </div> */}
          </div>
        </div>
      </div>

      {/* <Link href="/" className="lg:absolute top-4 right-4">
        <img src="/assets/edit.svg" alt="edit" width={20} height={20} />
      </Link> */}

      <Link href="/post/1">
        <img src="/ferrari.jpg" alt="post image" className="post-card_img mt-4" />
      </Link>

      <div className="mt-4 md:mt-6">
        <p className="text-light-2 text-sm md:text-base">description</p>
        {/* <ul className="flex flex-wrap gap-1 mt-2">
          <li className="text-light-3 small-regular">#tag</li>
        </ul> */}
      </div>
      <PostStats />
    </div>
  );
};

export default PostCard;
