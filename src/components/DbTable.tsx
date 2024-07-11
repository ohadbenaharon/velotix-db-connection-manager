import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import useGetApi from "../api/getApi";
import Loader from "./Loader";
import { useNavigate } from "react-router";

const DbTable: React.FC = () => {
  const { data, isLoading } = useGetApi();
  const navigate = useNavigate();

  return (
    <>
      <Loader isLoading={isLoading} />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 900 }}>Database Name</TableCell>
            <TableCell style={{ fontWeight: 900 }}>Username</TableCell>
            <TableCell style={{ fontWeight: 900 }}>Database Type</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data &&
            data?.map((connection, index) => (
              <TableRow
                key={index}
                onClick={() => navigate(`/details/${connection.id}`)}
              >
                <TableCell>{connection.name}</TableCell>
                <TableCell>{connection.username}</TableCell>
                <TableCell>{connection.type}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DbTable;
