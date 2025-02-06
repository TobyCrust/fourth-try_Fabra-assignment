"use client"

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react"
import { Environment, OrbitControls } from "@react-three/drei";
import { Shirt } from '../public/threedobject/shirtcode';



import { Button } from "@chakra-ui/react"
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"





// const Model = () => {
  
//   // const gltf = useLoader(GLTFLoader, "/threedobject/target-tshirt.glb");  ----------- old shirt
//   const gltf = useLoader(GLTFLoader, "/threedobject/Shirt-textures.glb");


//   return (
//     <>
//       <primitive dispose={null} object={gltf.scene} scale={1.6} position={[0, -.2, 0]} />
//     </>
//   );

// }







export default function Home() { // This is where I'm puttig the model and all the camera/environment settings ect
  const [materials, setMaterials] = useState({
    back: 'red-plaid',
    front: 'red-plaid',
    neckline: 'Denim fabric',
    leftSleeve: 'Houndstooth fabric',
    rightSleeve: 'Houndstooth fabric',
  });

  const availablePatterns = ['red-plaid', 'Houndstooth fabric', 'Denim fabric'];

  const changeMaterial = (part: keyof typeof materials) => {
    setMaterials(prev => {
      const currentIndex = availablePatterns.indexOf(prev[part]);
      const nextIndex = (currentIndex + 1) % availablePatterns.length;
      return {
        ...prev,
        [part]: availablePatterns[nextIndex]
      };
    });
  };
// help testttt
  return (
    <main>
      <div style={{ position: 'absolute', zIndex: 1, padding: '20px' }}>
        <button onClick={() => changeMaterial('back')}>Change Back</button>
        <button onClick={() => changeMaterial('front')}>Change Front</button>
        <button onClick={() => changeMaterial('neckline')}>Change Neckline</button>
        <button onClick={() => changeMaterial('leftSleeve')}>Change Left Sleeve</button>
        <button onClick={() => changeMaterial('rightSleeve')}>Change Right Sleeve</button> 
      </div>

      <ThreeDContainer>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 10, 40], fov: 50 }}>
          <ambientLight intensity={0.2} />
          <spotLight intensity={600.6} angle={0.6} penumbra={2} position={[10, 15, 10]} castShadow />
          <spotLight intensity={500000.6} angle={0.6} penumbra={2} position={[-220, -195, -150]} castShadow />
          
         
          {/* <spotLight intensity={600.6} angle={0.2} penumbra={2} position={[10, 15, 10]} castShadow /> */}
          <Suspense fallback={null}>
            <Shirt scale={22.6} position={[0, -2, 0]} materials={materials} />
            <Environment preset="studio" environmentIntensity={0.6} environmentRotation={[1000, 100, 0]}/>
          </Suspense>
          <OrbitControls autoRotate autoRotateSpeed={0.5}/>
        </Canvas>
      </ThreeDContainer>
    </main>
  );
}


const ThreeDContainer = styled.div`
  canvas {
    width: 100vw;
    height: 100vh;
    display: block;
  }
`;

