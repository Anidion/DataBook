import SignIn from "@/components/signin";
import { Card, CardBody } from "@nextui-org/react";

export default function Home() {
  return (
    <Card
      className="my-auto px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
      radius="lg"
    >
      <CardBody>
        <SignIn />
      </CardBody>
    </Card>
  );
}
