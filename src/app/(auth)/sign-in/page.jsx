"use client";

import { Card, Checkbox, Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
// import { useEffect, useState } from "react";
// import { login } from "@/api/login";
// import { redirect } from "next/dist/server/api-utils";
// import { useRouter } from "next/navigation";

export default function SignIn() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [items, setItems] = useState([]);
  // const router = useRouter();

  // function handleLogin(e) {
  //   e.preventDefault();
  //   login(email, password).then((response) => {
  //     if (response) {
  //       setItems(response);
  //       router.push("/");
  //     }
  //     console.log(response);
  //   });
  // }

  // useEffect(() => {
  //   localStorage.setItem("access_token", JSON.stringify(items.access_token));
  //   console.log(items.access_token);
  // }, [items]);

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-dark-4 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        {/* form */}
        <div className="md:w-1/2 px-8">
          <h2 className="text-light-1 font-bold text-heading2-bold">Sign-In</h2>
          <p className="text-small-medium mt-4 text-light-1">If you already have account</p>

          <form action="" className="flex flex-col gap-4">
            <input className="p-2 mt-8 rounded-xl border" type="text" name="email" placeholder="Email.." />
            <div>
              <input className="p-2 rounded-lg border w-full" type="password" name="password" placeholder="Password.." />
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
