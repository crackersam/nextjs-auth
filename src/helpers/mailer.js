import nodemailer from "nodemailer";
import User from "@/models/User";
import bcryptjs from "bcryptjs";

export const sendMail = async ({
  email,
  emailType,
  userId,
}) => {
  try {
    const hashedToken = await bcryptjs.hash(
      userId.toString(),
      10
    );

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "FORGOT") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    } else {
      throw new Error("Invalid email type");
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "d4ed9a80ae4f49",
        pass: "0a00df60868ecb",
      },
    });

    const mailOptions = {
      from: "sam@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify your email"
          : "Reset your password",
      html: `<a href="http://localhost:3000/${emailType.toLowerCase()}/${hashedToken}">Click here to ${emailType.toLowerCase()}</a>`,
    };
    const mailResponse = await transport.sendMail(
      mailOptions
    );
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
