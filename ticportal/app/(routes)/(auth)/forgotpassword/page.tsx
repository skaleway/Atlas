import ForgotPaswordClient from "@/components/forms/forgotpassword";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Forgot-Password",
  description: "Have you forgotten your password? You can still recover that.",
};

const Forgotpassword = () => {
  return <ForgotPaswordClient />;
};

export default Forgotpassword;
