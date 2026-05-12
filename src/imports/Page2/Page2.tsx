import svgPaths from "./svg-14yfvhpnzz";
import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import reportTitle from "../../assets/report-title.svg";
import {
  BRAIN_TAG_META,
  BrainScene as Unit13BrainScene,
  BrainSceneState,
  BrainTagKey,
  getTopTagsFromPathWidths,
} from "../Page1/Page1";

function Frame8() {
  return (
    <div className="absolute h-[548px] left-0 top-[0.04px] w-[550px] overflow-visible">
      <div className="absolute bg-white h-[548px] left-0 top-0 w-[550px] overflow-visible" />
      <div className="absolute bg-[#999] h-[500px] left-[24px] top-[21px] w-[504px] overflow-visible" />
      <div className="absolute flex h-[463.287px] items-center justify-center left-[20px] top-[39px] w-[507.75px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "20" } as React.CSSProperties}>
        <div className="flex-none rotate-[9.91deg]">
          <div className="h-[392.199px] relative w-[446.897px]" data-name="background">
            <div className="absolute inset-[-6.23%_-5.47%_-6.26%_-5.47%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 495.784 441.209">
                <g filter="url(#filter0_d_24_225)" id="background">
                  <path d={svgPaths.p1006cf80} fill="var(--fill-0, #E2E2E2)" />
                  <path d={svgPaths.p1006cf80} stroke="var(--stroke-0, #252525)" strokeWidth="0.958583" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="441.209" id="filter0_d_24_225" width="495.784" x="-3.8743e-07" y="7.15256e-07">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="11.9823" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_24_225" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_24_225" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="-translate-x-full absolute font-light leading-[10px] left-[529.81px] not-italic text-[30px] text-black text-right top-[528.66px] whitespace-nowrap">---------</p>
      <p className="-translate-x-full absolute font-light leading-[10px] left-[calc(50%-136.31px)] not-italic text-[30px] text-black text-right top-[4.86px] whitespace-nowrap">---------</p>
      <p className="absolute font-serif leading-[30px] left-[33.05px] not-italic text-[20px] text-black top-[487.16px] tracking-[0.8px] whitespace-nowrap">NO-2026-YOURBRAINCITY-000</p>
    </div>
  );
}

