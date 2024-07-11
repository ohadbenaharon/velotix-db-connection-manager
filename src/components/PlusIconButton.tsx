import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const PlusIconButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
      }}
    >
      <IconButton color="primary" onClick={onClick} size="large">
        <AddIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default PlusIconButton;
