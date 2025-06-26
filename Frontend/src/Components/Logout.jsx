import React from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/logout", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        navigate("/login");
        handleSuccess("You are Logged out!!");
      } else {
        console.error(error.message);
        handleError(error.message || "Logout failed");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };
  return (
    <div>
      <button
        onClick={handleLogout}
        className="bg-red-500  text-white hover:bg-red-400 -pt-2 cursor-pointer px-4 py-2 rounded-3xl"
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
