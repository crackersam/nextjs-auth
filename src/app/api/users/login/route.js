import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // Check if the password is correct

    const validPassword = await bcryptjs.compare(
      password,
      user.password
    );
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 400 }
      );
    }

    // create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    // create token
    const token = jwt.sign(
      tokenData,
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const response = new NextResponse();

    cookies().set(
      "token",
      token,

      { httpOnly: true }
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
