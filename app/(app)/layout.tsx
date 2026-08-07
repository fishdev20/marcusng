import { getProfile } from "@/sanity/lib/query";
import { Providers } from "../providers";
import { FooterSection } from "./_components/home/footer-section";
import PreviewHeader from "./PreviewHeader";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfile().catch(() => null);

  return (
    <Providers>
      <PreviewHeader profile={profile} />
      {children}
      <SiteFooter profile={profile} />
      <BottomFade />
    </Providers>
  );
}

function SiteFooter({ profile }: { profile: Awaited<ReturnType<typeof getProfile>> | null }) {
  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1240px] bg-background px-3 sm:px-5 lg:px-8">
        <div className="relative mx-auto w-full max-w-[920px] border-x px-4 sm:px-8 lg:px-12">
          <FooterSection profile={profile} />
        </div>
      </div>
    </div>
  );
}

function BottomFade() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50" aria-hidden="true">
      <div className="h-[var(--fade-bottom-height)] bg-linear-to-b from-transparent to-background [mask-image:linear-gradient(to_top,black_25%,transparent)] backdrop-blur-[1px]" />
      <div className="bg-background pb-[env(safe-area-inset-bottom,0px)]" />
    </div>
  );
}
