import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Testimonial = () => {
  const axiosPublic = useAxiosPublic();
  const [activeFeedback, setActiveFeedback] = useState(null);

  const { isPending: feedbackPending, data: allFeedbacks = [] } = useQuery({
    queryKey: ["all-feedback"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allFeedbacks");
      setActiveFeedback(res.data[0]?._id);
      return res.data;
    },
  });

  if (feedbackPending) {
    return <p className="text-center text-gray-600 text-lg">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center gap-6 container mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-semibold text-main text-center">
        Words of Praise
      </h2>
      <p className="text-center text-gray-700 max-w-2xl">
        Discover the success stories that speak louder than words! Hear
        firsthand from our delighted users about their experiences.
      </p>

      {/* Testimonial Box */}
      <div className="relative w-full md:w-3/4 bg-gray-900 text-white shadow-lg rounded-lg p-8 md:p-10 text-center">
        {allFeedbacks.map(
          (feedback) =>
            activeFeedback === feedback._id && (
              <div key={feedback._id} className="space-y-4">
                <Rating
                  style={{ maxWidth: 150 }}
                  value={parseInt(feedback.ratingByUser)}
                  readOnly
                />
                <p className="text-lg font-medium">{feedback.feedBack}</p>

                <p className="font-semibold text-xl text-sub">
                  - {feedback.feedbackProvider}
                </p>

                <FaQuoteLeft className="text-4xl text-gray-400 absolute top-[-20px] left-[-15px]" />
              </div>
            )
        )}
      </div>

      {/* User Avatar Selector */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {allFeedbacks.map((feedback) => (
          <button
            key={feedback._id}
            onClick={() => setActiveFeedback(feedback._id)}
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 transition-all ${
              activeFeedback === feedback._id
                ? "border-sub scale-110"
                : "border-transparent hover:border-gray-400"
            }`}
          >
            <img
              src={feedback.feedbackProviderPhoto}
              alt={feedback.feedbackProvider}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
