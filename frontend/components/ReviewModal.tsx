"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Slider,
  SliderValue,
  Textarea,
} from "@nextui-org/react";
import { backend } from "@/services/axios";

interface ReviewModalProps {
  isOpen: boolean;
  book: {
    isbn: number;
    title: string;
    author: string;
  };
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  book,
  onClose,
}) => {
  const [rating, setRating] = useState<SliderValue>(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submitReview = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      await backend.post("/review", {
        review: {
          isbn: book.isbn,
          rating,
          content: review,
        },
      });
      setSuccess(true);
    } catch (err: any) {
      console.log(err.message, err?.response?.data);
      setError(
        err?.response?.data?.error ||
          err.message ||
          "An unknown error occurred. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clean up form state when modal is opened or closed
  const clearForm = () => {
    setRating(0);
    setReview("");
    setError("");
    setIsSubmitting(false);
    setSuccess(false);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={clearForm}
        onClose={clearForm}
        isDismissable={!isSubmitting}
        isKeyboardDismissDisabled={isSubmitting}
        hideCloseButton={isSubmitting}
        placement="center"
      >
        {success ? (
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Review Submitted Successfully
            </ModalHeader>
            <ModalFooter>
              <Button color="primary" variant="solid" onClick={clearForm}>
                Done
              </Button>
            </ModalFooter>
          </ModalContent>
        ) : (
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Create a Review for &quot;{book.title}&quot; by {book.author}
            </ModalHeader>

            <ModalBody>
              {error && (
                <Card shadow="none" className="outline-primary">
                  <CardBody className="text-danger">{error}</CardBody>
                </Card>
              )}

              <Slider
                label={"⭐".repeat(Number(rating))}
                aria-label="Rating"
                minValue={1}
                maxValue={5}
                step={1}
                hideValue
                isDisabled={isSubmitting}
                value={rating}
                onChange={setRating}
              />
              <Textarea
                label="Review"
                value={review}
                isDisabled={isSubmitting}
                onChange={(e) => setReview(e.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                isDisabled={isSubmitting}
                onClick={clearForm}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                isDisabled={isSubmitting || !rating || !review}
                isLoading={isSubmitting}
                onClick={submitReview}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
};
