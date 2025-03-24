import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";

const UserActivity = () => {
  return (
    <div
      className="container mx-auto p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 font-heading mt-24"
      data-aos="fade-down"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-bottom"
    >
      {/* Buy a Car Section */}
      <div className="bg-[#eef7ff] shadow-md p-8 md:p-12 rounded-xl flex flex-col gap-6">
        <h3 className="text-main text-3xl md:text-4xl font-bold">
          Looking for a car?
        </h3>
        <p className="text-gray-700 text-base md:text-lg">
          Discover unique stories on wheels! Explore and buy vintage cars from
          our community, where every car has a story to tell.
        </p>
        <Link
          to="/allListings"
          className="bg-sub px-6 py-3 text-white font-medium text-lg rounded-lg hover:bg-black transition-all duration-300 flex items-center gap-2 w-max"
        >
          Buy A Car <MdArrowOutward />
        </Link>
      </div>

      {/* Sell a Car Section */}
      <div className="bg-[#f4f4f4] shadow-md p-8 md:p-12 rounded-xl flex flex-col gap-6">
        <h3 className="text-main text-3xl md:text-4xl font-bold">
          Want to sell a car?
        </h3>
        <p className="text-gray-700 text-base md:text-lg">
          Turn memories into cash! Sell your old car effortlessly on our
          platform – where simplicity meets value.
        </p>
        <Link
          to="/dashboard/sellCar"
          className="bg-black px-6 py-3 text-white font-medium text-lg rounded-lg hover:bg-sub transition-all duration-300 flex items-center gap-2 w-max"
        >
          Sell Your Car <MdArrowOutward />
        </Link>
      </div>
    </div>
  );
};

export default UserActivity;
