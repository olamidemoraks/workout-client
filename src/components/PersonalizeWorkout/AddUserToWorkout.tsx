import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { Avatar, Box } from "@mui/material";
import { BadgeCheck, Loader2, Search, X } from "lucide-react";
import {
  BiCheckCircle,
  BiSearch,
  BiSolidCheckCircle,
  BiUserPlus,
} from "react-icons/bi";
import useProfile from "@/hooks/useProfile";
import Image from "next/image";
import { useMutation, useQuery } from "react-query";
import { getFollowing } from "@/api/user";
import {
  customWorkoutInvite,
  getInvitedUserFromCustomWorkout,
} from "@/api/custom.workout";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type AddUserToWorkoutProps = {
  id: string;
  open: boolean;
  setClose: () => void;
};

const AddUserToWorkout: React.FC<AddUserToWorkoutProps> = ({
  id,
  open,
  setClose,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const { socket } = useSelector((state: any) => state.socket);
  const { data, isLoading } = useQuery({
    queryFn: async () => await getFollowing({ params: null }),
    queryKey: "friend",
    enabled: open,
  });
  const { data: userInvitedData, isLoading: loadingInvitedUser } = useQuery({
    queryFn: async () => await getInvitedUserFromCustomWorkout({ id }),
    queryKey: "invitedfriend",
    enabled: open,
    refetchOnWindowFocus: false,
  });
  const { mutateAsync, isLoading: SavingUpdate } = useMutation({
    mutationFn: customWorkoutInvite,
    onSuccess: () => {
      toast.success("User have been sent invite");
      socket.current.emit("send-notification", [...selectedUsers]);
      setSelectedUsers([]);
      setClose();
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const users = data?.followings as IUser[];
  const invitedUsersId = userInvitedData?.users as string[];

  // populate selectedUser with previous invite
  // useEffect(() => {
  //   if (userInvitedData) {
  //     setSelectedUsers((prev) => [...userInvitedData?.users, ...prev]);
  //   }
  // }, [userInvitedData]);

  const handleSelectUser = (id: string) => {
    if (invitedUsersId?.includes(id)) return;
    const userId = selectedUsers?.find((user) => user === id);
    let currentSelectedUser = selectedUsers;
    if (userId) {
      currentSelectedUser = currentSelectedUser?.filter((id) => id !== userId);
      setSelectedUsers(currentSelectedUser);
    } else {
      setSelectedUsers((prev) => [...prev, id]);
    }
  };

  const addUserToWorkout = () => {
    const data = {
      invitedUser: selectedUsers,
    };
    mutateAsync({ data, id });
  };
  return (
    <Modal setClose={setClose} open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="relative overflow-hidden bg-zinc-900 lg:w-[600px] sm:w-[80%] w-[99%] rounded-md  h-[80vh] flex sm:p-4 p-2 sm:py-6 py-3 gap-3 flex-col"
      >
        {/* <div className="flex items-center bg-zinc-800 rounded-md w-full p-2 gap-3">
          <BiSearch className="opacity-80" size={21} />
          <input
            placeholder="Search"
            type="text"
            className=" bg-transparent outline-none flex-1 w-full"
          />
          <BiUserPlus size={25} className="opacity-80" />
        </div> */}
        <div className="flex items-center justify-between">
          <p className=" flex-1 text-center text-zinc-300 text-lg">
            Send Friends Invite
          </p>

          <X size={22} className=" cursor-pointer" onClick={setClose} />
        </div>
        <p className="text-zinc-300 leading-4">Members</p>

        {(isLoading || loadingInvitedUser) && (
          <div className="h-full w-full flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}

        <div className=" border-b border-zinc-700 flex gap-2 scrollbar-thin scrollbar-track-zinc-800  scrollbar-thumb-blue-600/75  overflow-y-auto  w-full my-2 pb-2 ">
          {/* already members */}

          {users
            ?.filter((u) => invitedUsersId?.includes(u._id))
            ?.map((user, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 items-center text-center"
              >
                <div
                  className="md:h-[40px] md:w-[40px] h-[35px] w-[35px] relative cursor-pointer"
                  onClick={() => handleSelectUser(user?._id)}
                >
                  {user?.avatar?.url ? (
                    <Image
                      src={user?.avatar?.url}
                      alt={user?.name}
                      fill
                      className="absolute rounded-full object-cover"
                    />
                  ) : (
                    <Avatar sx={{ height: "100%", width: "100%" }} />
                  )}

                  {selectedUsers?.includes(user?._id) ||
                  invitedUsersId?.includes(user?._id) ? (
                    <BiSolidCheckCircle
                      className=" absolute -bottom-1 -right-2 fill-blue-700 "
                      size={17}
                    />
                  ) : null}
                  {invitedUsersId?.includes(user?._id) ? (
                    <BadgeCheck
                      className=" absolute -bottom-1 -right-2 fill-blue-700 "
                      size={17}
                    />
                  ) : null}
                </div>

                <p className="text-xs max-w-[70px] truncate">{user?.name}</p>
              </div>
            ))}
        </div>
        <div className=" flex flex-wrap gap-x-7 gap-y-5  scrollbar-thin scrollbar-track-zinc-800  scrollbar-thumb-blue-600/75  overflow-y-auto  w-full my-3 pb-7 ">
          {/* not members */}
          {users
            ?.filter((u) => !invitedUsersId?.includes(u._id))
            ?.map((user, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 items-center text-center"
              >
                <div
                  className="md:h-[70px] md:w-[70px] h-[50px] w-[50px] relative cursor-pointer"
                  onClick={() => handleSelectUser(user?._id)}
                >
                  {user?.avatar?.url ? (
                    <Image
                      src={user?.avatar?.url}
                      alt={user?.name}
                      fill
                      className="absolute rounded-full object-cover"
                    />
                  ) : (
                    <Avatar sx={{ height: "100%", width: "100%" }} />
                  )}

                  {selectedUsers?.includes(user?._id) ? (
                    <BiSolidCheckCircle
                      className=" absolute bottom-1 -right-2 fill-blue-700 "
                      size={25}
                    />
                  ) : null}
                </div>

                <p className="w-[70px]">{user?.name}</p>
              </div>
            ))}
        </div>

        <br />
        <div
          className={`w-full absolute -bottom-0 left-0  ${
            selectedUsers.length > 0 ? "translate-y-0" : "translate-y-[100%]"
          } ease-linear duration-200 delay-100`}
        >
          <div
            className="w-full p-3 bg-zinc-800/75 h-[70px]"
            onClick={addUserToWorkout}
          >
            <button
              disabled={SavingUpdate === true ? true : false}
              className="disabled:opacity-50 flex gap-2 items-center justify-center w-full text-center bg-blue-600 rounded-md p-2"
            >
              Invite friends{" "}
              {SavingUpdate ? (
                <Loader2 className=" animate-spin" />
              ) : (
                <BiUserPlus />
              )}
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
export default AddUserToWorkout;
