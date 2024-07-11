import axios from "axios";
import { DbConnectionType } from "../types/dbConnectionType";

async function addNewDbConnection(params: DbConnectionType) {
  return axios
    .post(`http://localhost:4000/databases`, {
      ...params,
    })
    .then((res) => res?.data);
}

export default addNewDbConnection;
