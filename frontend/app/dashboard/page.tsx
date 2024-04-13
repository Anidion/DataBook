"use client";

import { ReviewModal } from "@/components/ReviewModal";
import { backend } from "@/services/axios";
import { Book, StoredReview } from "@/types";
import { Card, CardBody } from "@nextui-org/react";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function DashboardPage() {
  // State to control if inputs are editable
  const [isEditable, setIsEditable] = useState(false);
  const [buttonText, setButtonText] = useState("Edit Settings");

  // Toggle the state when "Edit Settings" is clicked
  const toggleEdit = () => {
    setIsEditable((current) => !current);
    setButtonText((current) =>
      current === "Edit Settings" ? "Save Changes" : "Edit Settings",
    );
  };

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [bookForReview, setBookForReview] = useState({
    isbn: 0,
    title: "",
    author: "",
  });

  const [pastReviews, setPastReviews] = useState<[StoredReview] | []>([]);

  useEffect(() => {
    async function fetchPastReviews() {
      const usersReviews = await backend.get("/review");
      console.log(usersReviews.data);
      setPastReviews(
        usersReviews.data.map((review: any) => ({
          review: review.review,
          book: { ...review.book, author: review.author.name },
          adminapproves: review?.adminapproves?.approved ?? false,
        })),
      );
    }
    fetchPastReviews();
  }, []);

  useEffect(() => {
    async function fetchPastReservations() {
      const usersReservations = await backend.get("/reservation");
      console.log(usersReservations.data);
      setPastReservations(usersReservations.data);
    }
    fetchPastReservations();
  }, []);

  const [pastReservations, setPastReservations] = useState<[any] | []>([]);

  const openReviewModal = (book: Book) => {
    setBookForReview(book);
    setIsReviewModalOpen(true);
  };

  const [pastBooks, setPastBooks] = useState([]);

  useEffect(() => {
    async function fetchPastBooks() {
      try {
        const response = await backend.get("/reservation/past");
        setPastBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch past books:", error);
      }
    }

    fetchPastBooks();
  }, []);

  // Function to apply the blue outline class
  const inputClassName = isEditable ? "input-editable" : "";

  return (
    <div>
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        book={bookForReview}
      />
      <Card
        className="my-auto px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
        radius="lg"
      >
        <CardBody>
          <div>
            <h2 className="mb-3 text-center text-2xl font-bold">Total Books</h2>
            <h2 className="mb-6 text-center text-2xl font-bold text-primary">
              6
            </h2>
          </div>

          <div className="mb-6 text-center">
            <hr
              style={{ border: "1px solid gray", width: "90%", margin: "auto" }}
            />
          </div>

          <div className="flex justify-between">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Reserved</h3>
              <p className="text-primary">3</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Previous</h3>
              <p className="text-primary">1</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Reviewed</h3>
              <p className="text-primary">2</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card
        className="my-auto mt-10 px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
        radius="lg"
      >
        <CardBody>
          <div>
            <h2 className="mb-3 text-2xl font-bold">Checked Out Books</h2>
            <h2 className="mb-6 text-2xl font-bold text-primary">
              {pastReservations?.length}
            </h2>
            {pastReservations?.length &&
              pastReservations.map((reservation: any, index) => (
                <div key={reservation.id}>
                  <h3 className="text-lg font-bold">
                    {reservation.book.title}
                  </h3>
                  <p className="text-sm">By, {reservation.author.name}</p>
                  <p className="text-sm">{reservation.date}</p>
                  {index !== pastReservations.length - 1 && (
                    <hr className="my-2" />
                  )}
                </div>
              ))}
          </div>
        </CardBody>
      </Card>

      <Card
        className="my-auto mt-10 px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
        radius="lg"
      >
        <CardBody>
          <div>
            <h2 className="mb-3 text-2xl font-bold">Past Books</h2>
            <h2 className="mb-6 text-2xl font-bold text-primary">
              {pastBooks?.length}
            </h2>
            {pastBooks?.length &&
              pastBooks.map((book: any, index) => (
                <div key={book.id}>
                  <h3 className="text-lg font-bold">{book.book.title}</h3>
                  <p className="text-sm">{book.author?.name}</p>
                  <p className="text-sm">
                    Expired On:{" "}
                    {new Date(book.transaction.enddate).toLocaleDateString()}
                  </p>
                  {index !== pastBooks.length - 1 && <hr className="my-2" />}
                </div>
              ))}
          </div>
        </CardBody>
      </Card>

      <Card
        className="my-auto mt-10 px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
        radius="lg"
      >
        <CardBody>
          <div>
            <h2 className="mb-3 text-2xl font-bold">Reviewed Books</h2>
            <h2 className="mb-6 text-2xl font-bold text-primary">
              {pastReviews?.length}
            </h2>
            {pastReviews?.length &&
              pastReviews.map((review: StoredReview, index) => (
                <div key={review.review.id}>
                  <h3 className="text-lg font-bold">{review.book.title}</h3>
                  <p className="text-sm">{review.book.author}</p>
                  <p>{"⭐".repeat(Number(review.review.rating))}</p>
                  <p>&quot;{review.review.content}&quot;</p>
                  <p className="text-sm">
                    {review.adminapproves.approved
                      ? "Approved"
                      : "Pending Approval"}
                  </p>
                  {index !== pastReviews.length - 1 && <hr className="my-2" />}
                </div>
              ))}
          </div>
        </CardBody>
      </Card>

      <Card
        className="my-auto mt-10 px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
        radius="lg"
      >
        <CardBody>
          <div>
            <h2 className="mb-6 text-2xl font-bold">User Information</h2>
          </div>
          <div className="mb-4 space-y-4">
            <Input
              className={inputClassName}
              readOnly={!isEditable}
              label="Name"
              defaultValue="John Doe"
            />
            <Input
              className={inputClassName}
              readOnly={!isEditable}
              label="Username"
              defaultValue="johndoe123"
            />
            <Input
              className={inputClassName}
              type="password"
              readOnly={!isEditable}
              label="Password"
              defaultValue="**********"
            />
            <Input
              className={inputClassName}
              readOnly={!isEditable}
              label="Email"
              defaultValue="john.doe@example.com"
            />
          </div>
        </CardBody>
      </Card>

      <div className="mt-6 text-center">
        <Button
          onClick={toggleEdit}
          variant="ghost"
          color="primary"
          className="mx-auto mt-4 px-4 py-4 md:w-[20%] md:py-4"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
