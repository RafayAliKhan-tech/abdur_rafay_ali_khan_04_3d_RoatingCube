// src/PlainCubeRotate.jsx
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const PlainCubeRotate = () => {
  const mountRef = useRef(null);
  // Color state for the HTML text
  const [textColor, setTextColor] = useState("#8b4513");

  useEffect(() => {
    const container = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      65,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(1, 3, 6);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0x8b4513,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    scene.add(cube);

    // Floor
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.4 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2;
    plane.receiveShadow = true;
    scene.add(plane);

    // Lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 5);
    light.castShadow = true;
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // COLOR ANIMATION SETUP
    let currentColor = new THREE.Color(0x8b4513);
    let targetColor = new THREE.Color(Math.random() * 0xffffff);
    let lastChangeTime = Date.now();

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotation
      cube.rotation.x += 0.02;
      cube.rotation.y += 0.02;

      // Every 5 sec new color
      if (Date.now() - lastChangeTime > 5000) {
        targetColor = new THREE.Color(Math.random() * 0xffffff);
        lastChangeTime = Date.now();
      }

      // Smooth transition (Lerp)
      currentColor.lerp(targetColor, 0.02);
      cube.material.color.copy(currentColor);

      // Update React State so HTML text matches the cube
      // Converting Three.js color to Hex string for CSS
      setTextColor(`#${currentColor.getHexString()}`);

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* 🚀 Header Section with Dynamic Color */}
      <header
        style={{
          position: "absolute",
          top: "20px",
          width: "100%",
          textAlign: "center",
          zIndex: 10,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          animation: "fadeInDown 1.5s ease-out"
        }}
      >
        <h1 
          style={{ 
            margin: "0", 
            color: textColor, // Dynamic color applied here
            fontSize: "2.5rem", 
            letterSpacing: "2px",
            transition: "color 0.1s linear" // Smooth transition for text
          }}
        >
          Abdur Rafay Ali Khan
        </h1>
        <p 
          style={{ 
            margin: "25px 0", 
            color: textColor, // Dynamic color applied here
            fontSize: "1.5rem", 
            fontWeight: "bold",
            transition: "color 0.1s linear"
          }}
        >
          B23110006004
        </p>

        <style>
          {`
            @keyframes fadeInDown {
              from { opacity: 0; transform: translateY(-30px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </header>

      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default PlainCubeRotate;