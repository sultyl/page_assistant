import { useState } from "react";
import Button from "./Button";

const OnPageAssistant = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState("");

  const moveAssistant = (x, y, message) => {
    setPosition({ x, y });
    setMessage(message);
  };

  return (
    <div className="fixed bottom-0 left-0 bg-white p-4 border rounded-lg shadow-lg">
      <img
        src="data:image/jpeg;base64,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"
        alt="Assistant"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        className="w-12 h-12 transition-transform duration-300"
      />
      <div>{message}</div>
    </div>
  );
};

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState("");

  const moveAssistant = (x, y, message) => {
    setPosition({ x, y });
    setMessage(message);
  };

  const buttons = [
    { label: "Button 1", message: "This is Button 1" },
    { label: "Button 2", message: "This is Button 2" },
    { label: "Button 3", message: "This is Button 3" },
    { label: "Button 4", message: "This is Button 4" },
    { label: "Button 5", message: "This is Button 5" },
  ];

  return (
    <div className="flex">
      <div className="mr-4">
        {buttons.map((button, index) => (
          <Button
            key={index}
            label={button.label}
            onClick={() => moveAssistant(0, 0, button.message)}
          />
        ))}
      </div>
      <OnPageAssistant />
    </div>
  );
};

export default App;
