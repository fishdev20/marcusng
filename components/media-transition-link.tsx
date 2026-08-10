"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type BrowserViewTransition = {
  finished: Promise<void>;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => Promise<void> | void) => BrowserViewTransition;
};

type MediaTransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  transitionName: string;
};

export function MediaTransitionLink({
  href,
  transitionName,
  onClick,
  ...props
}: MediaTransitionLinkProps) {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank"
    ) {
      return;
    }

    const transitionDocument = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sourceSelector = `[data-media-transition-source="${CSS.escape(transitionName)}"]`;

    if (
      !transitionDocument.startViewTransition ||
      reduceMotion ||
      !document.querySelector(sourceSelector)
    ) {
      return;
    }

    event.preventDefault();
    document.documentElement.classList.add("media-page-transition");

    const transition = transitionDocument.startViewTransition(async () => {
      router.push(href);
      await waitForMedia(transitionName);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });

    const cleanupTimeout = window.setTimeout(() => {
      document.documentElement.classList.remove("media-page-transition");
    }, 3000);

    transition.finished.finally(() => {
      window.clearTimeout(cleanupTimeout);
      document.documentElement.classList.remove("media-page-transition");
    });
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}

function waitForMedia(transitionName: string) {
  return new Promise<void>((resolve) => {
    const selector = `[data-media-transition-target="${CSS.escape(transitionName)}"]`;
    let timeoutId = 0;

    const finish = async (element: Element) => {
      observer.disconnect();
      window.clearTimeout(timeoutId);

      const image = element.querySelector("img");
      if (image && !image.complete) {
        await Promise.race([
          image.decode().catch(() => undefined),
          new Promise((done) => window.setTimeout(done, 400)),
        ]);
      }

      window.setTimeout(resolve, 32);
    };

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) void finish(element);
    });

    const existingElement = document.querySelector(selector);
    if (existingElement) {
      void finish(existingElement);
      return;
    }

    observer.observe(document.body, { childList: true, subtree: true });
    timeoutId = window.setTimeout(() => {
      observer.disconnect();
      resolve();
    }, 1800);
  });
}
