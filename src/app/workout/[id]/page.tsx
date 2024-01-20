import Layout from "@/components/Layout/Layout";
import PersonalWorkoutPreview from "@/components/PersonalizeWorkout/PersonalWorkoutPreview";
import React from "react";

type PageProps = {
  params: {
    id: string;
  };
};

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <Layout>
      <PersonalWorkoutPreview id={params.id} />
    </Layout>
  );
};
export default Page;
