import { useState } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

function FBXModel() {
  const [model, setModel] = useState(null);

  // Load the FBX model when the component mounts
  React.useEffect(() => {
    const loader = new FBXLoader();
    loader.load("/assets/walking.fbx", (fbx) => {
      setModel(fbx);
    });
  }, []);

  return model ? <primitive object={model} scale={[0.1, 0.1, 0.1]} /> : null;
}

export default FBXModel;
