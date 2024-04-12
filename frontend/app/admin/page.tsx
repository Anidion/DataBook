"use client";

import { backend } from "@/services/axios";
import { StoredReview } from "@/types";
import { Card, CardBody, Button, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function DashboardPage() {
  const [pendingReviews, setPendingReviews] = useState<StoredReview[] | []>([]);
  const [updatingReviews, setUpdatingReviews] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    async function fetchPastReviews() {
      try {
        setLoadingReviews(true);
        const usersReviews = await backend.get("/admin/review");

        setPendingReviews(
          usersReviews.data.map((review: any) => ({
            review: review.review,
            book: { ...review.book, author: review.author.name },
          })),
        );
      } catch (err: any) {
        console.log(err.message, err?.response?.data);
      } finally {
        setLoadingReviews(false);
      }
    }
    fetchPastReviews();
  }, [updatingReviews]);

  const moderateReview = async (reviewId: number, approved: boolean) => {
    try {
      setUpdatingReviews(true);
      await backend.put("/admin/review", null, {
        params: {
          reviewId,
          approved,
        },
      });

      const updatedReviews = pendingReviews.filter(
        (review: StoredReview) => review.review.id !== reviewId,
      );

      setPendingReviews(updatedReviews);
    } catch (err: any) {
      console.log(err.message, err?.response?.data);
    } finally {
      setUpdatingReviews(false);
    }
  };

  return (
    <div>
      <Card
        className="my-auto px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
        radius="lg"
      >
        <CardBody>
          <div className="text-center">
            <h2 className="mb-3 text-2xl font-bold">There are</h2>
            {loadingReviews ? (
              <Spinner size="lg" />
            ) : (
              <h2 className="mb-3 text-2xl font-bold text-primary">
                {pendingReviews?.length || "no"}
              </h2>
            )}
            <h2 className="text-2xl font-bold">reviews to moderate</h2>
          </div>
        </CardBody>
      </Card>

      <Card
        className="my-auto mt-10 px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
        radius="lg"
      >
        <CardBody>
          <div>
            <h2 className="mb-3 text-2xl font-bold">Pending Reviews</h2>
            {loadingReviews ? (
              <Spinner size="lg" />
            ) : (
              <h2 className="mb-6 text-2xl font-bold text-primary">
                {pendingReviews?.length}
              </h2>
            )}
            {!!pendingReviews?.length &&
              pendingReviews.map((review: StoredReview, index) => (
                <div key={review.review.id}>
                  <h3 className="text-lg font-bold">{review.book.title}</h3>
                  <p className="text-sm">{review.book.author}</p>
                  <p>{"⭐".repeat(Number(review.review.rating))}</p>
                  <p>&quot;{review.review.content}&quot;</p>
                  <Button
                    color="success"
                    size="sm"
                    className="mr-2 mt-3 text-white"
                    isLoading={updatingReviews}
                    onClick={() => moderateReview(review.review.id, true)}
                  >
                    Approve
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    isLoading={updatingReviews}
                    onClick={() => moderateReview(review.review.id, false)}
                  >
                    Reject
                  </Button>
                  {index !== pendingReviews.length - 1 && (
                    <hr className="my-2" />
                  )}
                </div>
              ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
