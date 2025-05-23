import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useCurrentUser from "../../Hooks/useCurrentUser";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingAnimation from "../../Shared/LoadingAnimation";

const imgHostingKey = import.meta.env.VITE_imgBbKey;
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;

const UpdateListing = () => {
  const { id } = useParams();
  const { dbCurrentUserPending, dbCurrentUser } = useCurrentUser();
  const [selectedImageName, setSelectedImageName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [newSelectedPhoto, setNewSelectedPhoto] = useState(null);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const todayDate = new Date().toISOString().split("T")[0];

  let allCarBrands = [
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

  // car types
  let allCarTypes = [
    "Sedans and Coupes",
    "SUVs and Crossovers",
    "Sports Cars",
    "Trucks and Pickups",
    "Luxury Cars",
    "Electric and Hybrid Cars",
  ];

  // fuel types
  let allFuelTypes = [
    "Gasoline",
    "Diesel",
    "Electric",
    "Hybrid",
    "Petrol",
    "CNG",
    "LPG",
    "Octane",
    "Other fuel type",
  ];

  // transmission types
  let allTransmissionTypes = [
    "Automatic",
    "Manual",
    "Semi-Automatic",
    "Continuously Variable Transmission (CVT)",
    "Dual-Clutch Transmission (DCT)",
  ];

  // image input and get the file name
  const handleImageInput = (e) => {
    e.preventDefault();
    const fileInput = e.target;
    if (fileInput.files.length > 0) {
      const file = { image: fileInput.files[0] };
      const fileName = fileInput.files[0].name;
      setSelectedImageName(fileName);
      setSelectedImage(file);
    } else {
      setSelectedImageName("");
    }
  };

  // data fetching
  const { isPending, data: singleListing } = useQuery({
    queryKey: ["single-listing", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/singleListing/${id}`);
      return res.data;
    },
  });

  // conditional loading
  if (dbCurrentUserPending || isPending) return <LoadingAnimation />;

  // get the product details
  const {
    _id,
    carBrand,
    carCondition,
    carName,
    carType,
    description,
    engineCapacity,
    fuelType,
    manufactureYear,
    photo: initialPhoto,
    price,
    purchasingDate,
    registeredYear,
    sellerPhone,
    totalRun,
    transmissionType,
  } = singleListing;

  // send the updated data to database
  const handleUpdateListing = (e) => {
    e.preventDefault();
    const form = e.target;

    if (selectedImage) {
      axiosPublic
        .post(imgUploadUrl, selectedImage, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          const uploadedPhoto = res.data.data.display_url;
          setNewSelectedPhoto(uploadedPhoto);
        })
        .catch((err) => {
          toast.error(err.code);
          setNewSelectedPhoto(initialPhoto);
        });
    } else {
      setNewSelectedPhoto(initialPhoto);
    }

    const carName = form.carName.value;
    const carBrand = form.carBrand.value;
    const carType = form.carType.value;
    const priceInString = form.price.value;
    const carCondition = form.carCondition.value;
    const purchasingDate = form.purchasingDate.value;
    const manufactureYearInString = form.manufactureYear.value;
    const engineCapacityInString = form.engineCapacity.value;
    const totalRunInString = form.totalRun.value;
    const fuelType = form.fuelType.value;
    const transmissionType = form.transmissionType.value;
    const registeredYearInString = form.registeredYear.value;
    const description = form.description.value;
    const photo = newSelectedPhoto;
    const addingDate = todayDate;
    const price = parseInt(priceInString);
    const sellerPhone = form.sellerPhone.value;
    const approvalStatus = "pending";
    const registeredYear = parseInt(registeredYearInString);
    const manufactureYear = parseInt(manufactureYearInString);
    const engineCapacity = parseInt(engineCapacityInString);
    const totalRun = parseInt(totalRunInString);

    //getting the form info into an object
    const updatedInfo = {
      carName,
      carBrand,
      carType,
      price,
      carCondition,
      purchasingDate,
      description,
      photo,
      approvalStatus,
      addingDate,
      manufactureYear,
      engineCapacity,
      totalRun,
      fuelType,
      transmissionType,
      registeredYear,
      sellerPhone,
    };

    // Send the data to the server and databse
    axiosSecure
      .put(`/updateListing/${_id}`, updatedInfo)
      .then((res) => {
        const data = res.data;
        if (data.modifiedCount) {
          toast.success("Listing updated successfully!");
        }
      })

      .catch((err) => {
        toast.error(err.code);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h2
        className="text-center text-4xl md:text-5xl font-bold text-main capitalize pt-[50px]"
        data-aos="slide-right"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-bottom"
      >
        Update Your Listing
      </h2>
      <form
        onSubmit={handleUpdateListing}
        className="flex flex-col justify-center items-center gap-10 mt-[70px] md:mt-[80px] text-[18px] font-medium w-full lg:w-[90%]"
      >
        {/* car name, car brand, car type */}
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8">
          {/* car model */}
          <div className="font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3">
            <label>
              Car model <span className="text-[red]">*</span>
            </label>
            <input
              required
              type="text"
              id="carName"
              name="carName"
              defaultValue={carName}
              className="w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain"
            />
          </div>

          {/* brand name */}
          <div className="font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3">
            <label>
              Choose car brand <span className="text-[red]">*</span>
            </label>
            <select
              required
              id="carBrand"
              defaultValue={carBrand}
              name="carBrand"
              className="w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain"
            >
              {allCarBrands.map((carBrand, index) => (
                <option key={index} value={carBrand} className="capitalize">
                  {carBrand}
                </option>
              ))}
            </select>
          </div>

          {/* car type */}
          <div className="font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3">
            <label>
              Choose car type <span className="text-[red]">*</span>
            </label>
            <select
              required
              id="carType"
              name="carType"
              defaultValue={carType}
              className="w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain"
            >
              {allCarTypes.map((carType, index) => (
                <option key={index} value={carType} className="capitalize">
                  {carType}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* car price, car condition, car purchasing date */}
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8">
          {/* car price */}
          <div className="font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3">
            <label>
              Car price ($) <span className="text-[red]">*</span>
            </label>
            <input
              required
              type="number"
              id="price"
              name="price"
              min="1000"
              step="1"
              defaultValue={price}
              className="w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain"
            />
          </div>

          {/* car condition */}
          <div className="font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3">
            <label>
              Car condition <span className="text-[red]">*</span>
            </label>
            <select
              required
              id="carCondition"
              defaultValue={carCondition}
              name="carCondition"
              className="w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain"
            >
              <option disabled>Choose car condition</option>
              <option value="super fresh">Super Fresh</option>
              <option value="fresh">Fresh</option>
              <option value="moderate">Moderate</option>
            </select>
          </div>

          {/* car purchasing date */}
          <div className="font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3">
            <label>
              Purchased on <span className="text-[red]">*</span>
            </label>
            <input
              required
              type="date"
              max={todayDate}
              id="purchasingDate"
              name="purchasingDate"
              defaultValue={purchasingDate}
              className="w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain"
            />
          </div>
        </div>

        {/* Year of manufacture, Engine capacity, total kilometers run */}
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8">
          {/* Year of manufacture */}
          <div className="font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3">
            <label>
              Manufacture year <span className="text-[red]">*</span>
            </label>
            <input
              required
              type="number"
              id="manufactureYear"
              name="manufactureYear"
              min="1925"
              step="1"
              defaultValue={manufactureYear}
              className="w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain"
            />
          </div>

          {/* Engine capacity */}
          <div className="font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3">
            <label>
              Engine capacity <span className="text-[red]">*</span>
            </label>
            <input
              required
              type="number"
              id="engineCapacity"
              name="engineCapacity"
              min="100"
              step="1"
              defaultValue={engineCapacity}
              className="w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain"
            />
          </div>

          {/* total kilometers run  */}
          <div className="font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3">
            <label>
              Total run (km) <span className="text-[red]">*</span>
            </label>
            <input
              required
              type="number"
              id="totalRun"
              name="totalRun"
              min="1"
              step="1"
              defaultValue={totalRun}
              className="w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain"
            />
          </div>
        </div>

        {/* fuel type, transmission type, registered year */}
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8">
          {/* Fuel type */}
          <div className="font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3">
            <label>
              Choose fuel type <span className="text-[red]">*</span>
            </label>
            <select
              required
              id="fuelType"
              name="fuelType"
              defaultValue={fuelType}
              className="w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain"
            >
              {allFuelTypes.map((fuelType, index) => (
                <option key={index} value={fuelType} className="capitalize">
                  {fuelType}
                </option>
              ))}
            </select>
          </div>

          {/* transmission type */}
          <div className="font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3">
            <label>
              Choose trnasmission type <span className="text-[red]">*</span>
            </label>
            <select
              required
              id="transmissionType"
              name="transmissionType"
              defaultValue={transmissionType}
              className="w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain"
            >
              {allTransmissionTypes.map((transMissionType, index) => (
                <option
                  key={index}
                  value={transMissionType}
                  className="capitalize"
                >
                  {transMissionType}
                </option>
              ))}
            </select>
          </div>

          {/* registered year  */}
          <div className="font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3">
            <label>
              Registered year <span className="text-[#7a7a7a]">(opt)</span>
            </label>
            <input
              type="number"
              id="registeredYear"
              name="registeredYear"
              min="1980"
              step="1"
              defaultValue={registeredYear}
              className="w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain"
            />
          </div>
        </div>

        {/* car description */}
        <div className="w-full flex justify-center items-center gap-8">
          <div className="font-body flex flex-col justify-start items-start gap-3 w-full">
            <label>
              Car description <span className="text-[red]">*</span>
            </label>
            <textarea
              required
              id="description"
              name="description"
              defaultValue={description}
              className="w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain"
            />
          </div>
        </div>

        {/* email, phone number */}
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8">
          {/* email */}
          <div className="font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/2">
            <label>Your email</label>
            <input
              readOnly
              type="email"
              id="sellerEmail"
              name="sellerEmail"
              value={dbCurrentUser?.email}
              className="w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none"
            />
          </div>

          {/* phone number */}
          <div className="font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/2">
            <label>
              Enter phone number <span className="text-[red]">*</span>
            </label>
            <input
              required
              type="tel"
              id="sellerPhone"
              name="sellerPhone"
              defaultValue={sellerPhone}
              className="w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain"
            />
          </div>
        </div>

        {/* car image select */}
        <div className="w-full flex justify-center items-center gap-8">
          <div className="font-body flex flex-col justify-start items-start gap-3 w-full">
            {/* image file input */}
            <label
              htmlFor="image"
              className="cursor-pointer relative focus:outline-none border-[1px] py-2 px-4 border-gray text-lightBlack focus:border-lightMain transition-all duration-500 w-full flex justify-center items-center gap-2"
            >
              <FaUpload />{" "}
              {selectedImageName.length > 25
                ? selectedImageName.slice(0, 25) + "..."
                : selectedImageName || "Choose product image"}
              <input
                type="file"
                name="image"
                id="image"
                required
                accept="image/*"
                onChange={handleImageInput}
                className="cursor-pointer opacity-0 absolute top-0 left-0 w-full"
              />
            </label>
          </div>
        </div>

        {/* submit button */}
        <input
          type="submit"
          value="Update Listing"
          className="w-full lg:w-2/3 px-5 py-3 bg-sub mt-5 rounded-md text-white hover:bg-main duration-300  font-semibold text-xl  cursor-pointer"
        />
      </form>
    </div>
  );
};

export default UpdateListing;
