const Navigation = () => {
  return (
    <div>
      <button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Landing
      </button>

      <button
        onClick={() => {
          window.location.href = "/dashboard";
        }}
      >
        Dashboard
      </button>
    </div>
  );
};

export default Navigation;
