import { motion } from "motion/react";
import { useState } from "react";
import { Background } from "../Page1/Page1";
import partTitleSvg from "../../assets/part-title.svg";
import iconRoadPedestrian from "../../assets/icon-road-pedestrian.svg";
import iconRoadNormal from "../../assets/icon-road-normal.svg";
import iconRoadHighway from "../../assets/icon-road-highway.svg";
import picCursorMode from "../../assets/pic-cusor-mode.svg";
import picToolMode from "../../assets/pic-tool-mode.svg";
import toolModeStart from "../../assets/tool-mode-start.svg";
import cursorModeStart from "../../assets/cursor-mode-start.svg";

const slideInFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

function CapsuleLabel({ text }: { text: string }) {
  return (
    <div className="bg-[#252525] content-stretch flex items-center justify-center px-[5px] shrink-0">
      <p className="font-medium leading-[1.4] shrink-0 text-[24px] text-white whitespace-nowrap">{text}</p>
    </div>
  );
}

/* ---- 道路等级卡片 ---- */
const roadIcons = {
  walk: iconRoadPedestrian,
  road: iconRoadNormal,
  highway: iconRoadHighway,
};

function RoadCard({ label, level, onHover }: { label: string; level: keyof typeof roadIcons; onHover: (level: keyof typeof roadIcons | null) => void }) {
  return (
    <div
      className="content-stretch flex flex-col gap-[7px] items-start shrink-0 w-[140px] cursor-pointer"
      data-name="road"
      onMouseEnter={() => onHover(level)}
      onMouseLeave={() => onHover(null)}
    >
      <p className="font-normal leading-[1.4] shrink-0 text-[20px] text-black text-center whitespace-nowrap">{label}</p>
      <div className="h-[140px] overflow-clip relative rounded-[12px] shrink-0 w-full hover:shadow-[0px_4px_0px_0px_black] transition-shadow"
        data-name="icon-road"
      >
        <img alt={label} className="absolute block inset-0 max-w-none size-full" src={roadIcons[level]} />
      </div>
    </div>
  );
}

function RoadCards({ onHover }: { onHover: (level: keyof typeof roadIcons | null) => void }) {
  return (
    <div className="content-stretch flex gap-[74px] items-center shrink-0 w-full">
      <RoadCard label="<步行道>" level="walk" onHover={onHover} />
      <RoadCard label="<普通车道>" level="road" onHover={onHover} />
      <RoadCard label="<高速公路>" level="highway" onHover={onHover} />
    </div>
  );
}