function BrainScene() {
  return (
    <div className="h-[266.244px] relative w-[383px]" data-name="brain-scene">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 383 266.366">
        <g id="brain-scene">
          <path d={svgPaths.p3f033d00} id="other-mid-10" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p2863fd00} id="other-mid-9" stroke="var(--stroke-0, black)" strokeWidth="0.48852" />
          <path d={svgPaths.p1d988600} fill="var(--stroke-0, black)" id="other-mid-8" />
          <path d={svgPaths.pa1b4000} id="other-mid-7" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p2c722400} id="other-mid-6" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p12f71c60} id="other-mid-5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p204df2a0} id="other-mid-4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p15789000} id="other-mid-3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.pffb3100} id="other-mid-2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.pc01d00} id="other-mid-1" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p2f0d1d00} id="other-left-9" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p2f7a0800} id="other-left-8" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p103d4a60} id="other-left-7" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p1a9ce500} id="other-left-6" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p36e0b700} id="other-left-5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p1d3aef00} id="other-left-4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p328b1480} id="other-left-3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p26269900} id="other-left-2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p22f7100} id="other-left-1" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.pec4a800} id="other-right-10" stroke="var(--stroke-0, black)" strokeWidth="0.48852" />
          <path d={svgPaths.p1e3bd800} id="other-right-9" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.pfa67480} id="other-right-8" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p248cf700} id="other-right-7" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p14ded600} fill="var(--stroke-0, black)" id="other-right-6" />
          <path d={svgPaths.p22bcae80} id="other-right-5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p362fc500} id="other-right-4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.pf99cd10} id="other-right-3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p32af52c0} id="other-right-2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p5b24300} id="other-right-1" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p38a62b00} id="path-brain-2" stroke="var(--stroke-0, #F8BF00)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p23205c60} id="path-brain-1" stroke="var(--stroke-0, #F8BF00)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p27a21800} id="path-creative-3" stroke="var(--stroke-0, #E14757)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p23fec440} id="path-creative-2" stroke="var(--stroke-0, #E14757)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p7a7fce0} id="path-creative-1" stroke="var(--stroke-0, #E14757)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p710d900} id="path-logic" stroke="var(--stroke-0, #208FDF)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p3fc50800} id="path-audio" stroke="var(--stroke-0, #439A42)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p3bc48980} id="path-lang" stroke="var(--stroke-0, #DC5CA3)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p3f17e480} id="path-vision-2" stroke="var(--stroke-0, #9500FF)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p1d9e1030} id="path-vision-1" stroke="var(--stroke-0, #9500FF)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p323f6740} id="path-motor-2" stroke="var(--stroke-0, #FE6B1F)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p2b025100} id="path-motor-1" stroke="var(--stroke-0, #FE6B1F)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p20862cc0} id="path-hand-2" stroke="var(--stroke-0, #00A79A)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p32614f00} id="path-hand-1" stroke="var(--stroke-0, #00A79A)" strokeLinecap="round" strokeWidth="0.48852" />
          <path d={svgPaths.p23f88680} id="path-brain-2-line" opacity="0" stroke="var(--stroke-0, white)" strokeDasharray="3.91 5.86" strokeWidth="0.48852" />
          <path d={svgPaths.p20916980} id="path-brain-1-line" opacity="0" stroke="var(--stroke-0, white)" strokeDasharray="3.91 5.86" strokeWidth="1.2213" />
          <path d={svgPaths.p19048d40} id="path-creative-3-line" opacity="0" stroke="var(--stroke-0, white)" strokeDasharray="3.91 5.86" strokeWidth="1.2213" />
          <path d={svgPaths.p1c3626c0} id="path-creative-2-line" opacity="0" stroke="var(--stroke-0, white)" strokeDasharray="3.91 5.86" strokeWidth="1.2213" />
          <path d={svgPaths.p7a7fce0} id="path-creative-1-line" opacity="0" stroke="var(--stroke-0, white)" strokeDasharray="3.91 5.86" strokeWidth="1.2213" />
          <path d={svgPaths.p216f8880} id="path-lang-line" opacity="0" stroke="var(--stroke-0, white)" strokeDasharray="3.91 5.86" strokeWidth="1.2213" />
          <path d={svgPaths.p2d0e9c80} id="path-audio-line" opacity="0" stroke="var(--stroke-0, white)" strokeDasharray="3.91 5.86" strokeWidth="1.2213" />
          <path d={svgPaths.p3144c480} id="path-logic-line" opacity="0" stroke="var(--stroke-0, white)" strokeDasharray="3.91 5.86" strokeWidth="1.2213" />
          <path d={svgPaths.p3f17e480} id="path-vision-2-line" opacity="0" stroke="var(--stroke-0, white)" strokeDasharray="3.91 5.86" strokeWidth="1.2213" />
          <path d={svgPaths.p39cc7e00} id="path-vision-1-line" opacity="0" stroke="var(--stroke-0, white)" strokeDasharray="3.91 5.86" strokeWidth="1.2213" />
          <path d={svgPaths.p2e8abf00} id="path-motor-2-line" opacity="0" stroke="var(--stroke-0, white)" strokeDasharray="3.91 5.86" strokeWidth="1.2213" />
          <path d={svgPaths.p1e1cf700} id="path-motor-1-line" opacity="0" stroke="var(--stroke-0, white)" strokeDasharray="3.91 5.86" strokeWidth="9.77041" />
          <path d={svgPaths.p3e05565c} id="path-hand-2-line" opacity="0" stroke="var(--stroke-0, white)" strokeDasharray="3.91 5.86" strokeWidth="1.2213" />
          <path d={svgPaths.p37158530} id="path-hand-1-line" opacity="0" stroke="var(--stroke-0, white)" strokeDasharray="3.91 5.86" strokeWidth="1.2213" />
          <circle cx="344.106" cy="224.394" fill="var(--fill-0, #93E758)" id="cell-15" r="7.06625" stroke="var(--stroke-0, #D5FC74)" strokeWidth="2.51848" />
          <circle cx="10.3688" cy="10.3688" fill="var(--fill-0, #93E758)" id="cell-14" r="9.10955" stroke="var(--stroke-0, #D5FC74)" strokeWidth="2.51848" transform="matrix(1 0 0 -1 271.416 193.006)" />
          <circle cx="10.3688" cy="10.3688" fill="var(--fill-0, #93E758)" id="cell-13" r="9.10955" stroke="var(--stroke-0, #D5FC74)" strokeWidth="2.51848" transform="matrix(1 0 0 -1 213.059 226.436)" />
          <circle cx="344.106" cy="94.1601" fill="var(--fill-0, #93E758)" id="cell-12" r="7.06625" stroke="var(--stroke-0, #D5FC74)" strokeWidth="2.51848" />
          <circle cx="273.466" cy="140.528" fill="var(--fill-0, #93E758)" id="cell-11" r="7.06625" stroke="var(--stroke-0, #D5FC74)" strokeWidth="2.51848" />
          <circle cx="296.297" cy="48.3304" fill="var(--fill-0, #93E758)" id="cell-10" r="7.06625" stroke="var(--stroke-0, #D5FC74)" strokeWidth="2.51848" />
          <circle cx="242.128" cy="88.6186" fill="var(--fill-0, #93E758)" id="cell-09" r="7.06625" stroke="var(--stroke-0, #D5FC74)" strokeWidth="2.51848" />
          <circle cx="10.3688" cy="10.3688" fill="var(--fill-0, #93E758)" id="cell-08" r="9.10955" stroke="var(--stroke-0, #D5FC74)" strokeWidth="2.51848" transform="matrix(1 0 0 -1 181.312 160.568)" />
          <circle cx="145.074" cy="190.964" fill="var(--fill-0, #93E758)" id="cell-07" r="7.06625" stroke="var(--stroke-0, #D5FC74)" strokeWidth="2.51848" />
          <circle cx="10.3688" cy="10.3688" fill="var(--fill-0, #93E758)" id="cell-06" r="9.10955" stroke="var(--stroke-0, #D5FC74)" strokeWidth="2.51848" transform="matrix(1 0 0 -1 206.13 20.7376)" />
          <circle cx="167.729" cy="88.6189" fill="var(--fill-0, #93E758)" id="cell-05" r="9.10955" stroke="var(--stroke-0, #D5FC74)" strokeWidth="2.51848" />
          <circle cx="136.751" cy="40.0054" fill="var(--fill-0, #93E758)" id="cell-04" r="7.06625" stroke="var(--stroke-0, #D5FC74)" strokeWidth="2.51848" />
          <circle cx="80.1585" cy="115.207" fill="var(--fill-0, #93E758)" id="cell-03" r="7.06625" stroke="var(--stroke-0, #D5FC74)" strokeWidth="2.51848" />
          <circle cx="10.3688" cy="10.3688" fill="var(--fill-0, #93E758)" id="cell-02" r="9.10955" stroke="var(--stroke-0, #D5FC74)" strokeWidth="2.51848" transform="matrix(1 0 0 -1 51.0966 58.7)" />
          <circle cx="16.0925" cy="102.486" fill="var(--fill-0, #93E758)" id="cell-01" r="7.06625" stroke="var(--stroke-0, #D5FC74)" strokeWidth="2.51848" />
        </g>
      </svg>
    </div>
  );
}

