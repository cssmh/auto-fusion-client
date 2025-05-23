import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="container mx-auto p-5 flex flex-col justify-center items-center gap-0 h-[100vh] font-body">
      <h1 className="text-2xl lg:text-3xl font-bold text-center ">
        Oops! That page can’t be found.
      </h1>
      <h1 className="text-6xl font-bold  text-center text-main">
        4<span className="text-sub">0</span>4
      </h1>
      <Link to="/">
        <button className="bg-main px-3 py-1 text-xl font-semibold text-white rounded-md hover:bg-sub duration-300">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
