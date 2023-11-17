"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditForm({ postId }) {
  const [content, setContent] = useState({
    photo: "",
    description: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((postData) => ({ ...postData, [name]: value }));
  };

  console.log(postId);
  console.log(content);

  useEffect(() => {
    if (postId.description) {
      setContent((prevContent) => ({
        ...prevContent,
        description: postId.description,
      }));
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        description: content.description,
      };

      const serverResponse = await axios.put(`http://localhost:14045/api/content/${postId.id}`, postData, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      if (serverResponse) {
        router.push(`/`);
      }

      console.log("Content has updated:", serverResponse.data);
    } catch (error) {
      console.error("Error update content:", error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center -mt-20">
      <div className="bg-dark-4 flex flex-col items-center rounded-2xl shadow-lg max-w-3xl p-5">
        <h2 className="text-light-1 font-bold text-heading2-bold mb-4">Edit Content</h2>

        <div className="relative w-full mb-6">
          <div className="rounded-lg overflow-hidden border-4 border-gray-300">
            <img src={postId.photo} alt="Selected Profile" className="object-cover w-full h-80" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-40 text-white text-center">Photo cannot be edited</div>
        </div>

        <form action="" className="w-full mt-4" onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="text-gray-400" htmlFor="description">
              Description
            </label>
            <textarea className="p-2 rounded-xl border w-full h-24" name="description" value={content.description} onChange={handleChange} placeholder="Description" id="description"></textarea>
          </div>

          <button className="bg-gray-1 rounded-lg text-dark-1 py-2 hover:scale-105 duration-300 mt-4 w-32" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
