import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col items-center">
          <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
            Page not found
          </h1>

          <p className="mb-12 max-w-screen-md text-center text-gray-500 md:text-lg">
            The page you’re looking for doesn’t exist.
          </p>

          <Link to={"/"} className="btn btn-ghost text-xl duration-300">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
