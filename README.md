# Atlas Technologies — Full 3D Website

A full-page, scroll-driven 3D studio website built with React, Vite, Three.js and React Three Fiber. The 3D scene is persistent behind the full site and changes to a distinct interactive 3D composition as each section becomes active: orbital globe, kinetic manifesto sculpture, service sculpture, pixel-built monitor, mechanical process rings, architectural pillars and contact core. Cursor movement influences the 3D objects. The FRAMEZ project CTA opens the live FRAMEZ website.

## Run locally

1. Install Node.js LTS if it is not installed.
2. Extract this ZIP.
3. Open the `atlas-technologies-premium` folder in VS Code.
4. In the VS Code terminal run:

   ```powershell
   npm install
   npm run dev
   ```

5. Open the localhost URL Vite prints.

## Production build

```powershell
npm run build
npm run preview
```

## Notes

- This is a full website experience, not only a single project section.
- The 3D forms are procedurally modelled in Three.js, so no external 3D model downloads are needed.
- Existing project assets and components are retained in the source tree; the main experience is now driven by the new `src/App.jsx` and `src/App.css`.
- The current container could not finish `npm install` before timing out, so a production build could not be verified here. Run the commands above locally to install dependencies and build.


## Scroll-driven 3D update

The shared React Three Fiber canvas now receives a normalized progress value from the currently active page section. Scrolling drives the 3D scene groups' position, rotation, and scale. The Framez monitor scene additionally animates its pixel cubes from a dispersed cloud into the monitor composition, raises the monitor, and increases the cubes' emissive glow as the section progresses. These are actual Three.js object transforms, not CSS-only fades.

For best results, test with a mouse/trackpad on desktop and scroll slowly through every section. WebGL support is required for the 3D layer. The production build has not been verified in this environment because package installation timed out; run `npm install` and `npm run build` locally before publishing.
