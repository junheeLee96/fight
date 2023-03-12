import React, { useState } from "react";
import Canvas from "./Canvas";
import Game from "./Game";

const App = () => {
  const [isStart, setIsStart] = useState<boolean>(false);

  const isStartToggle = () => {
    setIsStart((prev) => !prev);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {isStart ? (
        <div>
          <Game />
        </div>
      ) : (
        <Canvas isStartToggle={isStartToggle} />
      )}
    </div>
  );
};

export default App;
