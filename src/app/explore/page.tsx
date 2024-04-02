import Users from "@/components/Explore/Users";
import Layout from "@/components/Layout/Layout";
import React from "react";

const Page = () => {
  return (
    <Layout>
      <div className=" mx-auto lg:w-[60%] md:w-[70%] w-[98%]">
        <Users />
      </div>
    </Layout>
  );
};

export default Page;
