import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connect } from "@/dbConfig/dbConfig";
import { cookies } from "next/headers";

export const GET = async (request) => {
  try {
    // connect();

    // const token = request.cookies.get("token")?.value || "";
    // console.log(token, "token");

    console.log("token", cookies().get("token").value);
    const id = await getDataFromToken(request);
    const user = await User.findById(id).select(
      "-password"
    );
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
};
