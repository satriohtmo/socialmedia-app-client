"use client";

import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
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
    <h1>hi</h1>
    // <Card color="white" className="rounded-none flex justify-center items-center py-10" shadow={false}>
    //   <Typography variant="h4" color="blue-gray">
    //     Sign In
    //   </Typography>
    //   <Typography color="gray" className="mt-1 font-normal">
    //     Enter your details to log-in.
    //   </Typography>
    //   <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" color="yellow">
    //     <div className="mb-4 flex flex-col gap-6" color="white">
    //       <Input size="lg" label="Email" />
    //       <Input type="password" size="lg" label="Password" />
    //     </div>
    //     <Button type="submit" className="mt-6" fullWidth>
    //       Submit
    //     </Button>
    //     <Typography color="gray" className="mt-4 text-center font-normal">
    //       Don't have an account?{" "}
    //       <a href="/register" className="font-medium text-blue-500 transition-colors hover:text-blue-700">
    //         Sign Up
    //       </a>
    //     </Typography>
    //   </form>
    // </Card>
  );
}
