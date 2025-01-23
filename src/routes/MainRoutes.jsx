
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { EachArtistPage } from "../pages/EachArtistPage"
import { AllArtists } from "../pages/AllArtists"

export const MainRoutes = () => {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/artists" element={<AllArtists/>}/>
        <Route path="/artist:id" element={<EachArtistPage/>}/>
        <Route path="/*" element={<NotFound/>}/>
        </Routes>
    </div>
  )
}

