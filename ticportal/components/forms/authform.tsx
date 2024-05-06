"use client";

import { newUser } from "@/types";
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import Register from "./registerForm";
import Login from "./loginform";

type AuthFormProps = {
  formType: "Register" | "Login";
};

const AuthForm: FC<AuthFormProps> = ({ formType }) => {
  if (formType === "Register") {
    return <Register />;
  }

  return <Login />;
};

export default AuthForm;
