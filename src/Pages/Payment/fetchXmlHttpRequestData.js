// which endpoint should I use 
const xhr = new XMLHttpRequest();
xhr.open("GET", "http://127.0.0.1:5001/clone-dangetu/us-central1/api", true);
xhr.responseType = "text"; // Set responseType to 'text'
xhr.onload = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.error("Error:", xhr.statusText);
    }
  }
};
xhr.send();

// put this is in you html 
{/* <script src="path/to/fetchData.js"></script> */}

// Error: inspector.js:7 Error processing XMLHttpRequest response: InvalidStateError: Failed to read the 'responseText' property from 'XMLHttpRequest': The value is only accessible if the object's 'responseType' is '' or 'text' (was 'arraybuffer'). at XMLHttpRequest.<anonymous> (inspector.js:7:2902)

// This error occurs because the responseText property of the XMLHttpRequest object is only accessible if the responseType is set to an empty string ('') or 'text'. In our case, it seems the responseType was set to 'arraybuffer', which is why the error was thrown.

// To resolve this error, you need to set the responseType to 'text' before sending the request.