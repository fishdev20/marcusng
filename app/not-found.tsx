import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16 z-50">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className=" font-incognito text-4xl font-bold tracking-tighter sm:text-5xl">
            404 Page Not Found
          </h1>
          <p className="font-sans text-gray-500">
            Sorry, we couldn&apos;t find the page you&#x27;re looking for.
          </p>
        </div>
        <Button variant={"outline"}>
          <Link href="/" prefetch={false}>
            Return to website
          </Link>
        </Button>
      </div>
    </div>
  );
}
