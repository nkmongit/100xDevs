const ProfileInfoCard = ({ count, value }) => {
  return (
    <div className="flex flex-col mt-14 gap-3">
      <div className="font-bold">{count}</div>
      <div className="text-gray-400">{value}</div>
    </div>
  );
};

export default ProfileInfoCard;
