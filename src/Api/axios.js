import axios from "axios"


const axiosInstance = axios.create({
    // local instance of firebase functions
    // baseURL: "http://127.0.0.1:5001/clone-c5a71/us-central1/api"
    
    // Deployed version of firebase functions
    baseURL: "https://api-wa3k3iyjia-uc.a.run.app",

    //Deployed version of amazon server on render.com
    // baseURL:"https://amazon-deploy-api.onrender.com/"
}); 

export {axiosInstance}

// const baseURL =
//   import.meta.env.MODE === "development"
//     ? "http://localhost:5001/clone-c5a71/us-central1/api"
//     : "https://us-central1-clone-c5a71.cloudfunctions.net/api";

// export const axiosInstance = axios.create({ baseURL });