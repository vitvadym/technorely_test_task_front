import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";

const GoBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div
      className="mb-4 inline-flex cursor-pointer items-center gap-1 font-normal text-neutral duration-200 "
      onClick={handleGoBack}
    >
      <ChevronLeftIcon width={18} />
      Back
    </div>
  );
};

export default GoBack;
