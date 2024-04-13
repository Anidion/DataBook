import { Card, CardBody } from "@nextui-org/react";
import BookView from "@/components/bookview";

export default function Home() {
  return (
    <>
      <a href="javascript:history.go(-1)">
        <button type="button">Back to Library</button>
      </a>
      <Card
        className="my-auto px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
        radius="lg"
      >
        <CardBody>
          <BookView
            isbn={"9521"}
            genre={"fantasy"}
            title={"Life"}
            author={"Ohiomah Imohi"}
            description={"My name is Ohiomah Imohi and I am 20 years old."}
            coverImage={"https://shorturl.at/cENX2"}
          />
        </CardBody>
      </Card>
    </>
  );
}
