import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  function landingNavigate() {
    navigate("/");
  }
  return (
    <div>
      This is a dashboard
      <button onClick={landingNavigate}>Navigate to Landing Page</button>
    </div>
  );
}
