//? React
import * as React from "react";

//? Libraries
import { useParams } from "react-router-dom";

//? Components
import Room from "./pages/Room";

//? Styling
import './App.css';

function App() {
  const params = useParams();

  return (
    <div className="app-wrapper">
      <Room room={params.room || ""} />
    </div>
  );
}

export default App;