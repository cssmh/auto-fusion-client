import Lottie from "lottie-react";
import lottie from "../assets/loading.json";

const LoadingAnimation = () => {
  return (
    <div className="h-[81vh] w-full flex justify-center items-center">
      <Lottie animationData={lottie} className="w-40" />
    </div>
  );
};

export default LoadingAnimation;
