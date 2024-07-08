import { FC } from "react";
import { IUser } from "../../../types/user.type";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../../app/hoolks";
import { deleteUser, getAllUsers } from "../../../app/features/user/userSlice";
import { Link } from "react-router-dom";

type ListItemProps = {
  user: IUser;
};
const UserListItem: FC<ListItemProps> = ({ user }) => {
  const {
    firstName,
    lastName,
    createdAt,
    description,
    email,
    phoneNumber,
    position,
    nickName,
    isAdmin,
    id,
  } = user;

  console.log(user);

  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${nickName}`,
    );

    if (confirm) {
      await dispatch(deleteUser(id));
      await dispatch(getAllUsers());
    }
  };

  const formatedDate = new Date(createdAt).toUTCString();
  return (
    <tr className="rounded-md  shadow-sm duration-300 hover:bg-slate-200">
      <th>{id}</th>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{nickName}</td>
      <td>{description}</td>
      <td>{phoneNumber}</td>
      <td>{position}</td>
      <td>{formatedDate}</td>
      <td>{isAdmin ? "Admin" : "User"}</td>
      <td className="flex gap-1">
        <Link to={`/profile/edit/${id}`}>
          <button className="btn btn-neutral">
            <PencilIcon width={16} />
          </button>
        </Link>
        <button
          className="btn btn-neutral"
          onClick={handleDelete}
        >
          <TrashIcon width={16} />
        </button>
      </td>
    </tr>
  );
};

export default UserListItem;
