import { useAuthContext } from "@/hooks/useAuthContext.ts";
import { useState, type SubmitEventHandler } from "react";

const ProfileEdit = () => {
  const { user } = useAuthContext();
  const [displayName, setDisplayName] = useState(user?.displayName);

  const updateHandler: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={updateHandler}>
      <label htmlFor="username">username</label>
      <input type="text" value={user?.username} readOnly />
      <label htmlFor="displayName">display name</label>
      <input
        type="text"
        name="displayName"
        id="displayName"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <button type="submit">save</button>
    </form>
  );
};
export default ProfileEdit;
