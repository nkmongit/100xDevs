const Info = ({ name, age, place }) => {
  return (
    <div className="flex flex-col p-6 items-center mt-28 gap-3">
      <div className="flex flex-row gap-5">
        <div className="font-bold">{name}</div>
        <div className="text-gray-400">{age}</div>
      </div>
      <div className="text-gray-400">{place}</div>
    </div>
  );
};

export default Info;
