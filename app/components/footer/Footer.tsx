import SectionWrapper from "@/components/ui/section-wrapper";
import { getDevIcon } from "@/lib/utils";
import Image from "next/image";

export default function Footer() {
  return (
    <SectionWrapper>
      <footer className="border-t dark:border-zinc-500 border-zinc-200 mt-44 lg:min-h-[250px] min-h-full relative">
        <div className="max-w-7xl mx-auto flex lg:flex-row flex-col items-center lg:justify-between justify-center gap-y-4 md:px-16 px-6 py-16">
          <div className="flex md:flex-row flex-col items-center gap-x-2">
            <h3 className="font-inter">Built with:</h3>
            <ul className="flex items-center gap-x-2 text-sm dark:text-neutral-200 text-neutral-200 md:mt-0 mt-3">
              <li>
                <a
                  href="https://sanity.io"
                  rel="noreferrer noopener"
                  target="_blank"
                  className="flex items-center gap-x-2 dark:text-white text-zinc-600 hover:underline"
                >
                  <Image
                    src={getDevIcon("sanity") ?? ""}
                    width={20}
                    height={20}
                    alt="sanity logo"
                  />{" "}
                  Sanity
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org"
                  rel="noreferrer noopener"
                  target="_blank"
                  className="flex items-center gap-x-2 dark:text-white text-zinc-600 hover:underline"
                >
                  <Image
                    src={getDevIcon("nextjs") ?? ""}
                    width={20}
                    height={20}
                    alt="nextjs logo"
                  />{" "}
                  Next.js
                </a>
              </li>
              <li>
                <a
                  href="https://vercel.com"
                  rel="noreferrer noopener"
                  target="_blank"
                  className="flex items-center gap-x-2 dark:text-white text-zinc-600 hover:underline"
                >
                  <Image
                    src={getDevIcon("vercel") ?? ""}
                    width={20}
                    height={20}
                    alt="vercel logo"
                  />{" "}
                  Vercel
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col lg:items-end items-center lg:text-start text-center">
            <small className="dark:text-neutral-200 text-neutral-500">
              Copyright &copy; Marcus Nguyen {new Date().getFullYear()} All rights Reserved
            </small>
          </div>
        </div>
      </footer>
    </SectionWrapper>
  );
}
