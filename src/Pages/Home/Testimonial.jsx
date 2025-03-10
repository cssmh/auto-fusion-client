import AOS from "aos";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Testimonial = () => {
  const axiosPublic = useAxiosPublic();
  const [activeFeedback, setActiveFeedback] = useState(null);

  const { isPending: feedbackPending, data: allFeedbacks } = useQuery({
    queryKey: ["all-feedback"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allFeedbacks");
      setActiveFeedback(res.data[0]._id);
      return res.data;
    },
  });

  if (feedbackPending) {
    return (
      <p className="text-center text-lightBlack capitalize">loading....</p>
    );
  }

  AOS.init({
    offset: 120,
    duration: 1200,
    easing: "ease",
    delay: 50,
  });

  return (
    <div className="flex flex-col justify-center items-center gap-2 md:gap-4 container mx-auto p-5">
      <h2
        className="text-2xl md:text-4xl capitalize text-main font-semibold text-center"
        data-aos="slide-down"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-bottom"
      >
        Words of Praise
      </h2>
      <p className="text-center text-lightBlack w-full lg:w-[60%]">
        Discover the success stories that speak louder than words! Hear
        firsthand from our delighted users about their experiences.
      </p>
      {/* testimonial description */}
      <div className="w-full md:w-[80%] lg:w-[70%] px-[70px] md:h-[300px] py-20 flex flex-col justify-center items-center text-center bg-black shadow-[0_0_50px_#e6e6e6] rounded-[10px] mt-10 relative">
        {allFeedbacks.map((singleFeedback) => (
          <div key={singleFeedback?._id} className="text-center w-full">
            {activeFeedback === singleFeedback?._id && (
              <div className="w-full flex flex-col justify-center items-center gap-4">
                <Rating
                  style={{ maxWidth: 150 }}
                  value={parseInt(singleFeedback?.ratingByUser)}
                  readOnly
                />
                <p className="w-full text-white font-medium text-[18px]">
                  {singleFeedback?.feedBack}
                </p>
                {allFeedbacks.map((singleFeedback) => (
                  <div key={singleFeedback?._id}>
                    <button
                      onClick={() => setActiveFeedback(singleFeedback?._id)}
                    >
                      <img
                        src={singleFeedback?.feedbackProviderPhoto}
                        alt=""
                        className={`w-[32px] h-[32px] md:w-[60px] p-[2px] md:h-[60px] bg-cover border duration-500 rounded-full ${
                          activeFeedback === singleFeedback?._id
                            ? "border-sub"
                            : "border-[#ffffff00]"
                        }`}
                      />
                    </button>
                  </div>
                ))}
                <p className="absolute bottom-[40px] text-white font-semibold text-xl right-[80px]">
                  - {singleFeedback?.feedbackProvider}
                </p>
                <FaQuoteLeft
                  className="text-3xl lg:text-5xl absolute top-[-10px] md:top-[-20px] left-[-5px] md:left-[-20px] text-[#c2c2c27e]"
                  data-aos="slide-down"
                  data-aos-mirror="true"
                  data-aos-once="false"
                  data-aos-anchor-placement="top-bottom"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
