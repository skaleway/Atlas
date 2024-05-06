import React from "react";
import PaymentForm from "@/components/forms/payment-form";
import { currentProfile } from "@/lib/current-profile";
import { User } from "@prisma/client";

const Payment = async () => {
  const user = await currentProfile();
  return <PaymentForm user={user as User} />;

};

export default Payment;
