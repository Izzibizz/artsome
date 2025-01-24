import { Header } from "./components/Header"
import { MainRoutes } from "./routes/MainRoutes";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { useArtistsStore } from "./store/useArtistsStore"
import { useEffect } from "react"


export const App = () => {

  const { fetchArtists } = useArtistsStore()

  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <>
    <ScrollToTop />
    <div className="bg-background max-w-screen min-h-screen flex flex-col overflow-hidden ">
      <Header />
      <main className="flex-grow">
        <MainRoutes />
      </main>
      <Footer />
    </div>
    </>
  );
};
