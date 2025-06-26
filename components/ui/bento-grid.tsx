import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import GlassWrapper from "./glass-wrapper";
import { GlowingEffect } from "./glowing-effect";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  date,
  description,
  header,
  imageUrl,
  icon,
}: {
  className?: string;
  date?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  imageUrl: string;
  icon?: React.ReactNode;
}) => {
  return (
    <GlassWrapper
      className={cn(
        "group/bento shadow-input flex flex-col justify-start space-y-3 transition duration-200 hover:shadow-xl dark:shadow-none relative cursor-pointer",
        className,
      )}
    >
      <div className="relative w-full h-full p-5 rounded-lg">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        {/* Title */}
        <h4 className="group-hover/bento:translate-x-2 transition duration-200 text-xl font-bold line-clamp-2 leading-relaxed">
          {header}
        </h4>

        {/* Image */}
        {imageUrl && (
          <div className="relative w-full h-28 overflow-hidden rounded-md bg-gray-100 dark:bg-neutral-700">
            <Image
              src={imageUrl}
              alt="Blog Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}

        {/* Date */}
        {date && (
          <div className="text-sm font-semibold text-blue-600 dark:text-blue-300">{date}</div>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </GlassWrapper>
  );
};
