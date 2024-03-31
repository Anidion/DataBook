"use client";

import SignIn from "@/components/signin";
import { Card, CardBody } from "@nextui-org/react";
import { useState } from "react";

export default function Home() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <Card
      className="my-auto px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
      radius="lg"
    >
      <CardBody>
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

        <SignIn showSignUp={showSignUp} setShowSignUp={setShowSignUp} />
      </CardBody>
    </Card>
  );
}