/* ---- 左侧：大脑道路等级示意 ---- */
function PartRule() {
  const [hoveredLevel, setHoveredLevel] = useState<keyof typeof roadIcons | null>(null);

  const footerData: Record<keyof typeof roadIcons, { title: string; body: string }> = {
    walk: {
      title: "(初始状态)",
      body: "初始的神经通路，就像一条安静的步行道，信息通过效率低。",
    },
    road: {
      title: "(中等强化状态)",
      body: "随着使用次数增加，通路会被不断加固，升级为普通车道，信息传递也越来越顺畅。",
    },
    highway: {
      title: "(终极强化状态)",
      body: "当通路被反复强化，最终会变成宽阔的高速公路，让你的反应又快又稳！",
    },
  };

  return (
    <motion.div
      variants={slideInFromLeft}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      className="content-stretch flex flex-col gap-[24px] items-start w-full h-[360px]"
    >
      <CapsuleLabel text="大脑道路等级示意" />
      <RoadCards onHover={setHoveredLevel} />
      <div className="text-[20px] text-black w-full min-h-[72px]">
        {hoveredLevel && (
          <>
            <p className="font-bold leading-[1.8] mb-0">{footerData[hoveredLevel].title}</p>
            <p className="leading-[1.8]">{footerData[hoveredLevel].body}</p>
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ---- 左侧：想一想 ---- */
function PartThink() {
  return (
    <motion.div
      variants={slideInFromLeft}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      className="content-stretch flex flex-col gap-[24px] items-start w-full"
    >
      <CapsuleLabel text="想一想" />
      <div className="font-medium leading-[0] shrink-0 text-[32px] text-black">
        <p className="leading-[2] mb-0">经常做一件事，会给大脑带来什么变化?</p>
        <p className="leading-[2]">很久不做一件事，又会慢慢怎样呢?</p>
      </div>
    </motion.div>
  );
}

/* ---- 左侧：标题 ---- */
function PartTitle() {
  return (
    <motion.div
      variants={slideInFromLeft}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-[55.8px] w-[534.66px]"
    >
      <img alt="标题" className="block max-w-none size-full" src={partTitleSvg} />
    </motion.div>
  );
}

/* ---- 右侧：操作指引 ---- */
function PartGuide() {
  return (
    <motion.div
      variants={slideInFromRight}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      className="content-stretch flex flex-col gap-[24px] items-start justify-end w-full h-[302px]"
    >
      <CapsuleLabel text="操作指引" />
      <div className="bg-white border-[#252525] border-[1.5px] border-solid content-stretch flex items-center justify-center rounded-[12px] shrink-0 w-full">
        <div className="flex-1 leading-[0] min-w-px text-[0px] text-black text-center p-[20px]">
          <p className="mb-0">
            <span className="font-normal leading-[1.8] text-[20px]">我们生活中学习的每一项 </span>
            <span className="font-medium leading-[1.8] text-[24px]">本领</span>
            <span className="font-normal leading-[1.8] text-[24px]">，</span>
          </p>
          <p className="font-normal leading-[1.8] mb-0 text-[20px]">都能在大脑中铺设专属的神经道路。</p>
          <p className="font-normal leading-[1.8] text-[20px]">现在，就来亲手塑造你的大脑城市吧！</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ---- 右侧：模式选项卡 ---- */
type ModeType = "tool" | "cursor";

function TabBar({ activeMode, onModeChange }: { activeMode: ModeType; onModeChange: (mode: ModeType) => void }) {
  return (
    <div className="content-stretch flex items-start px-[20px] shrink-0 w-full relative">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute bg-[#252525] h-[42px] rounded-tl-[12px] rounded-tr-[12px] top-0 w-[140px] z-0"
        style={{ left: activeMode === "tool" ? 20 : 160 }}
      />
      <div
        className="content-stretch flex flex-col h-[42px] items-center justify-center rounded-tl-[12px] rounded-tr-[12px] shrink-0 w-[140px] relative z-10 cursor-pointer select-none"
        onClick={() => onModeChange("tool")}
      >
        <p className={`font-normal leading-[1.4] shrink-0 text-[24px] whitespace-nowrap transition-colors duration-300 ${activeMode === "tool" ? "text-white" : "text-black"}`}>教具模式</p>
      </div>
      <div
        className="content-stretch flex flex-col h-[42px] items-center justify-center rounded-tl-[20px] rounded-tr-[20px] shrink-0 w-[140px] z-10 cursor-pointer select-none"
        onClick={() => onModeChange("cursor")}
      >
        <p className={`font-normal leading-[1.4] shrink-0 text-[24px] whitespace-nowrap transition-colors duration-300 ${activeMode === "cursor" ? "text-white" : "text-black"}`}>鼠标模式</p>
      </div>
    </div>
  );
}


function TabContent({ activeMode }: { activeMode: ModeType }) {
  const src = activeMode === "tool" ? picToolMode : picCursorMode;
  return (
    <div className="bg-[#252525] h-[286px] relative rounded-tl-[12px] rounded-tr-[12px] shrink-0 w-full overflow-hidden flex items-center justify-center">
      <img alt={activeMode === "tool" ? "教具模式示意" : "鼠标模式示意"} className="max-w-full max-h-full" src={src} />
    </div>
  );
}

function StartButton({ onClick, activeMode }: { onClick: (mode: ModeType) => void; activeMode: ModeType }) {
  const src = activeMode === "tool" ? toolModeStart : cursorModeStart;
  return (
    <button
      onClick={() => onClick(activeMode)}
      className="h-[85px] shrink-0 w-full cursor-pointer bg-white border-2 border-[#252525] border-solid rounded-b-[12px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
      style={{ boxShadow: "0 3px 0 0 #000" }}
    >
      <img alt="开始实验" className="max-w-full max-h-full" src={src} />
    </button>
  );
}

function ModeTabs({ onStart }: { onStart: (mode: ModeType) => void }) {
  const [activeMode, setActiveMode] = useState<ModeType>("tool");

  return (
    <motion.div
      variants={slideInFromRight}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
      className="content-stretch flex flex-col items-start w-full"
    >
      <TabBar activeMode={activeMode} onModeChange={setActiveMode} />
      <TabContent activeMode={activeMode} />
      <StartButton onClick={onStart} activeMode={activeMode} />
    </motion.div>
  );
}

/* ---- Page0 主组件 ---- */
export default function Page0({ onStart }: { onStart: (mode: ModeType) => void }) {
  return (
    <div className="bg-[#E2E2E2] relative size-full overflow-hidden">
      <div className="absolute inset-0" style={{ transform: "scale(0.85)", transformOrigin: "center" }}>
        <Background showVector1={false} />
      </div>

      {/* 左侧栏 */}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[74px] items-start left-[calc(50%-343.5px)] top-1/2 w-[567px]">
        <PartTitle />
        <PartThink />
        <PartRule />
      </div>

      {/* 右侧栏 */}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[20px] items-start left-[calc(50%+345.5px)] top-[calc(50%+38px)] w-[589px]">
        <PartGuide />
        <ModeTabs onStart={onStart} />
      </div>
    </div>
  );
}
