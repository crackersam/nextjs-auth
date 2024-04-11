"use client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import React from "react";

const logout = () => {
  const router = useRouter();
  const logoutfn = async () => {
    try {
      await fetch("/api/users/logout", {
        credentials: "include",
      });
      toast.success("Logged out");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <span onClick={logoutfn} className="cursor-pointer">
      Logout
    </span>
  );
};

export default logout;
