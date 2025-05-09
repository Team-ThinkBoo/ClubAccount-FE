import Button from "@/components/Button";
import defaultProfile from "/defaultProfile.png";
import ViewContent from "@/features/mypage/ViewContent";
import EditContent from "@/features/mypage/EditContent";
import { ChangeEvent, useEffect, useState } from "react";
import EditProfileModal from "@/features/mypage/EditProfileModal";
import { useLoadProfile, usePatchProfile } from "@/hooks/useProfile";
import { useSearchParams } from "react-router-dom";

const MyPage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [mode, setMode] = useState<"view" | "edit">(
    (searchParam.get("mode") as "view" | "edit") || "view"
  );
  const [onEditProfileImg, setOnEditProfileImg] = useState(false);

  const { data } = useLoadProfile();
  const [department, setDepartment] = useState(data?.department);
  const [profileImg, setProfileImg] = useState<File>();
  const [preview, setPreview] = useState<string>();

  const { mutate: editProfileMutation } = usePatchProfile();

  function handleMode(mode: "view" | "edit") {
    setMode(mode);
    setSearchParam({ mode });
  }

  function handleCloseModal() {
    setOnEditProfileImg(false);
    setProfileImg(undefined);
    setPreview(undefined);
  }
  function handleOpenModal() {
    setOnEditProfileImg(true);
  }

  function handleEditProfile() {
    editProfileMutation({ profileImage: profileImg, profile: { organization: department } });
  }

  function handleDeptChnage(e: ChangeEvent<HTMLInputElement>) {
    setDepartment(e.target.value);
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setProfileImg(file);
  };

  useEffect(() => {
    const param = searchParam.get("mode");
    if (param === "view" || param === "edit") {
      setMode(param);
    }
  }, [searchParam]);

  useEffect(() => {
    setDepartment(data?.department);
  }, [data]);

  return (
    <>
      {onEditProfileImg && (
        <EditProfileModal
          onConfirm={() => setOnEditProfileImg(false)}
          preview={preview}
          onImgChange={handleFileChange}
          open={onEditProfileImg}
          onClose={handleCloseModal}
        />
      )}
      <div className="w-[312px] md:w-[552px] lg:w-[672px] gap-10 flex flex-col items-center justify-center mx-auto h-fit px-5 py-10 rounded-xl shadow-[0px_3px_10.8px_2px_rgba(0,_0,_0,_0.07)]">
        <h1 className="flex flex-col items-center justify-center whitespace-pre title-extra-18 text-gray-01">
          마이 페이지
        </h1>
        <img
          onClick={() => (mode === "view" ? handleMode("edit") : handleOpenModal())}
          src={preview || data?.profileUrl || defaultProfile}
          alt="프로필 이미지"
          className="w-[88px] h-[88px] object-cover rounded-full cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center w-full gap-4">
          {mode === "view" && data && <ViewContent mode={mode} info={data} />}
          {mode === "edit" && data && (
            <EditContent
              department={department || ""}
              onChnage={handleDeptChnage}
              mode={mode}
              info={data}
            />
          )}
        </div>
        <div className="flex justify-center w-full">
          {mode === "view" && <Button onClick={() => handleMode("edit")}>회원정보 수정</Button>}
          {mode === "edit" && (
            <div className="flex justify-center gap-3">
              <button
                onClick={() => handleMode("view")}
                className="w-[130px] md:w-[150px] h-12 px-4 py-3 rounded-lg body-bold-16 text-gray-03 bg-gray-06"
              >
                취소
              </button>
              <button
                onClick={() => handleEditProfile()}
                className="w-[130px] md:w-[150px] h-12 py-3 rounded-lg body-bold-16 text-gray-01 bg-primary"
              >
                회원정보 저장
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyPage;
