"use client";

import { loginValidation } from "@/lib/validation/user";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [items, setItems] = useState([]);
  const [apiError, setApiError] = useState(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const serverResponse = await axios.post("https://captiverse-app.up.railway.app/api/login", values);
        if (serverResponse) {
          setItems(serverResponse.data);
          localStorage.setItem("access_token", serverResponse.data.access_token);
          router.push("/");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setApiError(error.response.data.message);
        }
        console.error("Error creating user:", error);
      }
    },
    validationSchema: loginValidation,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    setApiError(null);
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-dark-4 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        {/* form */}
        <div className="md:w-1/2 px-8">
          <h2 className="text-light-1 font-bold text-heading2-bold">Sign-In</h2>
          <p className="text-small-medium mt-4 text-light-1">If you already have account</p>

          <form action="" className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <input className="p-2 mt-8 rounded-xl border" name="email" placeholder="Email" value={formik.values.email} onChange={handleChange} />
            {formik.touched.email && formik.errors.email ? <div className="text-red text-sm">{formik.errors.email}</div> : null}
            <div>
              <input className="p-2 rounded-lg border w-full" type="password" name="password" placeholder="Password" value={formik.values.password} onChange={handleChange} />
              {formik.touched.password && formik.errors.password ? <div className="text-red text-sm">{formik.errors.password}</div> : null}
            </div>
            <button className="bg-gray-1 rounded-lg text-dark-1 py-2 hover:scale-105 duration-300" type="submit">
              Submit
            </button>
            {apiError && <div className="text-red text-sm">{apiError}</div>}
          </form>

          <div className="mt-10 grid grid-cols-3 items-center text-light-1">
            <hr className="border-light-1" />
            <p className="text-center">OR</p>
            <hr className="border-light-1" />
          </div>

          <div className="mt-3 text-small-regular flex justify-between items-center">
            <p className="text-light-1">Don't have an account ?</p>
            <a className="py-2 px-5 bg-gray-1 rounded-xl hover:scale-105 duration-300" href="/sign-up">
              Register
            </a>
          </div>
        </div>

        <div className="md:block hidden w-1/2 p-5">
          <img className="rounded-2xl" src="/login-logo.jpeg" />
        </div>
      </div>
    </section>
  );
}
