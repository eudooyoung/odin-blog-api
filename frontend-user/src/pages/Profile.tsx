import ProfileEdit from "@/components/ProfileEdit.tsx";
import ProfileView from "@/components/ProfileView.tsx";
import { useState } from "react";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const editButtonHandler = () => {
    setIsEdit(true);
  };
  return (
    <>
      <h2>Profile</h2>
      {!isEdit && <ProfileView editButtonHandler={editButtonHandler} />}
      {isEdit && <ProfileEdit />}
    </>
  );
};
export default Profile;
