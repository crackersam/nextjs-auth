import Logout from "@/components/logout";
import { getData } from "@/helpers/cookie";

const getUserDetails = async () => {
  try {
    const res = await getData(
      "http://localhost:3000/api/users/me",
      { credentials: "include" }
    );

    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

const page = async () => {
  const data = await getUserDetails();

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
      <Logout />
      <hr />
    </div>
  );
};

export default page;
