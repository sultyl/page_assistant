import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const App = () => {
  const containerRef = useRef();
  const [description, setDescription] = useState("");
  const [modelPosition, setModelPosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );

  useEffect(() => {
    // Create Scene
    const scene = new THREE.Scene();
    scene.background = null;
    scene.add(new THREE.AxesHelper(5));

    // Add a light
    const light = new THREE.PointLight(0xffffff, 1000);
    light.position.set(2.5, 7.5, 15);
    scene.add(light);

    // Add a camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0.8, 1.4, 1.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(200, 200);

    const container = containerRef.current;
    container.appendChild(renderer.domElement);

    // Add the orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1, 0);

    let mixer;
    let modelReady = false;

    // Load our FBX model from the directory
    const loader = new FBXLoader();
    loader.load("Walking.fbx", function (object) {
      // Scale and position the model
      object.scale.set(0.01, 0.007, 0.007);
      object.position.set(0, 0, 0);

      mixer = new THREE.AnimationMixer(object);
      const action = mixer.clipAction(object.animations[0]);
      action.play();

      scene.add(object);

      modelReady = true;
    });
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);

      // Call the animate on the object
      if (modelReady) mixer.update(clock.getDelta());

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      if (container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleButtonClick = (buttonIndex) => {
    setDescription(`This is Button ${buttonIndex}`);

    const newPosition = new THREE.Vector3(0, buttonIndex * 2, 0);
    setModelPosition(newPosition);
  };

  return (
    <div className="bg-red-400 h-screen w-screen">
      <div className=" container flex md:flex-row flex-col gap-4 px-3 py-3">
        <button
          onClick={() => handleButtonClick(1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Button 1
        </button>
        <button
          onClick={() => handleButtonClick(2)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Button 2
        </button>
        <button
          onClick={() => handleButtonClick(3)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Button 3
        </button>
        <button
          onClick={() => handleButtonClick(4)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Button 4
        </button>
        <button
          onClick={() => handleButtonClick(5)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Button 5
        </button>
      </div>
      <div className="bg-blue-500 text-white p-2 rounded">
        <p>{description}</p>
      </div>
      <div ref={containerRef} />
      {/* Display the FBX model at the specified position */}
      <div
        style={{
          position: "absolute",
          bottom: `${modelPosition.y * 50}px`, // Adjust the scaling factor as needed
          left: `${modelPosition.x * 50}px`, // Adjust the scaling factor as needed
          transform: "scale(0.01)", // Adjust the scale as needed
        }}
      >
        {/* Add the code to display the FBX model here */}
      </div>
    </div>
  );
};

export default App;
