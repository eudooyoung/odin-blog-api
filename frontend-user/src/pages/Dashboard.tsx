import type { ButtonHTMLAttributes, MouseEventHandler } from "react";

const Dashboard = () => {
  const logoutHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <button>Logout</button>
    </div>
  );
};
export default Dashboard;
