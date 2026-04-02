import Navbar from "../components/Navbar";
import Footer from "../components/footer/Footer";
import { Providers } from "../providers";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className="relative isolate min-h-screen">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 opacity-100 motion-safe:animate-ambient-drift"
          style={{
            background:
              "radial-gradient(circle at 10% 16%, color-mix(in oklch, var(--primary) 24%, transparent), transparent 32%), radial-gradient(circle at 82% 18%, color-mix(in oklch, var(--secondary) 22%, transparent), transparent 30%), radial-gradient(circle at 48% 56%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 42%), linear-gradient(180deg, color-mix(in oklch, var(--background) 38%, transparent), color-mix(in oklch, var(--background) 96%, transparent))",
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </div>
    </Providers>
  );
}
