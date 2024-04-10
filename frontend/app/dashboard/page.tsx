"use client";

import { Card, CardBody } from "@nextui-org/react";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";

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

  // Function to apply the blue outline class
  const inputClassName = isEditable ? "input-editable" : "";

  return (
    <div>
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
            <h2 className="mb-3 text-2xl font-bold">Reserved Books</h2>
            <h2 className="mb-6 text-2xl font-bold text-primary">3</h2>
            <h3 className="text-lg font-bold">My Life</h3>
            <p>By Sheerin, Brendan</p>
            <h3 className="text-lg font-bold">My Life</h3>
            <p>By Sheerin, Brendan</p>
            <h3 className="text-lg font-bold">My Life</h3>
            <p>By Sheerin, Brendan</p>
          </div>
        </CardBody>
      </Card>

      <Card
        className="my-auto mt-10 px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
        radius="lg"
      >
        <CardBody>
          <div>
            <h2 className="mb-3 text-2xl font-bold">Previous Books</h2>
            <h2 className="mb-6 text-2xl font-bold text-primary">1</h2>
            <h3 className="text-lg font-bold">My Life</h3>
            <p>By Sheerin, Brendan</p>
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
            <h2 className="mb-6 text-2xl font-bold text-primary">2</h2>
            <h3 className="text-lg font-bold">My Life</h3>
            <p>By Sheerin, Brendan</p>
            <h3 className="text-lg font-bold">My Life</h3>
            <p>By Sheerin, Brendan</p>
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
