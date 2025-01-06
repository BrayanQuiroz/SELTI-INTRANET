type Props = {
  textCenter: string;
  textBottom: string;
  textBottomTwo?: string;
  textBottomThree?: string;
  isActive?: boolean;
};

const Circle = ({
  textCenter,
  textBottom,
  textBottomTwo,
  textBottomThree,
  isActive,
}: Props) => {
  return (
    <div className=" w-[170px]   flex flex-col items-center">
      <div
        style={{ backgroundColor: isActive ? '#DC2626' : '#CCC' }}
        className={`w-[90px] h-[90px] rounded-[50%]  flex justify-center items-center mb-4`}
      >
        <span className="text-white text-5xl">{textCenter}</span>
      </div>
      <div
        className={`${isActive ? 'text-redMain' : 'text-[#CCC]'} flex flex-col justify-center items-center`}
      >
        <p>{textBottom}</p>
        <p>{textBottomTwo}</p>
        <p>{textBottomThree}</p>
      </div>
    </div>
  );
};

export default Circle;
