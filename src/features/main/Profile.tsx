import { useNavigate } from "react-router-dom";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import { useAuthStore } from "../../store/useAuthStore";

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  function handleLogout() {
    logout();
    navigate("/");
  }
  return (
    <>
      <div className="flex items-center gap-4 mx-auto min-w-[312px] max-w-[568px] md:min-w-[616px] md:max-w-[776px] lg:min-w-[776px] lg:max-w-[976px]">
        <img
          src="https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=13262118&filePath=L2Rpc2sxL25ld2RhdGEvMjAyMC8yMS9DTFMxMDAwNi82MmZhMWExMy03ZjRmLTQ1NWMtYTZlNy02ZTk2YjhjMjBkYTk=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10006"
          alt="프로필 이미지"
          className="object-cover w-12 h-12 border-2 rounded-full"
        />
        <div className="flex items-center flex-1 gap-1">
          <p className="text-gray-01 body-bold-16">김파산 님</p>
          <ArrowRightIcon />
        </div>
        <p onClick={handleLogout} className="cursor-pointer caption-med-12 text-gray-03">
          로그아웃
        </p>
      </div>
    </>
  );
};

export default Profile;
