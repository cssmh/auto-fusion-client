import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import bannerImg from "../../assets/banner.png";

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

const Banner = () => {
  const navigate = useNavigate();
  // handle home search
  const handleHomeSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    // get data from the form
    const carCondition = form.carCondition.value || "all";
    const carBrand = form.carBrand.value || "all";
    const carPrice = form.carPrice.value || "all";

    if ((carCondition, carBrand, carPrice)) {
      sessionStorage.setItem("carCondition", carCondition);
      sessionStorage.setItem("carBrand", carBrand);
      sessionStorage.setItem("carPrice", carPrice);
      navigate("/allListings");
    }
  };

  return (
    <div
      className="h-full bg-[#EEF1FB]"
      // data-aos="fade-up"
      // data-aos-mirror="true"
      // data-aos-once="false"
      // data-aos-anchor-placement="top-bottom"
    >
      <div className="container mx-auto px-5 pt-16 pb-36 md:pb-80 h-fit flex flex-col justify-start items-center font-body gap-4 relative">
        <p className="text-main text-base md:text-lg mt-[0px] md:mt-[50px]">
          The dream place for car buy and sell
        </p>
        <h1
          className="text-black text-3xl md:text-4xl lg:text-7xl font-bold text-center"
          // data-aos="zoom-in"
          // data-aos-mirror="true"
          // data-aos-once="false"
          // data-aos-anchor-placement="top-bottom"
        >
          Find Your Dream Car
        </h1>
        <form
          onSubmit={handleHomeSearch}
          className="w-full md:w-[98%] lg:w-[80%] flex flex-col md:flex-row justify-center md:justify-between items-center mt-3 md:mt-5 bg-white p-2 md:p-4 shadow-[0_0_70px_#cfcfcf] rounded-lg md:rounded-[80px] gap-4 md:gap-0 text-[16px] lg:text-[18px]"
        >
          <select
            id="carCondition"
            defaultValue={""}
            name="carCondition"
            className="px-4 py-3 md:py-2 border-[1px] md:border-none border-gray w-full md:w-fit flex justify-between items-center rounded-[3px] focus:outline-none"
          >
            <option disabled value="">
              Choose car condition
            </option>
            <option value="super fresh">Super Fresh</option>
            <option value="fresh">Fresh</option>
            <option value="moderate">Moderate</option>
          </select>
          <select
            id="carBrand"
            name="carBrand"
            defaultValue={""}
            className="px-4 py-3 md:py-2 border-[1px] md:border-none border-gray w-full md:w-fit rounded-[3px] focus:outline-none"
          >
            <option disabled value="">
              Choose car brand
            </option>
            {allCarBrands.map((carBrand, index) => (
              <option key={index} value={carBrand} className="capitalize">
                {carBrand}
              </option>
            ))}
          </select>
          <select
            id="carPrice"
            defaultValue={""}
            name="carPrice"
            className="px-4 py-3 md:py-2 border-[1px] md:border-none border-gray w-full md:w-fit rounded-[3px] focus:outline-none"
          >
            <option disabled value={""}>
              Select price range
            </option>
            <option value="1000-1999">$1000 - $1999</option>
            <option value="2000-3999">$2000 - $3999</option>
            <option value="4000-5999">$4000 - $5999</option>
            <option value="6000-7999">$6000 - $7999</option>
            <option value="8000+">$8000 - above</option>
          </select>
          <button
            type="submit"
            className="bg-sub text-white p-3 w-full md:w-fit md:p-4 lg:p-5 rounded-lg md:rounded-[100%] font-bold hover:bg-white hover:text-sub duration-500 flex justify-center items-center"
          >
            <FaSearch className="text-xl" />
          </button>
        </form>
        <img
          src={bannerImg}
          alt=""
          className="absolute bottom-[-30px] md:bottom-[-80px]"
        />
      </div>
    </div>
  );
};

export default Banner;
