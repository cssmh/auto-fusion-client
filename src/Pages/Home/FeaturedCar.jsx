import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SingleListing from "../../Shared/SingleListing";

const FeaturedCar = () => {
  const axiosPublic = useAxiosPublic();
  const { isPending: listingPending, data: listings } = useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      const res = await axiosPublic.get("/homeListings");
      return res.data;
    },
  });

  if (listingPending) {
    return (
      <p className="text-center text-lightBlack capitalize">loading....</p>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 container mx-auto p-5">
      <h2
        className="text-2xl md:text-4xl capitalize text-main font-semibold text-center"
        data-aos="slide-down"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-bottom"
      >
        Latest Cars
      </h2>
      <p className="text-center text-lightBlack">
        A friendly collection for you. You can have a look and choose the best
        for you.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 w-full mt-10">
        {listings.map((singleList) => (
          <SingleListing
            key={singleList?._id}
            singleList={singleList}
          ></SingleListing>
        ))}
      </div>
      <Link to={"/allListings"}>
        <button className="group bg-main px-4 py-3 rounded-md text-white font-semibold hover:bg-sub duration-500 mt-7 flex justify-center items-center gap-2">
          <span>See More</span>
          <FaArrowRightLong className="hidden group-hover:flex duration-500" />
        </button>
      </Link>
    </div>
  );
};

export default FeaturedCar;
