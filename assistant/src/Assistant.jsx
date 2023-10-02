import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

const AssistantWith3DModel = () => {
  const containerRef = useRef();

  // ...
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Load the FBX model from the assets folder
    const loader = new FBXLoader();
    loader.load("/Walking.fbx", (fbx) => {
      // Adjust the position, scale, and rotation of the loaded model
      fbx.position.set(0, 0, 0);
      fbx.scale.set(0.1, 0.1, 0.1);
      fbx.rotation.set(0, Math.PI, 0);

      // Add the model to the scene (you can remove the variable assignment)
      scene.add(fbx);

      // Set up camera position
      camera.position.z = 5;

      // Render loop
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();
    });
  }, []);
  // ...

  return <div className="bg-red-400" ref={containerRef}></div>;
};

export default AssistantWith3DModel;
