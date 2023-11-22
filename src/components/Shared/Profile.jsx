import Link from "next/link";
import React from "react";

const Profile = ({ searchUser, userFollowing, userFollowers }) => {
  return (
    <div>
      {searchUser &&
        searchUser.map((user, index) => (
          <div className="flex items-center border-b border-gray-300 pb-4 mb-4" key={index}>
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <img src={user.profilepicture} alt="Profile Picture" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="ml-4">
              <Link href={`/user/${user.username}`}>
                <p className="text-sm text-light-1">@{user.username}</p>
              </Link>
            </div>
          </div>
        ))}

      {userFollowing &&
        userFollowing.map((user, index) => (
          <div className="flex items-center border-b border-gray-300 pb-4 mb-4" key={index}>
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Link href={`/user/${user.Following.username}`}>
                <img src={user.Following.profilepicture} alt="Profile Picture" className="w-full h-full object-cover rounded-full" />
              </Link>
            </div>
            <div className="ml-4">
              <Link href={`/user/${user.Following.username}`}>
                <p className="text-sm text-light-1">@{user.Following.username}</p>
              </Link>
            </div>
          </div>
        ))}

      {userFollowers &&
        userFollowers.map((user, index) => (
          <div className="flex items-center border-b border-gray-300 pb-4 mb-4" key={index}>
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Link href={`/user/${user.Follower.username}`}>
                <img src={user.Follower.profilepicture} alt="Profile Picture" className="w-full h-full object-cover rounded-full" />
              </Link>
            </div>
            <div className="ml-4">
              <Link href={`/user/${user.Follower.username}`}>
                <p className="text-sm text-light-1">@{user.Follower.username}</p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Profile;
