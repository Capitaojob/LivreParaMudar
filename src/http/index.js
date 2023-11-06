import axios from "axios";

const http = axios.create({
  baseURL: "https://hungry-pink-lion.cyclic.app/",
});

export default http;
