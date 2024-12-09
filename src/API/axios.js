import axios from "axios";
// make only one of the api versions on and comment out the others

const axiosInstance = axios.create({
  // local instance of firebase function
  // baseURL: "http://127.0.0.1:5001/clone-dangetu/us-central1/api",

  //Deployed version of amazon server on Render.com
  baseURL: "https://amazon-api-deployed-8coy.onrender.com",
});

// Named export to avoid confusion with axios that comes with default export
export { axiosInstance };
