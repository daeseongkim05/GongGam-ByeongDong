import { useState } from "react";
import MainBtn from "../common/MainBtn";
import Link from "next/link";

interface IProps {
  departments: [
    {
      id: number;
      name: string;
    }
  ];
}

const Department = ({ departments }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-3 lg:gap-4 md:gap-4 gap-2 lg:mt-4 md:mt-4 mt-3">
        {departments.slice(0, 18).map((el) => {
          return (
            <div key={el.id}>
              <Link href="/department/[name]" as={`/department/${el.name}`}>
                <a>
                  <div className="flex justify-center items-center lg:h-16 md:h-16 h-12 border text-gray-main hover:text-blue-main border-gray-sub hover:border-blue-main cursor-pointer">
                    <div className="font-sub font-normal lg:text-sm md:text-sm text-xs">
                      {el.name}
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
        {isOpen
          ? departments.slice(18).map((el) => {
              return (
                <div key={el.id}>
                  <Link href="/department/[name]" as={`/department/${el.name}`}>
                    <a>
                      <div className="flex justify-center items-center lg:w-40 md:w-44 lg:h-16 md:h-16 h-12 border text-gray-main hover:text-blue-main border-gray-sub hover:border-blue-main cursor-pointer">
                        <div className="font-sub font-normal lg:text-sm md:text-sm text-xs">
                          {el.name}
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })
          : null}
      </div>
      <div className="flex justify-center w-auto mt-4">
        <div onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <MainBtn context={"닫기"} />
          ) : (
            <MainBtn context={"더보기"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Department;
