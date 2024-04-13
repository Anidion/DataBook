"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SliderValue,
} from "@nextui-org/react";
import { backend } from "@/services/axios";
import { Genre } from "@/types";

interface GenresModalProps {
  isOpen: boolean;
  selectedGenres: Genre[];
  onClose: () => void;
  setSelectedGenres: (genres: Genre[]) => void;
}

export const GenresModal: React.FC<GenresModalProps> = ({
  isOpen,
  selectedGenres,
  onClose,
  setSelectedGenres,
}) => {
  const [rating, setRating] = useState<SliderValue>(0);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const getAllGenres = async () => {
      setError("");
      setIsLoading(true);
      try {
        const results = await backend.get("/genre/all");
        console.log(results.data);
        setAllGenres(results.data);
        return results.data;
      } catch (err: any) {
        console.log(err.message, err?.response?.data);
        setError(
          err?.response?.data?.error ||
            err.message ||
            "An unknown error occurred. Please try again later.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    getAllGenres();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const initialChecked: { [key: number]: boolean } = {};

    allGenres.forEach((genre) => {
      initialChecked[genre.id] = selectedGenres.some(
        (selected) => selected.id === genre.id,
      );
    });
    setChecked(initialChecked);
  }, [allGenres, selectedGenres, isOpen]);

  const toggleGenre = (checked: { [key: number]: boolean }, id: number) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const submitNewGenres = async () => {
    setError("");
    setIsSubmitting(true);
    setSuccess(false);
    try {
      const response = await backend.put("/genre", { genres: checked });
      setSuccess(true);
      setSelectedGenres(response.data.map((genre: any) => genre.genre));
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
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Set your favourite genres
          </ModalHeader>

          <ModalBody>
            {error && (
              <Card shadow="none" className="outline-primary">
                <CardBody className="text-danger">{error}</CardBody>
              </Card>
            )}

            {success && (
              <Card shadow="none" className="outline-success">
                <CardBody className="text-success">Genres updated!</CardBody>
              </Card>
            )}

            <div className="grid grid-cols-2 gap-2">
              {allGenres.map((genre) => (
                <Button
                  key={genre.id}
                  color="primary"
                  disabled={isSubmitting}
                  variant={checked[genre.id] ? "solid" : "light"}
                  className="text-sm"
                  onClick={() => toggleGenre(checked, genre.id)}
                >
                  {genre.name}
                </Button>
              ))}
            </div>
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
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              onClick={() => submitNewGenres()}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
