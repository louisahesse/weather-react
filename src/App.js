import React from "react";
import "./App.css";
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather defaultCity="Tokyo" />
        <footer>
          This project was coded by{" "}
          <a
            href="https://www.shecodes.io/graduates/52195-louisa-hesse"
            target="_blank"
            rel="noreferrer"
          >
            Louisa Hesse
          </a>{" "}
          and is {""}
          <a
            href="https://github.com/louisahesse/weather-react"
            target="_blank"
            rel="noreferrer"
          >
            open-sourced on Github
          </a>{" "}
          and{" "}
          <a
            href="https://astounding-biscochitos-55781a.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            hosted on Netlify
          </a>
        </footer>
      </div>
    </div>
  );
}
