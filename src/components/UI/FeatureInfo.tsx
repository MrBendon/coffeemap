import { FaWifi } from "react-icons/fa";
import { GiCoffeeCup } from "react-icons/gi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IoIosStar } from "react-icons/io";
import {
  MdAttachMoney,
  MdLibraryMusic,
  MdOutlineEventSeat,
} from "react-icons/md";

const icon = {
  seat: <MdOutlineEventSeat />,
  wifi: <FaWifi />,
  quiet: <HiOutlineSpeakerWave />,
  tasty: <GiCoffeeCup />,
  cheap: <MdAttachMoney />,
  music: <MdLibraryMusic />,
};

const titleText = {
  seat: "座位數量",
  wifi: "WIFI",
  quiet: "安靜程度",
  tasty: "店家手藝",
  cheap: "餐點價位",
  music: "裝潢音樂",
};

interface PropsType {
  title: "seat" | "wifi" | "quiet" | "tasty" | "cheap" | "music";
  stars: number | undefined;
}

function FeatureInfo({ title, stars }: PropsType) {
  return (
    <div className="flex items-center justify-start gap-2">
      <div className="flex items-center justify-start gap-1">
        {icon[title]}
        <p className="w-14">{titleText[title]}</p>
      </div>
      <div className="flex items-center justify-start">
        {stars
          ? Array.from({ length: stars }, (_, i) => i).map((value) => (
              <IoIosStar key={value} />
            ))
          : null}
      </div>
    </div>
  );
}

export default FeatureInfo;
