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
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] =
    React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/users/signup",
        user
      );
      console.log("signup response", response.data);
      router.push("/login");
    } catch (error) {
      console.log("signup error", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">
        {loading ? "processing" : "Signup"}
      </h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-400 rounded-md"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) =>
          setUser({ ...user, username: e.target.value })
        }
        placeholder="Username"
      />
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
        onClick={onSignup}
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login" className="text-blue-500">
        Login
      </Link>
    </div>
  );
};

export default page;
