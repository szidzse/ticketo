"use client";

import React from "react";
import { useActionState } from "react";
import { Button } from "../ui/button";
import { googleAuthenticate } from "@/actions/auth/google-login";

const GoogleLogin = () => {
  const [errorMsgGoogle, dispatchGoogle] = useActionState(
    googleAuthenticate,
    undefined,
  ); //googleAuthenticate hook
  return (
    <form className="flex mt-4" action={dispatchGoogle}>
      <Button
        variant={"outline"}
        className="flex flex-row items-center gap-3 w-full"
      >
        Google Sign In
      </Button>
      <p>{errorMsgGoogle}</p>
    </form>
  );
};

export default GoogleLogin;
