import { cn } from "@/lib/utils"; // assuming you're using the default shadcn setup
import { forwardRef } from "react";

export const DogSpinner = () => (
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-transparent" />
  </div>
);

export const DogContainer = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative mx-auto",
        "mt-[-20px] sm:mt-[-60px] md:mt-[-120px]",
        "mb-[-40px] sm:mb-[-140px] md:mb-[-200px]",
        "w-[320px] sm:w-[360px] md:w-[480px]",
        "h-[320px] sm:h-[360px] md:h-[480px]",
      )}
    >
      {children}
    </div>
  ),
);

DogContainer.displayName = "DogContainer";

const Loader = () => {
  return (
    <DogContainer>
      <DogSpinner />
    </DogContainer>
  );
};

export default Loader;
