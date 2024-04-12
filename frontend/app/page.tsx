import SignIn from "@/components/signin";
import { Card, CardBody } from "@nextui-org/react";
import libraryImage from "@/img/library.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-100 overflow-hidden">
      <div className="-z-1 absolute inset-0 opacity-40">
        <Image
          src={libraryImage}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt=""
        />
      </div>

      <Card
        className="my-auto px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
        radius="lg"
      >
        <CardBody>
          <SignIn />
        </CardBody>
      </Card>
    </div>
  );
}