function Picture({ brainSceneState }: { brainSceneState?: BrainSceneState | null }) {
  // 原始 BrainScene 尺寸: 705.526px × 476.377px
  // 目标宽度: 384px
  // 缩放比例: 384 / 705.526 ≈ 0.5443
  const scale = 384 / 705.526;

  return (
    <div className="drop-shadow-[2px_-4px_2px_rgba(0,0,0,0.25)] h-[548.043px] relative w-[550px] overflow-visible" data-name="picture">
      <motion.div
        initial={{ scale: 1.4, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="size-full">
        <Frame8 />
      </motion.div>
      <motion.div
        initial={{ scale: 1.4, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0.36, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[268.666px] items-center justify-center left-[calc(50%+1.61px)] top-[calc(50%-26.86px)] w-[384.68px] overflow-visible" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "20" } as React.CSSProperties}>
        <div className="flex-none overflow-visible">
          {brainSceneState ? (
            <div className="overflow-visible" style={{ width: '384px', height: `${476.377 * scale * 0.9}px` }}>
              <div style={{ transform: `translateY(90px) scale(${scale * 0.9})`, transformOrigin: 'top left' }}>
                <Unit13BrainScene
                  pathWidths={brainSceneState.pathWidths}
                  pathColors={brainSceneState.pathColors}
                  cellColors={brainSceneState.cellColors}
                />
              </div>
            </div>
          ) : (
            <BrainScene />
          )}
        </div>
      </motion.div>
    </div>
  );
}

function Flatten() {
  return (
    <motion.div
      initial={{ scale: 3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 1 }}
      className="absolute h-[174px] left-[457px] top-[508px] w-[173px]" data-name="flatten">
      <div className="absolute inset-[0.57%_2.89%_3.45%_0.58%]">
        <div className="absolute inset-[-0.29%_-2.69%_-2.69%_-0.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 171.979 171.979">
            <g filter="url(#filter0_d_24_147)" id="Star 5">
              <path d={svgPaths.p173d0880} fill="var(--fill-0, #D9D9D9)" fillOpacity="0.01" shapeRendering="crispEdges" />
              <path d={svgPaths.p173d0880} shapeRendering="crispEdges" stroke="var(--stroke-0, #B9B9B9)" strokeWidth="0.88143" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="171.979" id="filter0_d_24_147" width="171.979" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dx="2" dy="2" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_24_147" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_24_147" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute inset-[2.47%_4.8%_5.35%_2.49%]">
        <div className="absolute inset-[-0.31%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 161.371 161.371">
            <path d={svgPaths.p4f06f00} id="Star 6" stroke="var(--stroke-0, #B9B9B9)" strokeWidth="0.88143" />
          </svg>
        </div>
      </div>
      <div className="absolute flex inset-[13.19%_15.67%_27.23%_13.36%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-0.43%_-0.36%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 123.653 104.544">
                <path d={svgPaths.pa8b8500} id="Vector" stroke="var(--stroke-0, #B9B9B9)" strokeWidth="0.88143" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[27.67%_21.09%_54.83%_29.26%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[0_0.99%_0.77%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85.0453 30.2007">
                <path clipRule="evenodd" d={svgPaths.p55c4000} fill="var(--fill-0, #B9B9B9)" fillRule="evenodd" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[22.23%_62.15%_71.76%_29.34%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <div className="relative size-full" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.7088 10.4555">
              <path clipRule="evenodd" d={svgPaths.p257a5800} fill="var(--fill-0, #B9B9B9)" fillRule="evenodd" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute font-normal inset-[67.95%_39.16%_15.96%_20.96%] leading-[0] not-italic text-[#b9b9b9] text-[14.638px] uppercase whitespace-nowrap">
        <p className="leading-[13.662px] mb-0 whitespace-pre">{`brain  `}</p>
        <p className="leading-[13.662px] whitespace-pre">{`       city`}</p>
      </div>
    </motion.div>
  );
}

function Frame2() {
  return (
    <div className="h-[84px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-0.5px] pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="flex items-center justify-center px-[20px] relative size-full">
          <img alt="大脑塑造检测报告" className="block h-auto max-h-[70%] max-w-full object-contain" src={reportTitle} />
        </div>
      </div>
    </div>
  );
}

function TagPill({ tagKey }: { tagKey: BrainTagKey }) {
  const { color, label } = BRAIN_TAG_META[tagKey];

  return (
    <div
      className="content-stretch flex h-[33.8px] items-center justify-center p-[9.301px] relative rounded-[92.084px] shrink-0"
      data-name={`tag-${tagKey}`}
      style={{ backgroundColor: color }}
    >
      <p className="font-normal leading-[52.088px] not-italic relative shrink-0 text-[22.323px] text-white whitespace-nowrap">{label}</p>
    </div>
  );
}

const TOP_TAG_COPY: Record<BrainTagKey, { title: string; coreAction: string; extensionActivity: string }> = {
  hand: {
    title: "巧手精细达人",
    coreAction: "弹钢琴、绘画",
    extensionActivity: "手工 DIY、书法练字这类锻炼手部灵活度的活动",
  },
  motor: {
    title: "肢体协调达人",
    coreAction: "打篮球",
    extensionActivity: "舞蹈、羽毛球这类锻炼肢体律动的活动",
  },
  vision: {
    title: "视觉空间达人",
    coreAction: "绘画、打篮球",
    extensionActivity: "摄影、模型拼装这类锻炼方位感知与立体想象的活动",
  },
  lang: {
    title: "语言表达达人",
    coreAction: "演讲",
    extensionActivity: "写作、辩论、配音这类锻炼语言组织的活动",
  },
  audio: {
    title: "听觉感知达人",
    coreAction: "弹钢琴、演讲",
    extensionActivity: "听歌识曲、听有声书这类锻炼听觉辨识的活动",
  },
  logic: {
    title: "逻辑推理达人",
    coreAction: "解谜",
    extensionActivity: "桌游、编程、数独这类锻炼思考推演与判断分析的活动",
  },
  creative: {
    title: "创意联想达人",
    coreAction: "绘画、解谜",
    extensionActivity: "写作、涂鸦、手工这类锻炼脑洞联想、灵感发散的活动",
  },
  brain: {
    title: "达人",
    coreAction: "弹钢琴",
    extensionActivity: "乐器弹奏、益智游戏这类需要双手合作的活动",
  },
};

function getTopTagCopy(brainSceneState?: BrainSceneState | null) {
  const topTag = brainSceneState ? getTopTagsFromPathWidths(brainSceneState.pathWidths, 1)[0] : undefined;
  return topTag ? TOP_TAG_COPY[topTag] : undefined;
}

function TagContainer({ brainSceneState }: { brainSceneState?: BrainSceneState | null }) {
  const topTags = brainSceneState ? getTopTagsFromPathWidths(brainSceneState.pathWidths) : [];

  return (
    <div className="content-stretch flex gap-[18.603px] items-center relative shrink-0" data-name="tag-container">
      {topTags.map((tagKey, i) => (
        <motion.div
          key={tagKey}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 + i * 0.15 }}
        >
          <TagPill tagKey={tagKey} />
        </motion.div>
      ))}
    </div>
  );
}

function Frame({ brainSceneState }: { brainSceneState?: BrainSceneState | null }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#252525] text-[24px] w-[min-content]">最强通路 Top 2:</p>
      <TagContainer brainSceneState={brainSceneState} />
    </div>
  );
}

function TypeWriter({
  segments,
  speed = 60,
  delay = 0,
  showCursor = true,
}: {
  segments: { text: string; className?: string }[];
  speed?: number;
  delay?: number;
  showCursor?: boolean;
}) {
  const flatText = segments.map((s) => s.text).join("");
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= flatText.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? delay : speed);
    return () => clearTimeout(t);
  }, [visible, flatText.length, speed, delay]);

  let charCount = 0;
  return (
    <span className="text-type">
      {segments.map((seg, i) => {
        const start = charCount;
        const end = Math.min(charCount + seg.text.length, visible);
        charCount += seg.text.length;
        const shown = seg.text.slice(0, Math.max(0, end - start));
        if (!shown) return null;
        return (
          <span key={i} className={seg.className}>
            {shown}
          </span>
        );
      })}
      {showCursor && visible < flatText.length && (
        <span className="text-type__cursor">|</span>
      )}
    </span>
  );
}

function Frame3({ brainSceneState }: { brainSceneState?: BrainSceneState | null }) {
  const topTagCopy = getTopTagCopy(brainSceneState);

  const p1Segments = useMemo(() => [
    { text: '恭喜你！塑造成了', className: 'leading-[40px] text-[20px]' },
    { text: '「', className: 'font-bold leading-[40px] text-[28px]' },
    { text: topTagCopy?.title ?? '达人', className: 'font-bold leading-[40px] text-[28px]' },
    { text: '」', className: 'font-bold leading-[40px] text-[28px]' },
    { text: '，', className: 'leading-[40px] text-[20px]' },
  ], [topTagCopy]);

  const p2Segments = useMemo(() => [
    { text: '除了', className: 'leading-[40px] text-[20px]' },
    { text: topTagCopy?.coreAction ?? '核心行为', className: 'leading-[40px] text-[20px]' },
    { text: '，', className: 'leading-[40px] text-[20px]' },
    { text: topTagCopy?.extensionActivity ?? '拓展活动', className: 'leading-[40px] text-[20px] underline' },
    { text: '，也能强化你的专属神经通路；同时，这样的你在学习同类技能活动时，会比别人更擅长、学得更快。', className: 'leading-[40px] text-[20px]' },
  ], [topTagCopy]);

  return (
    <div className='content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[404px]'>
      <Frame brainSceneState={brainSceneState} />
      <div className='font-normal not-italic relative shrink-0 text-[#252525] w-full'>
        <p className='mb-0'>
          <TypeWriter segments={p1Segments} speed={60} delay={1500} />
        </p>
        <p className='text-[20px]'>
          <TypeWriter segments={p2Segments} speed={60} delay={2200} />
        </p>
      </div>
    </div>
  );
}

function Frame4({ brainSceneState }: { brainSceneState?: BrainSceneState | null }) {
  return (
    <div className="h-[388px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-0.5px] pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[99px] pl-[21px] pr-[19px] pt-[26px] relative size-full">
          <Frame3 brainSceneState={brainSceneState} />
        </div>
      </div>
    </div>
  );
}

function Frame5({ brainSceneState }: { brainSceneState?: BrainSceneState | null }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame2 />
      <Frame4 brainSceneState={brainSceneState} />
    </div>
  );
}

function Frame1() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 7}}
      className="bg-white relative w-full">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-0.5px] pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[12px] relative size-full">
          <p className="font-normal leading-[0] not-italic relative shrink-0 text-[#252525] text-[16px] w-[424px]">
            <span className="leading-[24px]">结语: 每一次活动都是对大脑的'锻炼和塑造',  持之以恒让神经通路愈发'强壮' —— </span>
            <span className="font-bold leading-[24px]">神经可塑性, 就藏在你的每一次努力里。</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Frame6({ brainSceneState }: { brainSceneState?: BrainSceneState | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      className="absolute content-stretch flex flex-col gap-[18px] items-start left-[645px] top-[77px] w-[444.503px]">
      <Frame5 brainSceneState={brainSceneState} />
      <div className="flex h-[76.301px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "20" } as React.CSSProperties}>
        <div className="flex-none rotate-[-0.17deg] w-full">
          <Frame1 />
        </div>
      </div>
    </motion.div>
  );
}

