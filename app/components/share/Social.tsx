import { LinkPreview } from "@/components/ui/link-preview";
import { Separator } from "@/components/ui/separator";
import { social } from "@/constants/social";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

export default function Social() {
  return (
    <ul className="flex items-center flex-wrap gap-x-5 gap-y-4 my-10">
      {social.map((value, index) => (
        <li key={index} className="flex items-center space-x-4">
          <LinkPreview
            url={value.link}
            className="text-md font-bold flex items-center group text-blue-400 dark:text-blue-400 relative no-underline before:content-[''] before:absolute before:w-full before:h-0.5 before:rounded before:bg-blue-400 before:bottom-[-3px] before:left-0 before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out hover:before:origin-left hover:before:scale-x-100 space-x-4"
          >
            <value.icon className="flex-shrink-0 h-5 w-5" aria-hidden="true" /> &nbsp;
            {value.name}
          </LinkPreview>

          {index !== social.length - 1 && (
            <Separator orientation="vertical" className="h-5 text-base" />
          )}
        </li>
      ))}
    </ul>
  );
}

function RefLink({
  href,
  children,
  className,
  target = "_blank",
}: {
  href: Url;
  children?: React.ReactNode;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
}) {
  return (
    <Link href={href} rel="noopener" target={target} className={className}>
      {children}
    </Link>
  );
}
