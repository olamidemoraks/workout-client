import { quotes } from "@/utils/quates";
import React, { useMemo } from "react";

const useQuotes = () => {
  const selectedQuote = useMemo(() => {
    return quotes[Math.trunc(Math.random() * 20) + 1];
  }, []);

  return {
    selectedQuote,
  };
};

export default useQuotes;
