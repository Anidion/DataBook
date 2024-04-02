import { Card, CardBody } from "@nextui-org/react";
import { Button, Input } from "@nextui-org/react";

export default function DashboardPage() {
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
              22
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
              <p className="text-primary">19</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Previous</h3>
              <p className="text-primary">9</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Reviewed</h3>
              <p className="text-primary">10</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card
        className="my-auto mb-6 mt-20 px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
        radius="lg"
      >
        <CardBody>
          {/* Begin new content */}
          <div className="space-y-4">
            <div className="flex items-center">
              <label htmlFor="name" className="font-bold">
                Name
              </label>
              <div className="ml-4 flex-grow rounded bg-gray-200 px-4 py-2">
                **********
              </div>
            </div>
            <div className="flex items-center">
              <label htmlFor="username" className="font-bold">
                Username
              </label>
              <div className="ml-4 flex-grow rounded bg-gray-200 px-4 py-2">
                **********
              </div>
            </div>
            <div className="flex items-center">
              <label htmlFor="password" className="font-bold">
                Password
              </label>
              <div className="ml-4 flex-grow rounded bg-gray-200 px-4 py-2">
                **********
              </div>
            </div>
            <div className="flex items-center">
              <label htmlFor="email" className="font-bold">
                Email
              </label>
              <div className="ml-4 flex-grow rounded bg-gray-200 px-4 py-2">
                **********
              </div>
            </div>
          </div>
          {/* End new content */}
        </CardBody>
      </Card>

      <div className="text-center">
        <Button
          variant="ghost"
          color="primary"
          className="mx-auto px-4 py-4 md:w-[20%] md:py-4"
        >
          Edit Settings
        </Button>
      </div>
    </div>
  );
}