function Close({ onClick }: { onClick?: () => void }) {
  return (
    <div className="absolute h-[68px] left-[1057px] top-[28px] w-[67px] cursor-pointer" data-name="close" onClick={onClick}>
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 67 68">
        <g id="close">
          <rect fill="var(--fill-0, white)" height="66" rx="32.5" width="65" x="1" y="1" />
          <rect height="66" rx="32.5" stroke="var(--stroke-0, black)" strokeWidth="2" width="65" x="1" y="1" />
          <path d={svgPaths.p2a89bd00} fill="var(--fill-0, #333333)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Frame7({ brainSceneState, onClose }: { brainSceneState?: BrainSceneState | null; onClose?: () => void }) {
  return (
    <div className="relative bg-[#d9d9d9] h-[691px] rounded-[12px] w-[1149px] overflow-visible">
      <div className="absolute flex h-[575.281px] items-center justify-center left-[30.25px] top-[47.95px] w-[577.136px] overflow-visible" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "100" } as React.CSSProperties}>
        <div className="flex-none rotate-[2.91deg] overflow-visible">
          <Picture brainSceneState={brainSceneState} />
        </div>
      </div>
      <Flatten />
      <Frame6 brainSceneState={brainSceneState} />
      <Close onClick={onClose} />
    </div>
  );
}

export default function Page({ brainSceneState, onClose }: { brainSceneState?: BrainSceneState | null; onClose?: () => void }) {
  return (
    <div className="bg-[#373737] flex items-center justify-center min-h-screen overflow-auto p-6" data-name="page2">
      <style>{`
        .text-type { white-space: pre-wrap; }
        .text-type__cursor { margin-left: 2px; animation: blink 0.5s step-end infinite; color: inherit; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
      <Frame7 brainSceneState={brainSceneState} onClose={onClose} />
    </div>
  );
}