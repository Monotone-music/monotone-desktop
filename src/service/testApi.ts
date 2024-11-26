
import axios from "axios";
import apiClient from "./apiClient";

export const fetchData = async () => {
  try {
    const response = await apiClient.get("/album", {
      method: "GET",
    });
    // console.log(response)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


