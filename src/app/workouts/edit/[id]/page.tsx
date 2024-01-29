"use client";

import Layout from "@/components/Layout/Layout";
import PersonalizeWorkoutForm from "@/components/PersonalizeWorkout/PersonalizeWorkoutForm";
import React from "react";

type PageProps = {
  params: {
    id: string;
  };
};

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <Layout>
      <PersonalizeWorkoutForm id={params.id} />
    </Layout>
  );
};
export default Page;
