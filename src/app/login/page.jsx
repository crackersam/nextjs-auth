"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] =
    React.useState(false);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/users/login",
        user
      );
      console.log(response.data);
      toast.success(response.data.message);
      router.push("/profile");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">
        {loading ? "processing" : "Login"}
      </h1>
      <hr />

      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-400 rounded-md"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) =>
          setUser({ ...user, email: e.target.value })
        }
        placeholder="Email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-400 rounded-md"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) =>
          setUser({ ...user, password: e.target.value })
        }
        placeholder="Password"
      />
      <button
        className="p-2 my-3 bg-blue-500 text-white rounded-md"
        onClick={onLogin}
      >
        Login
      </button>
      <Link href="/signup" className="text-blue-500">
        Signup
      </Link>
    </div>
  );
};

export default page;
