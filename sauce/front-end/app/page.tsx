"use client"

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef } from "react"
import { Environment, OrbitControls } from "@react-three/drei";
import { Shirt } from '../public/threedobject/shirtcode';
import CameraMovement from './CameraMovement';
import ShirtRotationControls from './ShirtRotationControls';
import * as THREE from 'three';
import { Button, Box, Stack, ChakraProvider, defaultSystem, HStack, Image, Card, Badge } from "@chakra-ui/react";
import { CardHorizontal } from "@/components/ui/Card";

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





export default function Home() {
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

  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 5]);
  const shirtRef = useRef<THREE.Group>(null);

  const Tab = () => { //this is the code where I have put the chackra tab, it is long so keep it closed
    const [open, setOpen] = useState(false)

    return (
      <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            Open Materials
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
          <Box display="flex" flexDirection="column">
            <Image
              objectFit="cover"
              maxW="100%"
              h="100%"
              src="/Images/red-plaid_preview.jpg"
              alt="Material Preview"
              mb={4}
            />
            <p>
              This is some default text which I will get about to replacing later when I figure some other things out
            </p>
            <Image
              mt={10}
              objectFit="cover"
              maxW="100%"
              h="100%"
              src="/Images/houndstooth-fabric-weave_preview.jpg"
              alt="Material Preview"
              mb={4}
            />
            <p>
              Hounds Tooth weave 
            </p>
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerActionTrigger>
            <Button>Save</Button>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    )
  }

  return (
    <ChakraProvider value={defaultSystem}>
      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0, 25], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.2} />
          <spotLight intensity={600.6} angle={0.6} penumbra={2} position={[10, 15, 10]} castShadow />
          <spotLight intensity={500000.6} angle={0.6} penumbra={2} position={[-220, -195, -150]} castShadow />
          
          <Suspense fallback={null}>
            <Shirt 
              ref={shirtRef}
              scale={22.6} 
              position={[0, -2, 0]} 
              materials={materials} 
              setCameraPosition={setCameraPosition}
            />
            <Environment preset="studio" environmentIntensity={0.6} environmentRotation={[1000, 100, 0]}/>
            <ShirtRotationControls meshRef={shirtRef} />
          </Suspense>
          <CameraMovement position={cameraPosition} />
        </Canvas>

        <Box position="absolute" top="20px" right="20px" zIndex={1}>
          <Tab />
        </Box>

        <Box position="absolute" top="20px" left="20px" zIndex={1}>
          <CardHorizontal />
        </Box>

        <Box position="absolute" top="20px" left="20px" zIndex={1}>
          <Stack direction="column" align="flex-start">
            <Button
              colorScheme="blue"
              onClick={() => {
                changeMaterial('back');
                setCameraPosition([0, 0, 25]);
              }}
            >
              Change Back
            </Button>
            <Button colorScheme="blue" onClick={() => { changeMaterial('front'); setCameraPosition([0, 0, 25]); }}>
              Change Front
            </Button>
            <Button colorScheme="blue" onClick={() => { changeMaterial('neckline'); setCameraPosition([0, 5, 10]); }}>
              Change Neckline
            </Button>
            <Button colorScheme="blue" onClick={() => { changeMaterial('rightSleeve'); setCameraPosition([-5, 0, 15]); }}>
              Change Right Sleeve
            </Button>
            <Button colorScheme="blue" onClick={() => { changeMaterial('leftSleeve'); setCameraPosition([5, 0, 15]); }}>
              Change Left Sleeve
            </Button>
          </Stack>
        </Box>
      </div>
    </ChakraProvider>
  );
}

const ThreeDContainer = styled.div`
  canvas {
    width: 100vw;
    height: 100vh;
    display: block;
  }
`;

