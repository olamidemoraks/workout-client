import Layout from "@/components/Layout/Layout";
import ProgramView from "@/components/Program/ProgramView";
import React from "react";

type PageProps = {
  params: { id: string };
};

const Page: React.FC<PageProps> = ({ params: { id } }) => {
  return (
    <Layout>
      <ProgramView id={id} />
    </Layout>
  );
};

export default Page;
