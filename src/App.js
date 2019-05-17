import React from "react";
import BoxScore from "./BoxScore";
import "./App.css";
import MLBData from "./MLBData";
import NBAData from "./NBAData";

function App() {
  let state = { data: MLBData };
  return (
    <div className="App">
      <BoxScore data={state.data} />
    </div>
  );
}

export default App;
