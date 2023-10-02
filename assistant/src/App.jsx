import React, { useState } from "react";
import Assistant from "./Assistant";
import Button from "./Button";

function App() {
  // ...
  const buttons = [
    {
      id: 1,
      x: 20,
      y: 20,
      message: "This is Button 1",
      verticalOffset: -520,
    },
    { id: 2, x: 140, y: 20, message: "This is Button 2", verticalOffset: -420 },
    { id: 3, x: 260, y: 20, message: "This is Button 3", verticalOffset: -420 },
  ];
  // ...

  const [assistantPosition, setAssistantPosition] = useState({ x: 0, y: 0 });
  const [assistantMessage, setAssistantMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleButtonClick = (button) => {
    const x = button.x;
    const y = button.y + button.verticalOffset;
    setAssistantPosition({ x, y });
    setAssistantMessage(button.message);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  return (
    <div className="w-full bg-[#FFF] h-screen">
      <div className="relative  ">
        <Assistant
          position={assistantPosition}
          message={assistantMessage}
          isVisible={isVisible}
        />

        {/* Render buttons */}
        {buttons.map((button) => (
          <Button
            key={button.id}
            onClick={() => handleButtonClick(button)}
            x={button.x}
            y={button.y}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
