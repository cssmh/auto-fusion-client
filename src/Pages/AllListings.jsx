import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import carLottie from "../assets/carLottie.json";
import useScrollToTop from "../Hooks/useScrollToTop";
import useFilteredListings from "../Hooks/useFilteredListings";
import LoadingAnimation from "../Shared/LoadingAnimation";
import SingleListing from "../Shared/SingleListing";

const allCarBrands = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Bugatti",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Citroën",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "Genesis",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lotus",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Pagani",
  "Peugeot",
  "Porsche",
  "Ram",
  "Rolls-Royce",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

const AllListings = () => {
  // hooks and custom hooks
  const scrollToTop = useScrollToTop();
  const [currentPage, setCurrentPage] = useState(1);
  const [carCondition, setCarCondition] = useState(
    sessionStorage.getItem("carCondition") || "all"
  );
  const [carBrand, setCarBrand] = useState(
    sessionStorage.getItem("carBrand") || "all"
  );
  const [carPrice, setCarPrice] = useState(
    sessionStorage.getItem("carPrice") || "all"
  );
  const {
    filteredListingPending,
    filteredListing,
    filteredListingRefetch,
    pages,
  } = useFilteredListings(currentPage, carCondition, carBrand, carPrice);

  useEffect(() => {
    scrollToTop();
    sessionStorage.clear();
  }, [scrollToTop]);

  // conditional loading
  if (filteredListingPending) return <LoadingAnimation />;

  // set total pages
  const totalPages = [...Array(pages).keys()];

  return (
    <div className="container mx-auto flex flex-col justify-center items-center gap-5 p-5">
      <h2
        className="text-center text-2xl md:text-3xl font-bold text-main capitalize"
        data-aos="fade-down"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-bottom"
      >
        All Listings
      </h2>
      {/* filtering options */}
      <div className="w-full flex flex-col md:flex-row justify-end items-start gap-2 md:gap-4 md:mt-4">
        {/* Car condition */}
        <div className="flex flex-col items-start gap-2 w-full md:w-auto">
          <label htmlFor="carCondition" className="text-lightBlack font-medium">
            Car condition
          </label>
          <select
            id="carCondition"
            onChange={(e) => {
              const selectedValue = e.target.value;
              setCarCondition(selectedValue);
            }}
            defaultValue={carCondition}
            className="w-full md:w-auto text-lightBlack border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option disabled value="">
              Choose car condition
            </option>
            <option value="all">All</option>
            <option value="super fresh">Super Fresh</option>
            <option value="fresh">Fresh</option>
            <option value="moderate">Moderate</option>
          </select>
        </div>

        {/* Car brand */}
        <div className="flex flex-col items-start gap-2 w-full md:w-auto">
          <label htmlFor="carBrand" className="text-lightBlack font-medium">
            Car brand
          </label>
          <select
            id="carBrand"
            name="carBrand"
            defaultValue={carBrand}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setCarBrand(selectedValue);
            }}
            className="w-full md:w-auto text-lightBlack border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option disabled value="">
              Choose car brand
            </option>
            <option value="all">All</option>
            {allCarBrands.map((carBrand, index) => (
              <option key={index} value={carBrand} className="capitalize">
                {carBrand}
              </option>
            ))}
          </select>
        </div>

        {/* Price range */}
        <div className="flex flex-col items-start gap-2 w-full md:w-auto">
          <label htmlFor="carPrice" className="text-lightBlack font-medium">
            Price range
          </label>
          <select
            id="carPrice"
            defaultValue={carPrice}
            name="carPrice"
            onChange={(e) => {
              const selectedValue = e.target.value;
              setCarPrice(selectedValue);
            }}
            className="w-full md:w-auto text-lightBlack border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option disabled value="">
              Select price range
            </option>
            <option value="all">All</option>
            <option value="1000-1999">$1000 - $1999</option>
            <option value="2000-3999">$2000 - $3999</option>
            <option value="4000-5999">$4000 - $5999</option>
            <option value="6000-7999">$6000 - $7999</option>
            <option value="8000+">$8000 - above</option>
          </select>
        </div>
      </div>
      {filteredListing.length > 0 && !filteredListingPending ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
          {filteredListing.map((singleList, index) => (
            <SingleListing
              key={index}
              singleList={singleList}
              listingsRefetch={filteredListingRefetch}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-1/2">
            <Lottie animationData={carLottie} />
          </div>
          <h3 className="text-4xl font-bold text-lightBlack text-center">
            Oops! No data found!
          </h3>
        </div>
      )}
      <div className="flex justify-center items-center gap-3 mt-10">
        {totalPages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page + 1)}
            className={`border-[1px] border-sub w-[35px] h-[35px] hover:bg-sub hover:text-white duration-300 font-medium ${
              currentPage === page + 1
                ? "bg-sub text-white"
                : "bg-white text-sub"
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllListings;
