"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [data, setData] = React.useState("");
  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out");
      router.push("/login");
    } catch (error) {
      console.log(error.message);

      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">Profile</h1>
      <h2 className="bg-green-500 padding rounded text-1.5xl">
        {data &&
          Object.entries(data).map(([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))}
      </h2>
      <hr />
      <p>Profile page</p>
      <hr />
      <button
        onClick={logout}
        className="p-2 my-2 bg-blue-500 text-white rounded-md"
      >
        Logout
      </button>
      {!data && (
        <button
          onClick={getUserDetails}
          className="p-2 my-2 bg-blue-500 text-white rounded-md"
        >
          Get user details
        </button>
      )}
    </div>
  );
};

export default page;
