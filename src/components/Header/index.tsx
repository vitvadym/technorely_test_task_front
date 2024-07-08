import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Link, useSearchParams } from "react-router-dom";
import {
  logout,
  selectIsAdmin,
  selectIsAuth,
  selectUser,
} from "../../app/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hoolks";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Toast } from "../../constants";
import { FormEvent, ChangeEvent, useState } from "react";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // const searchTerm = searchParams.get("search") || "";

  const handleChangeSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSearchParams({
      ...searchParams,
      search: searchTerm,
    });
    setSearchTerm("");
  };

  console.log(searchTerm);

  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuth);
  const isAdmin = useAppSelector(selectIsAdmin);
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    toast.success(Toast.SUCCESS_LOGOUT);
    navigate("/");
  };
  return (
    <nav className="w-full shadow-md">
      <div className="page-container navbar bg-base-100">
        <div className="flex-1">
          <Link
            to={"/"}
            className="btn btn-ghost text-xl"
          >
            Logo
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleChangeSearchTerm}
              className="input input-bordered w-24 md:w-auto"
            />
          </form>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
            >
              <div className="w-10 rounded-full">
                <UserCircleIcon />
              </div>
            </div>
            {isAuthenticated && (
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <li>
                  <Link to={`profile/${user?.id}`}>Profile</Link>
                </li>

                {isAdmin && isAuthenticated && (
                  <li>
                    <Link to={"dashboard"}>Dashboard</Link>
                  </li>
                )}

                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
