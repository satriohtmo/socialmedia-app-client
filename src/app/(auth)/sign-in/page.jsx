"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [items, setItems] = useState([]);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((userData) => ({ ...userData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        email: user.email,
        password: user.password,
      };

      const serverResponse = await axios.post("http://localhost:14045/api/login", userData);

      if (serverResponse) {
        setItems(serverResponse.data);
        router.push("/");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("access_token", items.access_token);
  }, [items]);

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-dark-4 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        {/* form */}
        <div className="md:w-1/2 px-8">
          <h2 className="text-light-1 font-bold text-heading2-bold">Sign-In</h2>
          <p className="text-small-medium mt-4 text-light-1">If you already have account</p>

          <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input className="p-2 mt-8 rounded-xl border" type="text" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
            <div>
              <input className="p-2 rounded-lg border w-full" type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
            </div>
            <button className="bg-gray-1 rounded-lg text-dark-1 py-2 hover:scale-105 duration-300" type="submit">
              Submit
            </button>
          </form>

          <div className="mt-10 grid grid-cols-3 items-center text-light-1">
            <hr className="border-light-1" />
            <p className="text-center">OR</p>
            <hr className="border-light-1" />
          </div>

          <a href="/">
            <p className="mt-5 text-small-regular text-light-1 border-b border-light-1 py-4">Forgot password</p>
          </a>

          <div className="mt-3 text-small-regular flex justify-between items-center">
            <p className="text-light-1">Don't have an account ?</p>
            <a className="py-2 px-5 bg-gray-1 rounded-xl hover:scale-105 duration-300" href="/sign-up">
              Register
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
