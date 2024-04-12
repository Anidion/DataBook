import { title } from "@/components/primitives";
import { Link } from "@nextui-org/react";

export default async function NotFound() {
  return (
    <div className="text-center">
      <h2 className={title()}>Error 404</h2>
      <p>Could not find requested resource</p>
      <p>
        <Link href="/">Return to Safety</Link>
      </p>
    </div>
  );
}
