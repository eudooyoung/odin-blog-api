import { useAuthContext } from "@/hooks/useAuthContext.ts";
import { useProfile } from "@/hooks/useProfile.ts";
import { useState, type SubmitEventHandler } from "react";

const ProfileEdit = ({ user, onSave, onCancel }) => {
  const [displayName, setDisplayName] = useState(user?.displayName);
  const { updateProfile } = useProfile(user.id);

  const updateHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const success = await updateProfile({ displayName });
    if (success) {
      onSave();
    }
  };

  return (
    <form onSubmit={updateHandler}>
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={user?.username}
        disabled
      />
      <label htmlFor="displayName">display name</label>
      <input
        type="text"
        name="displayName"
        id="displayName"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        required
      />
      <button type="submit">save</button>
      <button onClick={onCancel}>cancel</button>
    </form>
  );
};
export default ProfileEdit;
