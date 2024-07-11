import { useNavigate, useParams } from "react-router-dom";
import useGetSpecificDbConnection from "../api/getSpecificDbConnection";
import Loader from "../components/Loader";
import {
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { useState } from "react";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetSpecificDbConnection(id as string);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Paper
      style={{
        maxWidth: 1000,
        margin: "auto",
        padding: 21,
        marginTop: 21,
      }}
      elevation={3}
    >
      <Loader isLoading={isLoading} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography mb={3} variant="h5" gutterBottom>
          Database Details
        </Typography>
        <IconButton onClick={() => navigate(`/`)} style={{ cursor: "pointer" }}>
          <ExitToAppRoundedIcon />
        </IconButton>
      </div>

      <Typography mb={2} variant="subtitle1">
        <span style={{ fontWeight: 900 }}>Name:</span> {data?.name}
      </Typography>
      <Typography mb={2} variant="subtitle1">
        <span style={{ fontWeight: 900 }}>Type:</span> {data?.type}
      </Typography>
      <Typography mb={2} variant="subtitle1">
        <span style={{ fontWeight: 900 }}>Username:</span>
        {data?.username}
      </Typography>
      <Typography mb={2} variant="subtitle1">
        <span style={{ fontWeight: 900 }}>Password:</span>{" "}
        <TextField
          value={data?.password}
          type={showPassword ? "text" : "password"}
          sx={{ height: 25, border: "none", "& fieldset": { border: "none" } }}
          InputProps={{
            style: { height: 25, border: "none" },
            disableUnderline: true,

            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? (
                    <VisibilityOffRoundedIcon />
                  ) : (
                    <VisibilityRoundedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Typography>
      <Typography mb={2} variant="subtitle1">
        <span style={{ fontWeight: 900 }}>Url:</span> {data?.url}
      </Typography>
    </Paper>
  );
};

export default Details;
