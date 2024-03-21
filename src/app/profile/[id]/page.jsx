import React from "react";

const page = ({ params }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page of {params.id}
      </p>
    </div>
  );
};

export default page;
