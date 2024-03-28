"use client";

import { useState } from "react";
import axios from "axios";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { backend } from "@/services/axios";

export default function Home() {
  const [users, setUsers] = useState([]);

  const dummyApiCall = async () => {
    try {
      const response = await backend.get("http://localhost:3001/");
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Button
        onClick={dummyApiCall}
        className={buttonStyles({
          color: "primary",
          radius: "full",
          variant: "shadow",
        })}
      >
        Hit the API
      </Button>

      {users && (
        <ul className="mt-4">
          {users.map((user, index) => (
            <li key={index}>{JSON.stringify(user)}</li>
          ))}
        </ul>
      )}

      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Make&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
        <br />
        <h1 className={title()}>
          websites regardless of your design experience.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideSymbol hideCopyButton variant="flat">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
