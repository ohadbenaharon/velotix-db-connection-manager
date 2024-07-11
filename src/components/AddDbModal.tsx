import React from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import addNewDbConnection from "../api/addNewDb";
import { DbConnectionType, dbType } from "../types/dbConnectionType";
import { useQueryClient } from "@tanstack/react-query";
import ClearIcon from "@mui/icons-material/Clear";
import useGetApi from "../api/getApi";

type AddDbModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddDbModal: React.FC<AddDbModalProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DbConnectionType>();
  const queryClient = useQueryClient();
  const { data: DbConnectionData } = useGetApi();

  const handleFormSubmit = handleSubmit(async (data) => {
    if (DbConnectionData) data.id = String(DbConnectionData.length + 1);
    await addNewDbConnection(data);
    onClose();
    queryClient.invalidateQueries({ queryKey: ["getDatabases"] });
    reset();
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "white",
    boxShadow: 24,
    p: 6,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={style}>
        <IconButton
          onClick={onClose}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            cursor: "pointer",
          }}
        >
          <ClearIcon />
        </IconButton>
        <form
          onSubmit={handleFormSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <TextField
            label="Database Name"
            {...register("name", { required: true })}
            error={!!errors.name}
            helperText={errors.name ? "Database Name is required" : ""}
          />
          <TextField
            label="URL"
            {...register("url", {
              required: true,
              pattern: {
                value: /^https:\/\/.*/,
                message: "URL must start with 'https://'.",
              },
              validate: (value) => {
                if (DbConnectionData) {
                  const isExist = DbConnectionData.some(
                    (db) => db.url === value
                  );

                  return !isExist || "Url already exist";
                }
              },
            })}
            error={!!errors.url}
            helperText={
              errors.url ? errors?.url.message || "Url Is required" : ""
            }
          />
          <TextField
            label="Username"
            {...register("username", { required: true })}
            error={!!errors.username}
            helperText={errors.username ? "Username is required" : ""}
          />

          <FormControl>
            <InputLabel id="TypeLableId">Type</InputLabel>
            <Select
              label="Type"
              labelId="TypeLabelId"
              {...register("type", {
                required: true,
              })}
              placeholder="Select Type"
              error={!!errors.type}
            >
              {Object.values(dbType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Password"
            {...register("password", {
              required: true,
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,

                message:
                  "Password must contain : Minimum eight characters, at least one letter, one number and one special character:",
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
          <Button type="submit">Add</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddDbModal;
