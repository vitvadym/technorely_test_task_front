import styles from "./Profile.module.scss";

import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hoolks";
import { selectUser } from "../../app/features/user/userSlice";
// import { useEffect } from "react";

const Profile = () => {
  const { id } = useParams();
  const user = useAppSelector(selectUser);

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       if (id) {
  //         const result = await dispatch(getUserById(id)).unwrap();
  //         console.log(result);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchUser();
  // }, [dispatch, id]);

  const {
    description,
    email,
    firstName,
    lastName,
    nickName,
    position,
    phoneNumber,
  } = user ?? {};
  return (
    <>
      {user?.id === Number(id) && (
        <div className={styles.profile}>
          <div className={styles.profile__header}>
            <h3 className={styles.profile__header_title}>Profile</h3>
          </div>
          <div className={styles.profile__body}>
            <dl className={styles.profile__body_list}>
              <div className={styles.profile__body_list_item}>
                <dt className={styles.profile__body_list_item_label}>
                  Fist Name
                </dt>
                <dd className={styles.profile__body_list_item_value}>
                  {firstName}
                </dd>
              </div>
              <div className={styles.profile__body_list_item}>
                <dt className={styles.profile__body_list_item_label}>
                  Last Name
                </dt>
                <dd className={styles.profile__body_list_item_value}>
                  {lastName}
                </dd>
              </div>
              <div className={styles.profile__body_list_item}>
                <dt className={styles.profile__body_list_item_label}>
                  Nickname
                </dt>
                <dd className={styles.profile__body_list_item_value}>
                  {nickName}
                </dd>
              </div>
              <div className={styles.profile__body_list_item}>
                <dt className={styles.profile__body_list_item_label}>Email</dt>
                <dd className={styles.profile__body_list_item_value}>
                  {email}
                </dd>
              </div>
              <div className={styles.profile__body_list_item}>
                <dt className={styles.profile__body_list_item_label}>
                  Phone number
                </dt>
                <dd className={styles.profile__body_list_item_value}>
                  {phoneNumber}
                </dd>
              </div>
              <div className={styles.profile__body_list_item}>
                <dt className={styles.profile__body_list_item_label}>
                  Position
                </dt>
                <dd className={styles.profile__body_list_item_value}>
                  {position}
                </dd>
              </div>
              <div className={styles.profile__body_list_item}>
                <dt className={styles.profile__body_list_item_label}>
                  Description
                </dt>
                <dd className={styles.profile__body_list_item_value}>
                  {description}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
