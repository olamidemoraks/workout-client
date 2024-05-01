import Users from "@/components/Explore/Users";
import Layout from "@/components/Layout/Layout";
import React from "react";

const Page = () => {
  return (
    <Layout>
      <div className=" mx-auto px-4 h-full w-full justify-center flex mt-4">
        <div className="md:w-[700px] w-full h-full  p-2 min-h-[70vh] rounded ">
          <Users />
        </div>
      </div>
    </Layout>
  );
};

export default Page;
