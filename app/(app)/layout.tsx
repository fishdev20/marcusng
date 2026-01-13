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
      <div className="relative">
        <Navbar />
        {children}
        <Footer />
      </div>
    </Providers>
  );
}
