// Get the canvas element from the HTML page
const canvas = document.getElementById('canvas');

// Initialize a new instance of the BpmnJS viewer and set its options
const viewer = new BpmnJS({
  container: canvas, // Set the viewer's container element to the canvas element
  keyboard: {
    bindTo: window, // Bind the viewer's keyboard controls to the window object
  },
  additionalModules: [ // Add an additional module to the viewer for zooming and scrolling
    {
      __init__: ['zoomScroll'], // Initialize the zoomScroll module when the viewer is created
      zoomScroll: ['value', {disable: {mouseWheel: true}}], // Disable mouse wheel scrolling for zooming
    },
  ],
});

// // Define a function for loading a BPMN file from a URL
// async function loadBPMN(url) {
//   try {
//     const response = await fetch(url); // Fetch the BPMN file from the specified URL
//     const bpmnXML = await response.text(); // Convert the response to text
//     await viewer.importXML(bpmnXML); // Import the BPMN XML into the viewer
//     viewer.get('canvas').zoom('fit-viewport'); // Zoom to fit the viewport
//   } catch (error) {
//     console.error('Error loading BPMN file:', error);
//   }
// }

// // Load your BPMN file from a URL
// loadBPMN('/sites/default/files/bpmn/process.bpmn');


// Define a function for loading a BPMN file from a global JS variable
async function loadBPMNFromVariable(bpmnXML) {
  try {
    await viewer.importXML(bpmnXML); // Import the BPMN XML into the viewer
    viewer.get('canvas').zoom('fit-viewport'); // Zoom to fit the viewport
  } catch (error) {
    console.error('Error loading BPMN file:', error);
  }
}

// Load your BPMN file from a global JS variable
// const bpmnXMLVariable = "<your BPMN XML here>";
loadBPMNFromVariable(bpmnXMLVariable);



// Add these lines inside the <script> tag in your HTML

// Get the zoom buttons from the HTML page
const zoomInButton = document.getElementById('zoom-in');
const zoomOutButton = document.getElementById('zoom-out');
const resetZoomButton = document.getElementById('reset-zoom');

const ZOOM_FACTOR = 1.75; // Set the zoom factor for each step

// Add event listeners to the zoom buttons
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
