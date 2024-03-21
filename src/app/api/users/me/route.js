import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connect } from "@/dbConfig/dbConfig";

export const GET = async (request) => {
  try {
    connect();
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
