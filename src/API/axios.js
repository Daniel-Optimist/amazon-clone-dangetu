import axios from "axios"

const axiosInstance = axios.create({
    // local instance of firebase function 
    baseURL: "http://127.0.0.1:5001/clone-dangetu/us-central1/api",

})

// Named export to avoid confusion with axios that comes with default export
export {axiosInstance}
