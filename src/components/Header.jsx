import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useArtistsStore } from "../store/useArtistsStore";
import logo from "/artsome-dark.svg";

export const Header = () => {
  const dropdownRef = useRef();
  const buttonRef = useRef();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { bgWhite } = useArtistsStore()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close the menu when navigating to a new page
  useEffect(() => {
    closeMenu();
  }, [location]);

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log(bgWhite)

  return (
    <header className={`w-full fixed flex h-16 p-4 z-40 justify-between bg-white bg-opacity-30 items-center `}>
      <NavLink to="/" aria-label="Link to Home">
        <img
          src={logo}
          alt="artsome logo"
          id="logo"
          className="h-6 tablet:h-8 object-cover hover:scale-110 transform transition-transform duration-300 origin-center"
        />
      </NavLink>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        aria-label="Toggle Menu"
        className="flex flex-col justify-center items-center z-50 "
      >
        <span
          className={` ${bgWhite ? "bg-peach" : "bg-white"} hover:bg-peach block transition-all duration-300 ease-out 
                      h-0.5 w-6 rounded-sm ${
                        isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                      }`}
        >
          {" "}
        </span>
        <span
          className={`${bgWhite ? "bg-peach" : "bg-white"}  hover:bg-peach block transition-all duration-300 ease-out 
                      h-0.5 w-6 rounded-sm my-0.5 ${
                        isOpen ? "opacity-0" : "opacity-100"
                      }`}
        ></span>
        <span
          className={`${bgWhite ? "bg-peach" : "bg-white"}  hover:bg-peach block transition-all duration-300 ease-out 
                      h-0.5 w-6 rounded-sm ${
                        isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                      }`}
        ></span>
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute laptop:top-4 laptop:right-12 top-0 z-40 right-0 w-full h-screen laptop:w-fit laptop:h-fit text-xl ${bgWhite ? "text-peach" : "text-white"}  bg-background bg-opacity-90 laptop:bg-opacity-0 laptop:rounded-bl-xl flex justify-center items-center`}
        >
          <ul className="flex flex-col laptop:flex-row items-center align-middle laptop:items-end gap-6 laptop:gap-10 laptop:pb-4 laptop:px-6 font-light">
            <NavLink
              to="/artists"
              aria-label="Link to artists"
              onClick={toggleMenu}
              className={({ isActive }) =>
                ` ${
                  isActive
                    ? "underline"
                    : `hover:scale-110 ${bgWhite ? "hover:text-dark-brown" : "text-peach"} transform transition-transform duration-300 origin-center`
                }`
              }
            >
              <li>Artists</li>
            </NavLink>
            <NavLink
              to="/artist/marguerite_humeau"
              aria-label="Link to selected"
              onClick={toggleMenu}
              className={({ isActive }) =>
                ` ${
                  isActive
                    ? "underline"
                    : `hover:scale-110 ${bgWhite ? "hover:text-dark-brown" : "text-peach"} transform transition-transform duration-300 origin-center`
                }`
              }
            >
              <li>Selected work</li>
            </NavLink>
            <NavLink
              to="/about"
              aria-label="Link to about"
              onClick={toggleMenu}
              className={({ isActive }) =>
                ` ${
                  isActive
                    ? "underline"
                    : `hover:scale-110 ${bgWhite ? "hover:text-dark-brown" : "text-peach"} transform transition-transform duration-300 origin-center`
                }`
              }
            >
              <li>About</li>
            </NavLink>
          </ul>
        </div>
      )}
    </header>
  );
};
