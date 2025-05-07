import { Link } from "react-router";

const Header = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-100">
            Livefront Action News
          </span>
        </Link>

        <div
          className="items-center justify-between flex w-auto order-1"
          id="navbar-sticky"
        >
          <span className="mr-4">Howdy</span>
          <img
            src="https://i.pravatar.cc"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
};
export default Header;
