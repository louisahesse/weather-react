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
            herf="https://www.shecodes.io/graduates/52195-louisa-hesse"
            target="_blank"
          >
            Louisa Hesse
          </a>{" "}
          and is {""}
          <a
            href="https://github.com/louisahesse/weather-react"
            target="_blank"
          >
            open-sourced on Github
          </a>
        </footer>
      </div>
    </div>
  );
}
