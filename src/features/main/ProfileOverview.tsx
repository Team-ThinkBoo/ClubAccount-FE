import Overview from "./Overview";
import Profile from "./Profile";

const ProfileOverview = () => {
  return (
    <div className="p-6 md:px-[76px] lg:px-[124px]">
      <Profile />
      <Overview />
    </div>
  );
};

export default ProfileOverview;
