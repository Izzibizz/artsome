import Lottie from "lottie-react";
import loading from "../assets/dots-turning.json"

export const Loading = () => {
  return (
    <div className={`"laptop:w-1/2 tablet:w-1/3 laptop:w-1/4 mt-20 m-auto`}>
      <Lottie animationData={loading} loop={true} />
    </div>
  );
};
