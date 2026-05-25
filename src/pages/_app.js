import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <main className="flex-auto">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
