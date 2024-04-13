import { Button, ButtonGroup, Card, CardBody } from "@nextui-org/react";
import BookCard from "@/components/bookcard";
import SearchBar from "@/components/searchbar";
import BookView from "@/components/bookview";

export default function Home() {
  return (
    <Card
      className="my-auto px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
      radius="lg"
    >
      <CardBody>
        <SearchBar></SearchBar>
        <ButtonGroup className="mb-10">
          <Button variant="solid" color="danger">
            Author
          </Button>
          <Button variant="solid" color="danger">
            Genre
          </Button>
          <Button variant="solid" color="danger">
            Title
          </Button>
        </ButtonGroup>
        <BookCard
          title={"My Life"}
          author={"John Doe"}
          isbn={"1234"}
          coverImage={
            "https://cdn.builder.io/api/v1/image/assets/TEMP/84b3a59933528c79a2a5e7c646dbb5de37865cccb85cd94dd63bd58e72105edf?apiKey=d0e6c17cae514308933f9abcb88dd7ef&"
          }
        ></BookCard>
        <br></br>
        <BookCard
          title={"My Life"}
          author={"John Doe"}
          isbn={"1234"}
          coverImage={
            "https://cdn.builder.io/api/v1/image/assets/TEMP/84b3a59933528c79a2a5e7c646dbb5de37865cccb85cd94dd63bd58e72105edf?apiKey=d0e6c17cae514308933f9abcb88dd7ef&"
          }
        ></BookCard>
        <br></br>
        <BookCard
          title={"My Life"}
          author={"John Doe"}
          isbn={"1234"}
          coverImage={
            "https://cdn.builder.io/api/v1/image/assets/TEMP/84b3a59933528c79a2a5e7c646dbb5de37865cccb85cd94dd63bd58e72105edf?apiKey=d0e6c17cae514308933f9abcb88dd7ef&"
          }
        ></BookCard>
      </CardBody>
    </Card>
  );
}
