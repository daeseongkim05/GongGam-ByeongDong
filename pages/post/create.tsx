import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import HeadInfo from "../../components/global/HeadInfo";
// import WeatherBtn from "../../components/common/WeatherBtn";
import MainBtn from "../../components/common/MainBtn";
import SubBtn from "../../components/common/SubBtn";
import Toggle from "../../components/common/Toggle";
import ChangePhoto from "../../components/icon/ChangePhoto";
import dynamic from "next/dynamic";
import { useWeather } from "../../hooks/useWeather";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="font-main font-nomal md:text-xl text-lg text-gray-sub">
      남기고 싶은 기록을 자유롭게 적어주세요.
    </div>
  ),
});

interface IProps {
  departments: [{ id: number; name: string }];
}

const Create = ({ departments }: IProps) => {
  const router = useRouter();

  const [weather, renderWeathers] = useWeather();
  // const [department, setDepartment] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "indent",
    "link",
  ];

  return (
    <>
      {/* headInfo */}
      <HeadInfo
        title={"글쓰기"}
        content={"오늘의 감정과 생각을 자유롭게 기록해보세요."}
      />
      {/* CreatePost Page */}
      {/* Img Container */}
      <section className="flex flex-col justify-center items-center w-screen h-72 bg-gray-100">
        {weather === "" ? (
          <>
            <div className="font-main font-nomal text-2xl text-gray-main">
              내 감정의 날씨는?
            </div>
            <div className="my-3 font-main font-nomal text-sm text-gray-main">
              선택하신 감정과 어울리는 대표 사진이 선정됩니다.
            </div>
          </>
        ) : (
          <div
            className="mb-8"
            onMouseDown={() => setIsClick(true)}
            onMouseUp={() => setIsClick(false)}
          >
            <ChangePhoto color={isClick ? "#0984C0" : "#AAA7B0"} />
          </div>
        )}
        {/* 날씨 선택 */}
        <div className="w-screen flex justify-center">{renderWeathers()}</div>
      </section>
      {/* Middle Container */}
      <div className="flex justify-center">
        <div className="lg:w-lg w-screen p-4">
          {/* Choose Departments */}
          <section className="flex md:flex-row flex-col-reverse justify-between md:mb-8 mb-6">
            <div className="flex md:mt-5 cursor-pointer">
              <select
                className="cursor-pointer appearance-none mr-2 font-main font-nomal lg:text-xl text-lg text-gray-main outline-none "
                // onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="" hidden>
                  진료받고 계신 과는 어딘가요?
                </option>
                {departments.map((department) => {
                  return (
                    <option key={department.id} value={department.name}>
                      {department.name}
                    </option>
                  );
                })}
              </select>
              <Image
                src="/images/common/dropBox_Icon.svg"
                alt="dropBox_Icon"
                width={20}
                height={20}
              />
            </div>
            {/* Toggle */}
            <div className="flex md:mb-0 mt-4 mb-8 items-center justify-end">
              <div className="mr-2 font-main font-nomal lg:text-lg text-base text-gray-main">
                글 공개 여부
              </div>
              <Toggle
                isClick={isPublic}
                handleClick={() => setIsPublic(!isPublic)}
              />
              <div className="lg:ml-6 ml-4 mx-2 font-main font-nomal lg:text-lg text-base text-gray-main">
                댓글 활성화 여부
              </div>
              <Toggle
                isClick={isActive}
                handleClick={() => setIsActive(!isActive)}
              />
            </div>
          </section>
          {/* Title Input */}
          <section>
            <input
              type="text"
              maxLength={36}
              className="w-full md:mb-4 mb-2 font-main font-nomal md:text-3xl text-2xl placeholder-gray-sub text-gray-main outline-none"
              placeholder="글의 제목을 입력해 주세요."
            ></input>
            <input
              type="text"
              maxLength={54}
              className="w-full mb-4 font-main font-nomal md:text-xl text-lg placeholder-gray-sub text-gray-main outline-none"
              placeholder="글의 내용을 간략하게 설명해 주세요."
            ></input>
          </section>
        </div>
      </div>
      {/* Line */}
      <div className="w-full border-1/2 border-b border-gray-sub" />
      {/* Bottom Container */}
      <section className="flex justify-center">
        <div className="lg:w-lg w-screen p-4">
          {/* Quil Editor */}
          <div className="mt-4">
            <ReactQuill
              theme="bubble"
              placeholder="남기고 싶은 기록을 자유롭게 적어주세요."
              modules={modules}
              formats={formats}
              value={value}
              onChange={setValue}
            />
          </div>
          <div className="flex justify-center">
            <div className="my-12 grid grid-cols-2 gap-2">
              <MainBtn context={"등록"} />
              <SubBtn context={"취소"} handleClick={() => router.back()} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Create;

export async function getStaticProps() {
  const getData = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/department`
  );
  const data = getData.data;
  return {
    props: {
      departments: data,
    },
  };
}
