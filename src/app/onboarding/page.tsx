import OnboardingScreen from "@/components/Common/OnboardingScreen";
import { Loader } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

const Onboarding = async () => {
  return (
    <div className="h-screen  w-screen">
      <OnboardingScreen />
    </div>
  );
};

export default Onboarding;
