# 3D Rotating Cube with Animated Name and Seat Number

This project is a **React + Three.js** application that displays a 3D rotating cube with smooth color-changing animation. Simultaneously, the user's **name** and **seat number** are displayed above the cube, and they also smoothly change color randomly, synchronized with the cube animation.

---

## Demo

- Cube rotates continuously in 3D space.  
- Every 5 seconds, the cube changes to a new random color.  
- Name (`Abdur Rafay Ali Khan`) and seat number (`B23110006004`) change color randomly in sync with the cube.  
- Smooth color transitions for a visually appealing effect.  
- Responsive canvas that adjusts to browser resize.

---

## Technologies Used

- **React**: Frontend library for UI rendering.  
- **Three.js**: For creating and animating the 3D cube.  
- **JavaScript & JSX**: Animation logic and rendering.  
- **CSS**: For header animations and styling.

---

## Features

1. **3D Cube Rotation**  
   The cube rotates continuously along X and Y axes.

2. **Random Cube Color Animation**  
   - Cube changes to a random color every 5 seconds.  
   - Smooth interpolation between old and new colors.

3. **Animated Name & Seat Number**  
   - Name and seat number colors also change randomly every 5 seconds.  
   - Smooth color transitions to match the cube's visual effect.

4. **Responsive Design**  
   - The Three.js canvas resizes automatically with the browser window.  
   - Header remains at the top and adjusts to screen width.

---

## How It Works

1. **Three.js Scene Setup**  
   - Creates a scene, perspective camera, renderer, lighting, floor plane, and cube mesh.  
   - Cube rotation is handled inside `requestAnimationFrame` loop.  

2. **Color Animation**  
   - Cube and text colors are stored as `THREE.Color` objects.  
   - Every 5 seconds, new target colors are randomly generated.  
   - Smooth interpolation (`lerp`) updates colors frame by frame for animation.

3. **React State Integration**  
   - Name and seat number colors are stored in React state to update the DOM.  
   - Transitions use inline CSS `transition` for smooth effect.

---

**Abdur Rafay Ali Khan**
**Seat NO : B23110006004**
