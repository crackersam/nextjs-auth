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
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY"
          ? "verify your email"
          : "reset your password"
      }
          or copy and paste the link below in your browser. <br> ${
            process.env.DOMAIN
          }/verifyemail?token=${hashedToken}
          </p>`,
    };
    const mailResponse = await transport.sendMail(
      mailOptions
    );
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
