import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DbConnectionType } from "../types/dbConnectionType";

async function getApi(): Promise<DbConnectionType> {
  return axios
    .get("http://localhost:4000/databases", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data);
}

export default function useGetApi(): QueryObserverResult<DbConnectionType[]> {
  return useQuery({
    queryKey: [`getDatabases`],
    queryFn: async () => await getApi().then((res) => res),
    staleTime: 1000 * 60 * 10,
  });
}
