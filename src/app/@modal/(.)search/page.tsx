"use client";
import Users from "@/components/Explore/Users";
import Layout from "@/components/Layout/Layout";
import Modal from "@/components/Modal/Modal";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  function handleCloseModal() {
    router.back();
  }
  return (
    <Modal open={true} setClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          p: 4,
        }}
        className=" bg-zinc-900 rounded-md w-full sm:w-[600px]   flex items-center justify-center p-4 py-6 gap-3 flex-col"
      >
        <div className="h-full w-full bg-zinc-900 p-2 min-h-[70vh] rounded ">
          <Users />
        </div>
      </Box>
    </Modal>
  );
};

export default Page;
