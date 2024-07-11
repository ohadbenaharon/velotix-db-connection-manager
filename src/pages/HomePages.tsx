import React, { useState } from "react";
import AddDbModal from "../components/AddDbModal";
import DbTable from "../components/DbTable";
import PlusIconButton from "../components/PlusIconButton";

const HomePages: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div style={{ padding: 12 }}>
      <h1>Db Table </h1>

      <AddDbModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PlusIconButton onClick={() => setIsModalOpen(!isModalOpen)} />
      <DbTable />
    </div>
  );
};

export default HomePages;
