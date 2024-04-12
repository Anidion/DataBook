import { Button, ButtonGroup, Card, CardBody } from "@nextui-org/react";
import BookDetails from "@/components/bookview";
import BookCard from "@/components/bookcard";
import SearchBar from "@/components/searchbar";

export default function Home() {
  return (
    <Card
      className="my-auto px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
      radius="lg"
    >
      <CardBody>
        <SearchBar></SearchBar>
        <ButtonGroup>
          <Button variant="solid" color="danger">
            Left
          </Button>
          <Button variant="solid" color="danger">
            Middle
          </Button>
          <Button variant="solid" color="danger">
            Right
          </Button>
        </ButtonGroup>
        <BookCard
          title={"My Life"}
          author={"John Doe"}
          coverImage={
            "https://cdn.builder.io/api/v1/image/assets/TEMP/84b3a59933528c79a2a5e7c646dbb5de37865cccb85cd94dd63bd58e72105edf?apiKey=d0e6c17cae514308933f9abcb88dd7ef&"
          }
        ></BookCard>
        <br></br>
        <BookCard
          title={"My Life"}
          author={"John Doe"}
          coverImage={
            "https://cdn.builder.io/api/v1/image/assets/TEMP/84b3a59933528c79a2a5e7c646dbb5de37865cccb85cd94dd63bd58e72105edf?apiKey=d0e6c17cae514308933f9abcb88dd7ef&"
          }
        ></BookCard>
        <br></br>
        <BookCard
          title={"My Life"}
          author={"John Doe"}
          coverImage={
            "https://cdn.builder.io/api/v1/image/assets/TEMP/84b3a59933528c79a2a5e7c646dbb5de37865cccb85cd94dd63bd58e72105edf?apiKey=d0e6c17cae514308933f9abcb88dd7ef&"
          }
        ></BookCard>
      </CardBody>
    </Card>
  );
}
