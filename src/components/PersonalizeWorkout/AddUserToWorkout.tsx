import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { Box } from "@mui/material";
import { Search } from "lucide-react";
import {
  BiCheckCircle,
  BiSearch,
  BiSolidCheckCircle,
  BiUserPlus,
} from "react-icons/bi";
import useProfile from "@/hooks/useProfile";
import Image from "next/image";

type AddUserToWorkoutProps = {
  open: boolean;
  setClose: () => void;
};

const AddUserToWorkout: React.FC<AddUserToWorkoutProps> = ({
  open,
  setClose,
}) => {
  const users = [
    {
      _id: "1",
      name: "olamide moraks",
      imageUrl: "/assets/fullmale.jpg",
    },
    {
      _id: "2",
      name: "Ola",
      imageUrl: "/assets/fit.png",
    },
    {
      _id: "3",
      name: "David",
      imageUrl: "/assets/fullfemale.jpg",
    },
    {
      _id: "4",
      name: "Samuel",
      imageUrl: "/assets/female.png",
    },
    {
      _id: "5",
      name: "olamide moraks",
      imageUrl: "/assets/fullmale.jpg",
    },
    {
      _id: "6",
      name: "Ola",
      imageUrl: "/assets/fit.png",
    },
    {
      _id: "7",
      name: "David",
      imageUrl: "/assets/fullfemale.jpg",
    },
    {
      _id: "8",
      name: "Samuel",
      imageUrl: "/assets/female.png",
    },
    {
      _id: "5",
      name: "olamide moraks",
      imageUrl: "/assets/fullmale.jpg",
    },
    {
      _id: "6",
      name: "Ola",
      imageUrl: "/assets/fit.png",
    },
    {
      _id: "7",
      name: "David",
      imageUrl: "/assets/fullfemale.jpg",
    },
    {
      _id: "8",
      name: "Samuel",
      imageUrl: "/assets/female.png",
    },
    {
      _id: "5",
      name: "olamide moraks",
      imageUrl: "/assets/fullmale.jpg",
    },
    {
      _id: "6",
      name: "Ola",
      imageUrl: "/assets/fit.png",
    },
    {
      _id: "7",
      name: "David",
      imageUrl: "/assets/fullfemale.jpg",
    },
    {
      _id: "8",
      name: "Samuel",
      imageUrl: "/assets/female.png",
    },
    {
      _id: "5",
      name: "olamide moraks",
      imageUrl: "/assets/fullmale.jpg",
    },
    {
      _id: "6",
      name: "Ola",
      imageUrl: "/assets/fit.png",
    },
    {
      _id: "7",
      name: "David",
      imageUrl: "/assets/fullfemale.jpg",
    },
    {
      _id: "8",
      name: "Samuel",
      imageUrl: "/assets/female.png",
    },
  ];

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleSelectUser = (id: string) => {
    const userId = selectedUsers?.find((user) => user === id);
    console.log({ userId, id });
    let currentSelectedUser = selectedUsers;
    if (userId) {
      currentSelectedUser = currentSelectedUser?.filter((id) => id !== userId);
      setSelectedUsers(currentSelectedUser);
    } else {
      setSelectedUsers((prev) => [...prev, id]);
    }
  };

  return (
    <Modal setClose={setClose} open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 4,
        }}
        className=" overflow-hidden bg-zinc-900 lg:w-[600px] sm:w-[80%] w-[99%] rounded-md   min-h-[200px] flex p-4 py-6 gap-3 flex-col"
      >
        <div className="flex items-center bg-zinc-800 rounded-md w-full p-2 gap-3">
          <BiSearch className="opacity-80" size={21} />
          <input
            placeholder="Search"
            type="text"
            className=" bg-transparent outline-none flex-1 w-full"
          />
          <BiUserPlus size={25} className="opacity-80" />
        </div>

        <div className=" grid grid-cols-3 max-h-[400px] scrollbar-thin scrollbar-track-zinc-800  scrollbar-thumb-blue-600/75  overflow-y-auto  gap-y-5 w-full my-3 pb-7 ">
          {users?.map((user, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 items-center text-center"
            >
              <div
                className="md:h-[90px] md:w-[90px] h-[70px] w-[70px] relative cursor-pointer"
                onClick={() => handleSelectUser(user?._id)}
              >
                <Image
                  src={user?.imageUrl}
                  alt={user.name}
                  fill
                  className="absolute rounded-full object-cover"
                />
                {selectedUsers?.includes(user?._id) ? (
                  <BiSolidCheckCircle
                    className=" absolute bottom-1 -right-2 fill-blue-700 "
                    size={25}
                  />
                ) : null}
              </div>

              <p className="">{user?.name}</p>
            </div>
          ))}
        </div>

        <br />
        <div
          className={`w-full absolute -bottom-0 left-0  ${
            selectedUsers.length > 0 ? "translate-y-0" : "translate-y-[100%]"
          } ease-linear duration-200 delay-100`}
        >
          <div className="w-full p-3 bg-zinc-800/75 h-[70px]">
            <button className=" flex gap-2 items-center justify-center w-full text-center bg-blue-600 rounded-md p-2">
              Invite friends <BiUserPlus />
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
export default AddUserToWorkout;
