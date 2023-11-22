import Link from "next/link";
import React from "react";

const ProfileGallery = ({ userContent, likedContent }) => {
  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-3 gap-4 mt-6">
      {userContent &&
        userContent.map((content, index) => (
          <div key={index} className="relative group">
            <Link href={`/post/${content.id}`}>
              <img src={content.photo} alt={`Post ${index}`} className="w-full h-60 object-cover rounded-md cursor-pointer" />
              <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center transition duration-300">
                <div className="bg-black bg-opacity-75 rounded-md p-2">
                  <p className="text-white text-sm">{content.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}

      {likedContent &&
        likedContent.map((liked, index) => (
          <div key={index} className="relative group mt-10">
            {/* Display liked content */}
            <img src={liked.Post.photo} alt={`Liked Post ${index}`} className="w-full h-60 object-cover rounded-md cursor-pointer" />
            <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center transition duration-300">
              <div className="bg-black bg-opacity-75 rounded-md p-2">
                <p className="text-white text-sm">{liked.Post.description}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProfileGallery;
