import React, { useRef, useState, ChangeEvent, FormEvent } from "react";
import { useSignUp } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Verifier = ({ email }: { email: string }) => {
  const { isLoaded, setActive, signUp } = useSignUp();
  const inputs = useRef<HTMLInputElement[]>([]);
  const [activationCode, setActivationCode] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;
    try {
      // Submit the code that the user provides to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: activationCode,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        toast.success("User created succesfull");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (err: any) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    let val = event.target.value;

    // if value has just been pasted
    if (val.length > 1) {
      // put each digit in a separate input field
      const digits = val.split("");
      for (
        let i = index;
        i < index + digits.length && i < inputs.current.length;
        i++
      ) {
        inputs.current[i].value = digits[i - index];
      }
      // move focus to the last input with new value
      inputs.current[Math.min(index + digits.length - 1, 5)].focus();
    }
    // check if input value has more than 1 digit
    if (val.length === 1) {
      // move to the next input if available
      if (inputs.current[index + 1]) {
        inputs.current[index + 1].focus();
      }
    } else if (val.length > 1) {
      // take the first digit and move to the next input
      let nextInput = inputs.current[index + 1];
      if (nextInput) {
        inputs.current[index].value = val[0];
        nextInput.focus();
      }
    }
    // update the activation code state with all values
    let updatedActivationCode = "";
    inputs.current.forEach((input) => {
      updatedActivationCode += input.value;
    });
    setActivationCode(updatedActivationCode);
  };

  return (
    <div>
      <div className="flexcol gap-4">
        <div className="flexcol gap-4">
          <h2 className="text_sm mb-8">Verify Your Account</h2>
          <p>
            We send you the six-digit code to {email} <br /> Enter the code
            below to confirm your email address.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="activation__wrapper">
          <div className="flex-between">
            {[...new Array(6)].map((_, i) => (
              <input
                key={i}
                className="h-12 w-12 border-zinc-500/25 border-2 placeholder:text-center p-1 outline-none rounded text-center"
                placeholder="0"
                min="0"
                max="9"
                ref={(el) => (inputs.current[i] = el!)}
                onChange={(e) => handleChange(i, e)}
                required
              />
            ))}
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              className="bg-zinc-500 text-white py-2 px-4 rounded hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed w-full"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verifier;
