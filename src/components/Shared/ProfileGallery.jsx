import React from "react";

const ProfileGallery = ({ userContent }) => {
  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-3 gap-4 mt-6">
      {userContent &&
        userContent.map((content, index) => (
          <div key={index} className="relative group">
            <img src={content.photo} alt={`Post ${index}`} className="w-full h-60 object-cover rounded-md cursor-pointer" />
            <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center transition duration-300">
              <div className="bg-black bg-opacity-75 rounded-md p-2">
                <p className="text-white text-sm">{content.description}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProfileGallery;
