import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DbConnectionType } from "../types/dbConnectionType";

async function getSpecificDbConnection(id: string): Promise<DbConnectionType> {
  return axios
    .get(`http://localhost:4000/databases/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data);
}

export default function useGetSpecificDbConnection(
  id: string
): QueryObserverResult<DbConnectionType> {
  return useQuery({
    queryKey: [`getSpecificDbConnection-${id}`],
    queryFn: async () => await getSpecificDbConnection(id).then((res) => res),
    staleTime: 1000 * 60 * 10,
  });
}
