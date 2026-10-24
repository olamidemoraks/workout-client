import Layout from "@/components/Layout/Layout";
import ProgramForm from "@/components/Program/ProgramForm";
import React from "react";

type PageProps = {
  params: { id: string };
};

const Page: React.FC<PageProps> = ({ params: { id } }) => {
  return (
    <Layout>
      <ProgramForm id={id} />
    </Layout>
  );
};

export default Page;
