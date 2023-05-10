// Initialize a new instance of the BpmnJS viewer and set its options
const viewer = new BpmnJS({
    container: '#canvas', // Set the viewer's container element to the canvas element
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
  
  // Create the canvas and controls elements programatically
  const canvas = document.createElement('div');
  canvas.id = 'canvas';
  
  const controls = document.createElement('div');
  controls.id = 'controls';
  
  // Append the canvas and controls elements to the bpmn-wrapper element
  const bpmnWrapper = document.getElementById('bpmn-wrapper');
  bpmnWrapper.appendChild(canvas);
  bpmnWrapper.appendChild(controls);
  
  // Create the zoom buttons programatically and append them to the controls element
  const zoomInButton = document.createElement('button');
  zoomInButton.id = 'zoom-in';
  zoomInButton.className = 'secondary-button mdi mdi-magnify-plus-outline mr-2';
  controls.appendChild(zoomInButton);
  
  const zoomOutButton = document.createElement('button');
  zoomOutButton.id = 'zoom-out';
  zoomOutButton.className = 'secondary-button mdi mdi-magnify-minus-outline mr-2';
  controls.appendChild(zoomOutButton);
  
  const resetZoomButton = document.createElement('button');
  resetZoomButton.id = 'reset-zoom';
  resetZoomButton.className = 'secondary-button mdi mdi-reload';
  controls.appendChild(resetZoomButton);
  
  // Set the zoom factor for each step
  const ZOOM_FACTOR = 1.75;
  
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
  