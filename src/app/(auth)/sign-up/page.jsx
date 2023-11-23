"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { regisValidation } from "@/lib/validation/user";

export default function SignUp() {
  const [previewImage, setPreviewImage] = useState(null);
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("profilepicture", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("file", values.profilepicture);
      formData.append("upload_preset", "my-uploads");

      const response = await fetch("https://api.cloudinary.com/v1_1/dqak1psvn/image/upload", {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      const uploadedFileURL = data.secure_url;

      const userData = {
        profilepicture: uploadedFileURL,
        username: values.username,
        name: values.name,
        email: values.email,
        password: values.password,
      };

      const serverResponse = await axios.post("https://captiverse-app.up.railway.app/api/register", userData);

      if (serverResponse) {
        router.push("/sign-in");
      }
    } catch (error) {
      return [];
    }
  };

  const formik = useFormik({
    initialValues: {
      profilepicture: "",
      username: "",
      name: "",
      email: "",
      password: "",
    },
    validationSchema: regisValidation,
    onSubmit: handleSubmit,
  });

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-dark-4 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        {/* form */}
        <div className="md:w-1/2 px-8">
          <h2 className="text-light-1 font-bold text-heading2-bold">Sign-Up</h2>
          <p className="text-small-medium mt-4 text-light-1">Create an account</p>

          <form action="" className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <div className="relative mt-8 w-24 h-24">
              <input className="opacity-0 absolute inset-0 w-full h-full z-10" type="file" name="profilepicture" onChange={handleFileChange} accept="image/*" />
              {previewImage && (
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <img src={previewImage} alt="Selected Profile" className="object-cover w-full h-full" />
                  <label className="text-gray-400 absolute bottom-0 left-0 text-xs ml-1 mb-1 z-20 cursor-pointer" htmlFor="profilepicture">
                    Change
                  </label>
                </div>
              )}
              {!previewImage && (
                <label className="flex items-center justify-center w-full h-full rounded-full bg-gray-200 border-4 border-gray-300 z-0 cursor-pointer" htmlFor="profilepicture">
                  <span className="text-gray-400">Select Photo</span>
                </label>
              )}
              {formik.errors.profilepicture && formik.touched.profilepicture && <div className="text-red text-sm">{formik.errors.profilepicture}</div>}
            </div>
            <input className="p-2 rounded-xl border" type="text" name="username" value={formik.values.username} onChange={formik.handleChange} placeholder="Username" />
            {formik.errors.username && formik.touched.username && <div className="text-red text-sm">{formik.errors.username}</div>}
            <input className="p-2 rounded-xl border" type="text" name="name" value={formik.values.name} onChange={formik.handleChange} placeholder="Name" />
            {formik.errors.name && formik.touched.name && <div className="text-red text-sm">{formik.errors.name}</div>}
            <input className="p-2 rounded-xl border" type="email" name="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} />
            {formik.errors.email && formik.touched.email && <div className="text-red text-sm">{formik.errors.email}</div>}
            <div>
              <input className="p-2 rounded-xl border w-full" type="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Password" />
              {formik.errors.password && formik.touched.password && <div className="text-red text-sm">{formik.errors.password}</div>}
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
          <img className="rounded-2xl" src="/login-logo.jpeg" alt="Login Logo" />
        </div>
      </div>
    </section>
  );
}
