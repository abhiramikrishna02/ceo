import "../styles/globals.css";
import Footer from "@/components/layout/footer";
import SiteNavbar from "@/components/layout/site-navbar";

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <SiteNavbar />
      <main className="flex-auto">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
