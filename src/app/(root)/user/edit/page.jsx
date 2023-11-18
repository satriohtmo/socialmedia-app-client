"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserByUsername } from "@/api/user";

export default function EditAccount() {
  const [user, setUser] = useState({
    profilepicture: "",
    username: "",
    name: "",
    email: "",
    bio: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((userData) => ({ ...userData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUser((userData) => ({ ...userData, profilepicture: file }));

    // Display preview of selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    getUserByUsername().then((res) => {
      if (res) {
        setUser(res); // Set user data as default values
        setPreviewImage(res.profilepicture); // Set profile picture URL as preview image
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", user.profilepicture);
      formData.append("upload_preset", "my-uploads");

      const response = await fetch("https://api.cloudinary.com/v1_1/dqak1psvn/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const uploadedFileURL = data.secure_url;

      const userData = {
        profilepicture: uploadedFileURL,
        username: user.username,
        name: user.name,
        email: user.email,
        bio: user.bio,
      };

      const serverResponse = await axios.put("http://localhost:14045/api/user/", userData, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      if (serverResponse) {
        router.push(`/user/${user.username}`);
      }

      console.log("Account has updated:", serverResponse.data);
    } catch (error) {
      console.error("Error update account:", error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center -mt-20">
      <div className="bg-dark-4 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="text-light-1 font-bold text-heading2-bold">Edit Account</h2>
          {/* <p className="text-small-medium mt-4 text-light-1">Edit your account here</p> */}

          <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
            {/* Profile Picture */}
            <div className="relative mt-4">
              <input className="opacity-0 absolute inset-0 w-full h-full z-10" type="file" name="profilepicture" onChange={handleFileChange} accept="image/*" />
              {previewImage && (
                <div className="relative">
                  <img src={previewImage} alt="Selected Profile" className="rounded-full h-20 w-20 object-cover border-4 border-gray-300" />
                  {/* <span className="absolute bottom-0 left-0 text-xs text-gray-400 ml-1 mb-1 z-20">Change Profile Picture</span> */}
                  <label className="text-gray-400" htmlFor="username">
                    change profile picture
                  </label>
                </div>
              )}
              {!previewImage && (
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gray-200 border-4 border-gray-300 z-0">
                  <span className="text-gray-400">Preview</span>
                </div>
              )}
            </div>

            {/* Username */}
            <label className="text-gray-400" htmlFor="username">
              Username
            </label>
            <input className="p-2 rounded-xl border" type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" id="username" />

            {/* Name */}
            <label className="text-gray-400" htmlFor="name">
              Name
            </label>
            <input className="p-2 rounded-xl border" type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" id="name" />

            {/* Email */}
            <label className="text-gray-400" htmlFor="email">
              Email
            </label>
            <input className="p-2 rounded-xl border" type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} id="email" />

            {/* Bio */}
            <label className="text-gray-400" htmlFor="email">
              Bio
            </label>
            <input className="p-2 rounded-xl border" type="bio" name="bio" placeholder="Bio" value={user.bio} onChange={handleChange} id="bio" />

            <button className="bg-gray-1 rounded-lg text-dark-1 py-2 hover:scale-105 duration-300 mt-5" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="md:block hidden w-full p-5">
          <img className="rounded-2xl" src="/login-logo.jpeg" />
        </div>
      </div>
    </section>
  );
}
