import { useState } from "react";
import { useArtistsStore } from "../store/useArtistsStore";
import { NavLink } from "react-router-dom";

export const AllArtists = () => {
  const { artistData } = useArtistsStore();

  const [sortBy, setSortBy] = useState("name"); // Default sort by name
  const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order
  const [selectedGender, setSelectedGender] = useState(""); // Filter by gender
  const [selectedTechnique, setSelectedTechnique] = useState(""); // Filter by technique

  // Sorting function
  const sortedArtists = [...artistData].sort((a, b) => {
    if (sortBy === "name") {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === "asc") {
        return nameA > nameB ? 1 : -1;
      } else {
        return nameA < nameB ? 1 : -1;
      }
    }
    if (sortBy === "age") {
      const ageA = a.year_of_birth;
      const ageB = b.year_of_birth;
      if (sortOrder === "asc") {
        return ageA > ageB ? 1 : -1;
      } else {
        return ageA < ageB ? 1 : -1;
      }
    }
    return 0; // No sorting
  });

  // Filter artists based on gender and technique
  const filteredArtists = sortedArtists.filter((artist) => {
    const genderMatches = selectedGender ? artist.gender === selectedGender : true;
    const techniqueMatches = selectedTechnique ? artist.technique.includes(selectedTechnique) : true;
    return genderMatches && techniqueMatches;
  });

  return (
    <section className="w-11/12 laptop:w-8/12 mx-auto mt-20 laptop:mt-32 mb-20 flex flex-col h-full gap-4 font-heading animate-fadeIn">
      <h3 className="text-4xl text-peach font-fat text-end">Artists</h3>

<div className="flex bg-peach bg-opacity-60 flex-wrap gap-2 laptop:gap-4 p-2 items-center justify-end text-xs grid grid-cols-2 laptop:flex">
      {/* Sorting Buttons */}
        <button
          onClick={() => {
            setSortBy("name");
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          }}
          className="p-2 h-fit bg-peach text-white "
        >
          Sort by Name {sortOrder === "asc" ? "↑" : "↓"}
        </button>
        <button
          onClick={() => {
            setSortBy("age");
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          }}
          className="p-2 h-fit  bg-peach text-white"
        >
          Sort by Age {sortOrder === "asc" ? "↑" : "↓"}
        </button>

      {/* Filter by Gender */}
        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          className="p-2 h-fit bg-peach text-main-white appearance-none rounded-none text-center"
        >
          <option value="">Filter by Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

      {/* Filter by Technique */}
        <select
          value={selectedTechnique}
          onChange={(e) => setSelectedTechnique(e.target.value)}
          className="p-2 h-fit bg-peach text-main-white appearance-none rounded-none text-center"
        >
          <option value="">Filter by Technique</option>
          {["Painting", "Sculpture", "Photography", "Installation", "Video", "Silhouette", "Drawing", "VR", "3D", "Film", "Mixed media", "Collage", "Digital art", "Performance"].map((technique) => (
            <option key={technique} value={technique}>
              {technique}
            </option>
          ))}
        </select>
      </div>

      {/* Display Filtered and Sorted Artists */}
      <ul className="grid grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-8 gap-4 gap-y-8">
        {filteredArtists?.map((artist, index) => (
          <li key={index} className="text-white bg-peach bg-opacity-50 relative group">
            <NavLink
              to={`/artist/${artist?.name
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/ /g, "_")
                .replace(/[^a-z0-9_]/g, "")}`}
            >
              <img src={artist?.images[0].image} alt={artist?.images[0].alt} className="aspect-[4/3] object-cover" />
              <p className="p-2 laptop:hidden">{artist?.name}</p>
              <div className="hidden laptop:flex flex-col absolute w-full h-full top-0 left-0 text-white bg-peach bg-opacity-60 opacity-0 group-hover:opacity-100 transition-all duration-300 text-center justify-center cursor-pointer">
                <p className="p-2">{artist?.name}</p>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
};


