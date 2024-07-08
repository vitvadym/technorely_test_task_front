import ItemsPerPage from "../../../components/ItemsPerPage";
import UserListItem from "../../Components/UserListItem";
import { useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hoolks";
import usePage from "../../../helpers/usePage";

import {
  getAllUsers,
  selectIsLoading,
  selectAllUsers,
} from "../../../app/features/user/userSlice";
import Paginate from "../../../components/Paginate";
import ErrorMessage from "../../../components/ErrorMessage";

const Users = () => {
  const { handleChangePage, page } = usePage();

  const allUsers = useAppSelector(selectAllUsers);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const limit = searchParams.get("limit") || 6;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, page, limit, searchParams]);

  console.log("users render");

  return (
    <>
      {!allUsers?.users.length && !isLoading ? (
        <ErrorMessage>No users found. Please add some users.</ErrorMessage>
      ) : (
        <div className="overflow-x-auto">
          <div className="mb-3 flex items-center gap-6">
            <ItemsPerPage name="limit" />
            <div className="join mt-4">
              <Paginate
                total={allUsers?.count || 0}
                currentPage={page}
                perPage={+limit}
                onChangePage={handleChangePage}
              />
            </div>
          </div>

          <table className="table table-sm">
            <thead className="bg-slate-200">
              <tr className="">
                <th>id</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Nickname</th>
                <th>Description</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Register date</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {allUsers?.users.map((user) => (
                <UserListItem
                  key={user.id}
                  user={user}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Users;
