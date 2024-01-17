import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  function dashboardNavigate() {
    navigate("/dashboard");
  }
  return (
    <div>
      This is landing page
      <button onClick={dashboardNavigate}>Navigate to Dashboard</button>
    </div>
  );
}
