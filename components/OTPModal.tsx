"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { verifySecret, sendEmailOTP } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const OtpModal = ({
  accountId,
  email,
}: {
  accountId: string;
  email: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sessionId = await verifySecret({ accountId, password });
      if (sessionId) router.push("/");
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const userId = await sendEmailOTP({ email });
      if (userId) {
        toast({
          title: "New code sent",
          description: "Check your email for a fresh verification code.",
        });
        return;
      }
      toast({
        variant: "destructive",
        title: "Couldn’t resend code",
        description: "Something went wrong. Try again in a moment.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Couldn’t resend code",
        description: "Something went wrong. Try again in a moment.",
      });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex w-full min-w-0 max-w-full flex-col items-center gap-3 text-center sm:text-center!">
          <AlertDialogTitle className="h2 relative w-full min-w-0 max-w-full pr-10 text-center text-light-100">
            Enter Your OTP
            <button
              type="button"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
              className="otp-close-button border-0 bg-transparent p-0"
            >
              <Image
                src="/assets/icons/close-dark.svg"
                alt=""
                width={20}
                height={20}
              />
            </button>
          </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 w-full min-w-0 max-w-full text-pretty text-center text-light-100">
            We&apos;ve sent a code to
            <span className="pl-1 text-brand">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP
          maxLength={6}
          value={password}
          onChange={setPassword}
          containerClassName="w-full min-w-0 max-w-full justify-center"
        >
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} className="shad-otp-slot" />
            <InputOTPSlot index={1} className="shad-otp-slot" />
            <InputOTPSlot index={2} className="shad-otp-slot" />
            <InputOTPSlot index={3} className="shad-otp-slot" />
            <InputOTPSlot index={4} className="shad-otp-slot" />
            <InputOTPSlot index={5} className="shad-otp-slot" />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter className="shad-alert-dialog-footer min-w-0 max-w-full">
          <AlertDialogAction
            onClick={handleSubmit}
            className="shad-submit-btn inline-flex min-w-0 max-w-full shrink items-center justify-center"
            type="button"
          >
            Submit
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt=""
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </AlertDialogAction>

          <div className="subtitle-2 text-center text-light-100">
            Didn&apos;t get a code?
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 pl-1 text-brand underline-offset-4"
              onClick={handleResendOtp}
            >
              Click to resend
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
