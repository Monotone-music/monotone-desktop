import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_DEV_URL
    // headers: {
    //     'Content-Type': 'application/json'
    // }
})

// todo: clone mot client rieng stream
//chatgpt: https://chatgpt.com/c/6745a1f1-50b4-8000-81f6-c86fd88d32d3
export default apiClient;