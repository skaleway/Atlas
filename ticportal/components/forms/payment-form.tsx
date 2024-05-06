"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { User as UserProfile } from "@prisma/client";

import Image from "next/image";
import axios from "axios";
import payment from "@/lib/pay";

export type PaymentData = {
  amount: number;
  email: string;
  externalId: number;
  userId: string;
  redirectUrl: string;
  message: string;
};

interface PaymentResponse {
  message: string;
  link: string;
  transId: string;
  dateInitiated: string;
  statusCode: number;
}

const PaymentForm = ({ user }: { user: UserProfile }) => {
  const { username, email, userId } = user;
  const [paymentData, setPaymentData] = useState<PaymentData>({
    amount: 5000,
    email,
    externalId: 2000,
    userId,
    redirectUrl: "https://portal.ticsummit.org/",
    message: "Payment for Registration fee",
  });

  const initiatePayment = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const resp = await payment.initiatePay(paymentData);

      const newResposnse = resp as PaymentResponse;

      setTimeout(() => {
        window.location.href = newResposnse.link;
      }, 5000);

      const updateData = {
        paid: true,
      };

      const updateResp = await axios.put(
        `/api/paid_users/${userId}`,
        updateData
      );
      console.log(updateResp);

      console.log(updateResp);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return null;

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="space-y-4" onSubmit={initiatePayment}>
        <div>
          <label htmlFor="amount" className="font-medium flex justify-center">
            Amount to Pay:{" "}
            <strong className="text-red-500 px-[10px]">5,000 FCFA</strong>
          </label>
          <div className="pt-[40px]">
            <Image
              src="/mtn-orange.png"
              alt="mtn/orange image here"
              height={400}
              width={400}
            />
          </div>
        </div>

        <div className="flex w-full justify-center">
          <button type="submit" className="custom-button">
            Initiate Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
