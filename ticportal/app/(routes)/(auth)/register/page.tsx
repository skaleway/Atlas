import AuthForm from "@/components/forms/authform";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Register - Sign Up",
  description: "Create your user account and start being a new leader",
};

const Register = async () => {
  const user = await currentUser();

  if (user) {
    return redirect("/");
  }

  return (
    <div>
      <AuthForm formType="Register" />
    </div>
  );
};

export default Register;
