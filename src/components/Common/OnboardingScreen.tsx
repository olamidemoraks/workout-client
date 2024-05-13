import { Modal } from "@mui/material";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import { Loader } from "lucide-react";
import useQuotes from "@/hooks/useQuotes";
import Image from "next/image";

const OnboardingScreen = ({ isLoading }: { isLoading: boolean }) => {
  const { selectedQuote } = useQuotes();
  return (
    <Modal open={isLoading} onClose={() => {}}>
      <div className="h-full  w-full backdrop-blur-sm flex items-center justify-center">
        <div className="sm:max-w-[500px] w-full flex flex-col items-center p-2">
          <Image
            src={"/assets/logo3.svg"}
            alt="logo"
            height={90}
            width={100}
            className="-translate-x-2"
          />
          <div className="flex w-full">
            <ImQuotesLeft size={33} />
          </div>

          <div className=" p-2 justify-center flex w-full text-center flex-col">
            <p className="font-semibold font-serif md:text-4xl sm:text-3xl text-2xl">
              {selectedQuote?.quote}
            </p>
            <p id="bar" className="mt-2 text-lg font-semibold">
              <span className="text-zinc-300 italic">by</span>{" "}
              {selectedQuote?.author}
            </p>
          </div>

          <div className="flex justify-end w-full -translate-y-5">
            <ImQuotesRight size={33} />
          </div>

          {/* <div className="relative bg-zinc-600/70 w-[90%] h-2 rounded-lg mt-10">
            <div
              ref={progressbar}
              className=" bg-emerald-400 w-[40%]  h-2 rounded-lg absolute"
            />
          </div> */}
          <Loader className=" animate-spin" size={25} />
        </div>
      </div>
    </Modal>
  );
};

export default OnboardingScreen;
