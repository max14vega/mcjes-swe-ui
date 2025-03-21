import { useNavigate } from "react-router-dom";

export default function Profile({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex bg-gray-100 items-center justify-center">
      <div>
        <h2>Profile Page</h2>
        <p>Welcome, {user.email}!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}