import React from "react";
import EditProfile from "../../../components/Profile/EditProfile";
import Layout from "@/components/Layout/Layout";
type pageProps = {
  params: {
    id: string;
  };
};

const page: React.FC<pageProps> = ({ params }) => {
  return (
    <Layout>
      <EditProfile id={params.id} />;
    </Layout>
  );
};
export default page;
