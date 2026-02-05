import { useState, useEffect } from "react";
import { artistData } from "../data/artistData";
import { NavLink } from "react-router-dom";
import { toSlug } from "../utils/toSlug";

export const AllArtists = () => {
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedTechnique, setSelectedTechnique] = useState("");

  const sortedArtists = [...artistData].sort((a, b) => {
    if (sortBy === "name") {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    }
    if (sortBy === "age") {
      return sortOrder === "asc"
        ? a.year_of_birth - b.year_of_birth
        : b.year_of_birth - a.year_of_birth;
    }
    return 0;
  });

  const filteredArtists = sortedArtists.filter((artist) => {
    const genderMatches = selectedGender
      ? artist.gender === selectedGender
      : true;
    const techniqueMatches = selectedTechnique
      ? artist.technique.includes(selectedTechnique)
      : true;
    return genderMatches && techniqueMatches;
  });

  useEffect(() => {
    artistData.forEach((artist) => {
      artist.images.forEach((img) => {
        const preloaded = new Image();
        preloaded.src = img.image;
      });
    });
  }, []);

  return (
    <section className="w-11/12 laptop:w-8/12 mx-auto mt-20 laptop:mt-32 mb-20 flex flex-col h-full gap-4 font-heading animate-fadeIn">
      <h3 className="text-4xl text-peach font-fat text-end">Artists</h3>

      <div className="flex bg-peach bg-opacity-60 flex-wrap gap-2 laptop:gap-4 p-2 items-center justify-end text-xs grid grid-cols-2 laptop:flex">
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
          className="p-2 h-fit bg-peach text-white"
        >
          Sort by Age {sortOrder === "asc" ? "↑" : "↓"}
        </button>

        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          className="p-2 h-fit bg-peach text-main-white appearance-none rounded-none text-center"
        >
          <option value="">Filter by Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select
          value={selectedTechnique}
          onChange={(e) => setSelectedTechnique(e.target.value)}
          className="p-2 h-fit bg-peach text-main-white appearance-none rounded-none text-center"
        >
          <option value="">Filter by Technique</option>
          {[
            "Painting",
            "Sculpture",
            "Photography",
            "Installation",
            "Video",
            "Drawing",
            "VR",
            "3D",
            "Film",
            "Mixed media",
            "Collage",
            "Digital art",
            "Performance",
          ].map((technique) => (
            <option key={technique} value={technique}>
              {technique}
            </option>
          ))}
        </select>
      </div>

      <ul className="grid grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-8 gap-4 gap-y-8">
        {filteredArtists.map((artist) => (
          <li
            key={artist.name}
            className="text-white bg-peach bg-opacity-50 relative group"
          >
            <NavLink to={`/artist/${toSlug(artist.name)}`}>
              <img
                src={artist.images?.[0]?.image}
                alt={artist.images?.[0]?.alt}
                className="aspect-[4/3] object-cover"
              />
              <p className="p-2 laptop:hidden">{artist.name}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
};
