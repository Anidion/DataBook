"use client";

import React, { FormEvent, useMemo, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { SigninIcon } from "./icons";
import { DividerWithText } from "./DividerWithText";
import { backend } from "@/services/axios";
import { saveSession } from "@/services/session";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [failedSubmit, setFailedSubmit] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [error, setError] = useState("");

  const usernameIsValid = useMemo(() => username.length >= 3, [username]);
  const emailIsValid = useMemo(
    () => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i),
    [email],
  );
  const passwordIsValid = useMemo(() => password.length >= 8, [password]);

  const router = useRouter();
  const { mutate } = useSWRConfig();

  const signIn = async () => {
    try {
      const response = await backend.get("/auth/signin", {
        params: { email, password },
      });

      console.log("response:", response);

      if (response.status === 200) {
        console.log("Sign in successful", response.data);
        await saveSession(response.data);
        mutate("/api/session");
        router.push("/dashboard");
      } else {
        console.error("Sign in failed - status:", response.status);
      }
    } catch (error) {
      console.error("Sign in failed - caught:", error);
    }
  };

  const signUp = async () => {
    const response = await backend.post("/auth/signup", {
      params: { email, password, username },
    });

    console.log("response:", response);

    if (response.status === 200) {
      console.log("Sign up successful", response.data);
      await saveSession(response.data);
      mutate("/api/session");
      // Uncomment when this is implemented
      // router.push("/dashboard");
    } else {
      console.error("Sign in failed");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailIsValid || !passwordIsValid || (showSignUp && !usernameIsValid)) {
      setFailedSubmit(true);
      return;
    }
    setFailedSubmit(false);
    console.log("Signing in with email:", email, "and password:", password);
    try {
      setIsLoading(true);
      if (showSignUp) return await signUp();
      return await signIn();
    } catch (error) {
      console.error("Signin/Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="mb-5 text-center text-2xl font-bold text-primary">
        {showSignUp ? (
          <>
            Hi!
            <br />
            Let&apos;s level up your
            <br />
            <span className="text-2xl text-blue-500">Library Experience</span>
          </>
        ) : (
          <>Welcome Back.</>
        )}
      </h1>
      <form
        onSubmit={(event) => handleSubmit(event)}
        noValidate
        className="w-full"
      >
        {showSignUp && (
          <Input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            label="Username"
            // placeholder="Dewey Decimal"
            variant="flat"
            color="primary"
            className="mb-2 w-full"
            isRequired
            isInvalid={failedSubmit && !usernameIsValid}
            errorMessage={
              failedSubmit && !usernameIsValid && "Please enter a username"
            }
          />
        )}
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          label="Email"
          //   placeholder="dewey@decimal.com"
          variant="flat"
          color="primary"
          className="mb-2 w-full"
          isRequired
          isInvalid={failedSubmit && !emailIsValid}
          errorMessage={
            failedSubmit &&
            !emailIsValid &&
            "Please enter a valid email address"
          }
        />
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          label="Password"
          //   placeholder="••••••••"
          variant="flat"
          color="primary"
          className="mb-2 w-full"
          isRequired
          isInvalid={failedSubmit && !passwordIsValid}
          errorMessage={
            failedSubmit &&
            !passwordIsValid &&
            "Please enter a password with at least 8 characters"
          }
        />
        <Button
          type="submit"
          variant="solid"
          color="primary"
          className="w-full"
          isLoading={isLoading}
          disabled={
            isLoading || !email || !password || (showSignUp && !username)
          }
        >
          {showSignUp ? "Create an Account" : "Log In"}
          <SigninIcon />
        </Button>
      </form>
      <DividerWithText text="or" className="my-5" />

      <Button
        variant="ghost"
        color="primary"
        className="w-full"
        onClick={() => setShowSignUp(!showSignUp)}
      >
        {showSignUp ? "Log In" : "Create an Account"}
        <SigninIcon />
      </Button>
    </>
  );
};

export default SignIn;
