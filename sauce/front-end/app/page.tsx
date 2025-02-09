"use client"

import React, { Suspense, useState, useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Shirt, ShirtPart } from '../public/threedobject/shirtcode';
import CameraMovement from './CameraMovement';
import ShirtRotationControls from './ShirtRotationControls';
import * as THREE from 'three';
import { Button, Box, Stack, ChakraProvider, defaultSystem, HStack, Image, Card, Badge } from "@chakra-ui/react";
import { CardHorizontal } from "../components/ui/Card";
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

import {
  DrawerActionTrigger,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer"

// Simple Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: (error: Error) => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Page mounted, auth state:', { isAuthenticated });
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      console.log('No token found, redirecting to login...');
      router.push('/login');
    }
  }, [isAuthenticated]);

  // Don't show anything while checking auth
  if (!isAuthenticated) {
    return null;
  }

  const [materials, setMaterials] = useState({
    back: 'red-plaid',
    front: 'red-plaid',
    neckline: 'Denim fabric',
    leftSleeve: 'Houndstooth fabric',
    rightSleeve: 'Houndstooth fabric',
  });

  const handleError = (error: any) => {
    console.error('Error loading 3D model:', error);
    setLoadError('Failed to load 3D model. Please try refreshing the page.');
    setIsLoading(false);
  };

  const [clickedPart, setClickedPart] = useState<ShirtPart | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const handlePartClick = (part: ShirtPart) => {
    setClickedPart(part);
    setIsDrawerOpen(true);
  };

  const Tab = () => {
    return (
      <DrawerRoot open={isDrawerOpen} onOpenChange={(e: { open: boolean }) => setIsDrawerOpen(e.open)}>
        {/* <DrawerBackdrop /> */}
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
          <Box
              as="button"
              onClick={() => {
                
                if(clickedPart) {
                  setMaterials(prev =>({
                    ...prev,
                    [clickedPart]: 'red-plaid'

                  }));
                }
              }}
              style={{
                background: 'none',
                border: '4px',
                padding: 0,
                cursor: 'pointer'
              }}
            >
        
            <Image
              objectFit="cover"
              maxW="100%"
              h="100%"
              src="/Images/red-plaid_preview.jpg"
              alt="red-plaid"
              mb={4}
            />
            </Box>
            <p>
              This is some default text which I will get about to replacing later when I figure some other things out
            </p>
            <Box
              as="button"
              onClick={() => {

                if(clickedPart) {
                  setMaterials(prev =>({
                    ...prev,
                    [clickedPart]: 'Houndstooth fabric'

                  }));
                }
              }}
              style={{
                background: 'none',
                border: '4px',
                padding: 0,
                cursor: 'pointer'
              }}
            >

            
              <Image
                mt={10}
                objectFit="cover"
                maxW="100%"
                h="100%"
                src="/Images/houndstooth-fabric-weave_preview.jpg"
                alt="Houndstooth fabric"
                mb={4}
              />
            
            </Box>
            <p>
              Hounds Tooth weave 
            </p>

            <Box
              as="button"
              onClick={() => {
                
                
                if(clickedPart) {
                  setMaterials(prev =>({
                    ...prev,
                    [clickedPart]: 'Denim fabric'

                  }));
                }
              }}
              style={{
                background: 'none',
                border: '0px',
                padding: 0,
                cursor: 'pointer'
              }}
            >
            <Image
              mt={10}
              objectFit="cover"
              maxW="100%"
              h="100%"
              src="/Images/denim.png"
              alt="Denim fabric"
              mb={10}
            />
            </Box>
            
            <p>
              Denium
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
        {loadError && (
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 1000
          }}>
            {loadError}
          </div>
        )}
        
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
            <ErrorBoundary onError={handleError}>
              <Shirt 
                ref={shirtRef}
                scale={22.6} 
                position={[0, -2, 0]} 
                materials={materials} 
                setCameraPosition={setCameraPosition}
                onPartClick={handlePartClick} 
              />
            </ErrorBoundary>
            <Environment preset="studio" environmentIntensity={0.6} environmentRotation={[1000, 100, 0]}/>
            <ShirtRotationControls meshRef={shirtRef} />
          </Suspense>
          <CameraMovement position={cameraPosition} />
        </Canvas>

        <Box position="absolute" top="20px" right="20px" zIndex={1}>
          <Tab />
        </Box>

        <Box position="absolute" top="20px" left="20px" zIndex={1}>
          <Stack direction="column" align="flex-start">
          <Button colorScheme="blue" onClick={() => {changeMaterial('back'); setCameraPosition([0, 0, 25]); }}>
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
  };
`
