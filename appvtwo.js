// Define an array of BPMN XML files
const bpmnXMLVariables = [
  bpmnXML,
  bpmnXML,
  bpmnXML
];

// Define the zoom factor for each step
const ZOOM_FACTOR = 1.75;

// Initialize the viewer variable
let viewer;

// Loop through the BPMN XML files and create a viewer and controls for each one
bpmnXMLVariables.forEach((bpmnXML, index) => {
  // Set the viewer variable to a new instance of BpmnJS
  viewer = new BpmnJS({
    container: `#canvas-${index}`, // Set the viewer's container element to the dynamically created canvas element
    keyboard: {
      bindTo: window, // Bind the viewer's keyboard controls to the window object
    },
    additionalModules: [ // Add an additional module to the viewer for zooming and scrolling
      {
        __init__: ['zoomScroll'], // Initialize the zoomScroll module when the viewer is created
        zoomScroll: ['value', { disable: { mouseWheel: true } }], // Disable mouse wheel scrolling for zooming
      },
    ],
  });

  // Define a function for loading a BPMN file from a global JS variable
  async function loadBPMNFromVariable(bpmnXML) {
    try {
      await viewer.importXML(bpmnXML); // Import the BPMN XML into the viewer
      viewer.get('canvas').zoom('fit-viewport'); // Zoom to fit the viewport
    } catch (error) {
      console.error('Error loading BPMN file:', error);
    }
  }

  // Load the current BPMN XML file into the viewer
  loadBPMNFromVariable(bpmnXML);

  // Create the canvas and controls elements programmatically for the current viewer
  const canvas = document.createElement('div');
  canvas.id = `canvas-${index}`;

  const controls = document.createElement('div');
  controls.id = `controls-${index}`;

  // Append the canvas and controls elements to the bpmn-wrapper element for the current viewer
  const bpmnWrapper = document.getElementById('bpmn-wrapper');
  bpmnWrapper.appendChild(canvas);
  bpmnWrapper.appendChild(controls);

  // Create the zoom buttons programmatically and append them to the controls element for the current viewer
  const zoomInButton = document.createElement('button');
  zoomInButton.id = `zoom-in-${index}`;
  zoomInButton.className = 'secondary-button mdi mdi-magnify-plus-outline mr-2';
  controls.appendChild(zoomInButton);

  const zoomOutButton = document.createElement('button');
  zoomOutButton.id = `zoom-out-${index}`;
  zoomOutButton.className = 'secondary-button mdi mdi-magnify-minus-outline mr-2';
  controls.appendChild(zoomOutButton);

  const resetZoomButton = document.createElement('button');
  resetZoomButton.id = `reset-zoom-${index}`;
  resetZoomButton.className = 'secondary-button mdi mdi-reload';
  controls.appendChild(resetZoomButton);

  // Add event listeners to the zoom buttons for the current viewer
  zoomInButton.addEventListener('click', () => {
    const currentZoom = viewer.get('canvas').zoom(false); // Get the current zoom level
    viewer.get('canvas').zoom(currentZoom * ZOOM_FACTOR); // Zoom in by multiplying the current zoom by the zoom factor
  });

  // Add event listeners to the zoom buttons for the current viewer
  zoomInButton.addEventListener('click', () => {
    const currentZoom = viewer.get('canvas').zoom(false); // Get the current zoom level
    viewer.get('canvas').zoom(currentZoom * ZOOM_FACTOR); // Zoom in by multiplying the current zoom by the zoom factor
  });

  zoomOutButton.addEventListener('click', () => {
    const currentZoom = viewer.get('canvas').zoom(false); // Get the current zoom level
    viewer.get('canvas').zoom(currentZoom / ZOOM_FACTOR); // Zoom out by dividing the current zoom by the zoom factor
  });

  resetZoomButton.addEventListener('click', () => {
    viewer.get('canvas').zoom('fit-viewport'); // Reset the zoom to fit the viewport
  });

  // Add the zoom control to the viewer for the current canvas
  viewer.get('canvas').addControl('zoom', {
    zoomIn: {
      step: ZOOM_FACTOR, // Set the zoom factor for each step
    },
    zoomOut: {
      step: 1 / ZOOM_FACTOR, // Set the zoom factor for each step
    },
    reset: 'fit-viewport', // Set the reset behavior to fit the viewport
  });

  // Add event listeners to the zoom buttons for the current viewer
  zoomInButton.addEventListener('click', () => {
    const currentZoom = viewer.get('canvas').zoom(false); // Get the current zoom level
    viewer.get('canvas').zoom(currentZoom * ZOOM_FACTOR); // Zoom in by multiplying the current zoom by the zoom factor
  });

  zoomOutButton.addEventListener('click', () => {
    const currentZoom = viewer.get('canvas').zoom(false); // Get the current zoom level
    viewer.get('canvas').zoom(currentZoom / ZOOM_FACTOR); // Zoom out by dividing the current zoom by the zoom factor
  });

  resetZoomButton.addEventListener('click', () => {
    viewer.get('canvas').zoom('fit-viewport'); // Reset the zoom to fit the viewport
  });

  // Add the zoom control to the viewer for the current canvas
  viewer.get('canvas').addControl('zoom', {
    zoomIn: {
      step: ZOOM_FACTOR, // Set the zoom factor for each step
    },
    zoomOut: {
      step: 1 / ZOOM_FACTOR, // Set the zoom factor for each step
    },
    reset: 'fit-viewport', // Set the reset behavior to fit the viewport
  });
});
