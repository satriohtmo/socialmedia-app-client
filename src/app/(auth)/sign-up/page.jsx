"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [user, setUser] = useState({
    profilepicture: "",
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((userData) => ({ ...userData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUser((userData) => ({ ...userData, profilepicture: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", user.profilepicture);
      formData.append("upload_preset", "my-uploads");

      const response = await fetch("https://api.cloudinary.com/v1_1/dqak1psvn/image/upload", {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      const uploadedFileURL = data.secure_url;

      const userData = {
        profilepicture: uploadedFileURL,
        username: user.username,
        name: user.name,
        email: user.email,
        password: user.password,
      };

      const serverResponse = await axios.post("http://localhost:14045/api/register", userData);

      if (serverResponse) {
        router.push("/sign-in");
      }

      console.log("User created:", serverResponse.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-dark-4 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        {/* form */}
        <div className="md:w-1/2 px-8">
          <h2 className="text-light-1 font-bold text-heading2-bold">Sign-Up</h2>
          <p className="text-small-medium mt-4 text-light-1">Create an account</p>

          <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input className="p-2 mt-8 bg-light-1 rounded-xl border" type="file" name="profilepicture" onChange={handleFileChange} accept="image/*" placeholder="Profile Picture" />
            <input className="p-2 rounded-xl border" type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" />
            <input className="p-2 rounded-xl border" type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" />
            <input className="p-2 rounded-xl border" type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
            <div>
              <input className="p-2 rounded-xl border w-full" type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
            </div>
            <button className="bg-gray-1 rounded-lg text-dark-1 py-2 hover:scale-105 duration-300" type="submit">
              Submit
            </button>
          </form>

          <div className="mt-3 text-small-regular flex justify-between items-center border-t border-light-1">
            <p className="text-light-1 mt-2">Have an account ?</p>
            <a className="py-2 px-5 bg-gray-1 rounded-xl hover:scale-105 duration-300 mt-2" href="/sign-in">
              Sign-in
            </a>
          </div>
        </div>

        {/* image */}
        <div className="md:block hidden w-1/2 p-5">
          <img className="rounded-2xl" src="/login-logo.jpeg" />
        </div>
      </div>
    </section>
  );
}
