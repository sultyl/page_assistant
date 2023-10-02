import { useState } from "react";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import * as THREE from "three";

const App = () => {
  const [assistantPosition, setAssistantPosition] = useState({ x: 20, y: 80 });
  const [showAssistant, setShowAssistant] = useState(false);
  const [buttonDescription, setButtonDescription] = useState("");

  const buttons = [
    { id: 1, label: "Button 1", description: "This is button 1." },
    { id: 2, label: "Button 2", description: "This is button 2." },
    { id: 3, label: "Button 3", description: "This is button 3." },
    { id: 4, label: "Button 4", description: "This is button 4." },
    { id: 5, label: "Button 5", description: "This is button 5." },
  ];

  const handleButtonClick = (button) => {
    const targetPosition = { x: button.id * 100, y: window.innerHeight - 100 };
    setButtonDescription(button.description);
    moveAssistant(targetPosition);
  };

  const moveAssistant = (targetPosition) => {
    // Create a Three.js renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Load the FBX model
    const loader = new FBXLoader();
    loader.load("/Iv.fbx", (fbx) => {
      // Adjust the position, scale, and rotation of the loaded model
      fbx.position.set(assistantPosition.x, assistantPosition.y, 0);
      fbx.scale.set(0.1, 0.1, 0.1);

      // Create a group to hold the model and animation
      const group = new THREE.Group();
      group.add(fbx);

      // Set up camera position
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 10); // Adjust camera position

      // Add the group to the scene
      const scene = new THREE.Scene();
      scene.add(group);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Add ambient light
      scene.add(ambientLight);

      // Calculate animation duration
      const animationDuration = 1000; // 1 second

      // Calculate animation frames
      const frames = Math.floor(animationDuration / 16.7); // Assuming 60 FPS

      // Calculate step values for position
      const stepX = (targetPosition.x - assistantPosition.x) / frames;
      const stepY = (targetPosition.y - assistantPosition.y) / frames;

      // Start animation loop
      let frame = 0;
      const animate = () => {
        if (frame < frames) {
          // Update assistant position
          fbx.position.x += stepX;
          fbx.position.y += stepY;

          // Render the scene
          renderer.render(scene, camera);

          // Request next frame
          frame++;
          requestAnimationFrame(animate);
        } else {
          // Animation completed, show assistant content
          setAssistantPosition(targetPosition);
          setShowAssistant(true);
        }
      };

      animate();
    });
  };

  return (
    <div className="h-screen bg-red-400">
      <h1>Buttons</h1>
      <div className="flex space-x-2">
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => handleButtonClick(button)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {button.label}
          </button>
        ))}
      </div>

      {/* The assistant */}
      {showAssistant && (
        <div
          className="absolute bg-red-400 p-4 rounded shadow-lg"
          style={{
            left: `${assistantPosition.x}px`,
            top: `${assistantPosition.y}px`,
          }}
        >
          <p>{buttonDescription}</p>
        </div>
      )}
    </div>
  );
};

export default App;
