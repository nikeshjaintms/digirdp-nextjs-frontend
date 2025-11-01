'use client';

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // For cookies management
import Link from "next/link";
const assets = '/assets';

const ThemeSwitcher = () => {
  // Set the initial theme from cookies (defaults to light)
  const initialTheme = Cookies.get("theme") || "dark";
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    // Update the body class based on the selected theme
    if (theme === "dark") {
      document.body.classList.add("active-dark-mode");
      document.body.classList.remove("active-light-mode");
    } else {
      document.body.classList.add("active-light-mode");
      document.body.classList.remove("active-dark-mode");
    }

    // Persist the theme in a cookie for future visits
    Cookies.set("theme", theme, { expires: 7 });
  }, [theme]); // Run the effect when the theme changes

  const switchTheme = (newTheme, event) => {
    event.preventDefault(); // Prevent default link navigation
    setTheme(newTheme);
  };

  return (
   <div id="my_switcher" className="my_switcher">
      <ul>
        <li>
          <Link
            href="/"
            data-theme="light"
            className={`setColor light ${theme === "light"
              ? "active" : ""}`}
            onClick={(event) => switchTheme("light", event)}
          >
            <img src={`${assets}/images/light/switch/moon.svg`} alt="Vector Images" />
            
            <span title="Light Mode">Light</span>
          </Link>
        </li>
        <li>
          <Link
            href="/"
            data-theme="dark"
            className={`setColor dark ${theme === "dark" ? "active" : ""}`}
            onClick={(event) => switchTheme("dark", event)}
          >
            <img src={`${assets}/images/light/switch/sun.svg`} alt="Sun images" />
            <span title="Dark Mode">Dark</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ThemeSwitcher;