import axios from "axios";

export default axios.create({
  baseURL: "https://vlakikosta-db-default-rtdb.firebaseio.com/",
});
