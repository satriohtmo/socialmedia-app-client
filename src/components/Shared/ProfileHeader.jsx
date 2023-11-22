"use client";

import { following, getFollowers, getFollowing, sumFollow, unfollow } from "@/api/follow";
import { getUserByName, getUserByUsername } from "@/api/user";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileHeader() {
  const [users, setUsers] = useState([]);
  const [datas, setDatas] = useState([]);
  const [userLogin, setUserLogin] = useState([]);
  const [sum, setSum] = useState([]);
  const [userFollowing, setUserFollwing] = useState("");
  const [userFollowers, setUserFollowers] = useState("");
  const { username } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserByName(username);
        if (userData) {
          setUsers(userData);
        }

        const sumData = await sumFollow();
        if (sumData) {
          setDatas(setSum);
        }

        const userFollowing = await getFollowing(userData.id);
        if (userFollowing) {
          setUserFollwing(userFollowing);
        }

        const userFollowers = await getFollowers(userData.id);
        if (userFollowers) {
          setUserFollowers(userFollowers);
        }

        const userLogin = await getUserByUsername();
        if (userLogin) {
          setUserLogin(userLogin);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const ownProfile = users?.username === userLogin?.username;

  const handleFollow = async () => {
    try {
      const userId = userLogin && userLogin.id;
      const isFollowing = datas && datas.isFollowing;

      if (isFollowing) {
        await unfollow(users.id);
        setDatas((prevData) => ({
          ...prevData,
          isFollowing: false,
        }));
        const followingData = await getFollowing(users.id); // Fetch following after unfollow
        setUserFollwing(followingData || []);
        const followersData = await getFollowers(users.id);
        setUserFollowers(followersData);
      } else {
        await following(users.id, userId);
        setDatas((prevData) => ({
          ...prevData,
          isFollowing: true,
        }));
        const followingData = await getFollowing(users.id); // Fetch following after follow
        setUserFollwing(followingData || []);
        const followersData = await getFollowers(users.id);
        setUserFollowers(followersData);
      }
    } catch (error) {
      console.error("Error handling follow action:", error);
    }
  };

  return (
    <div className="flex w-full flex-col justify-start">
      {users && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Profile picture */}
              <div className="relative h-20 w-20 object-cover">
                <img src={users.profilepicture} alt="ProfilePicture" className="rounded-full" />
              </div>
              {/* Username */}
              <div className="flex flex-col">
                <h2 className="text-heading3-bold text-light-1">{users.name}</h2>
                <p className="text-base-medium text-gray-1">@{users.username}</p>
              </div>
            </div>

            {/* Follow button */}
            <div>
              {ownProfile ? (
                // Show "Edit" button for the user's own profile
                <Link href="/user/edit/">
                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded">Edit</button>
                </Link>
              ) : (
                // Show "Follow" button for other profiles
                <button onClick={handleFollow} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded">
                  {datas && datas.isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-6">
            {/* Posts */}
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-light-1">Posts</p>
              <p className="text-2xl font-semibold text-light-1"> {users && users.Posts ? users.Posts.length : 0}</p>
            </div>

            {/* Followers */}
            {/* <div className="flex flex-col items-center ml-8"> */}
            <Link href={`/user/followers/${users.username}`} className="flex flex-col items-center ml-8">
              <p className="text-lg font-bold text-light-1">Followers</p>
              <p className="text-2xl font-semibold text-light-1">{userFollowers ? userFollowers.length : 0}</p>
            </Link>
            {/* </div> */}

            {/* Following */}
            {/* <div className="flex flex-col items-center ml-8"> */}
            <Link href={`/user/following/${users.username}`} className="flex flex-col items-center ml-8">
              <p className="text-lg font-bold text-light-1">Following</p>
              <p className="text-2xl font-semibold text-light-1">{userFollowing ? userFollowing.length : 0}</p>
            </Link>
            {/* </div> */}
          </div>
          <p className="mt-6 max-w-lg text-base-regular text-light-2">{users.bio}</p>

          <div className="mt-1 h-0.5 w-full bg-dark-3" />
        </>
      )}
    </div>
  );
}
