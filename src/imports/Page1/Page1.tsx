import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "./svg-e7qsg400mz";
import promptActionToolMode from "../../assets/prompt-action-toolMode.svg";
import promptActionCursorMode from "../../assets/prompt-action-cursorMode.svg";
import iconStop from "../../assets/icon-stop.svg";
import iconClose from "../../assets/icon-close.svg";
import iconContinue from "../../assets/icon-continue.svg";

export { svgPaths };

// 全局加粗系数
const BASE_SCALE = 3;
const INITIAL_PATH_WIDTH = 0.4;

// 路径等级定义
const LEVEL_WALK = { min: INITIAL_PATH_WIDTH, max: 2 };
const LEVEL_ROAD = { min: 2, max: 12 };
const LEVEL_HIGHWAY = { min: 12, max: 22 };

export type BrainTagKey = "hand" | "audio" | "brain" | "motor" | "vision" | "creative" | "lang" | "logic";

export const BRAIN_TAG_META: Record<BrainTagKey, { label: string; color: string }> = {
  hand: { label: "手部精细运动通路", color: "#00A79A" },
  audio: { label: "听觉反馈通路", color: "#439A42" },
  brain: { label: "左右脑协调通路", color: "#F8BF00" },
  motor: { label: "运动控制通路", color: "#FE6B1F" },
  vision: { label: "视觉处理通路", color: "#9500FF" },
  creative: { label: "创造性思维通路", color: "#E14757" },
  lang: { label: "语言处理通路", color: "#DC5CA3" },
  logic: { label: "逻辑推理通路", color: "#208FDF" },
};

export const BRAIN_TAG_PATH_GROUPS: Record<BrainTagKey, string[]> = {
  hand: ["path-hand-1", "path-hand-2"],
  audio: ["path-audio"],
  brain: ["path-brain-1", "path-brain-2"],
  motor: ["path-motor-1", "path-motor-2"],
  vision: ["path-vision-1", "path-vision-2"],
  creative: ["path-creative-1", "path-creative-2", "path-creative-3"],
  lang: ["path-lang"],
  logic: ["path-logic"],
};

const BRAIN_TAG_PRIORITY: BrainTagKey[] = ["hand", "audio", "brain", "motor", "vision", "creative", "lang", "logic"];

export function getTopTagsFromPathWidths(pathWidths: Record<string, number>, limit = 2): BrainTagKey[] {
  return BRAIN_TAG_PRIORITY
    .map((tagKey) => {
      const widths = BRAIN_TAG_PATH_GROUPS[tagKey].map((pathId) => pathWidths[pathId] ?? INITIAL_PATH_WIDTH);
      const totalWidth = widths.reduce((sum, width) => sum + width, 0);
      const maxWidth = widths.reduce((max, width) => Math.max(max, width), INITIAL_PATH_WIDTH);

      return { tagKey, totalWidth, maxWidth };
    })
    .sort((a, b) => {
      if (b.totalWidth !== a.totalWidth) return b.totalWidth - a.totalWidth;
      if (b.maxWidth !== a.maxWidth) return b.maxWidth - a.maxWidth;
      return BRAIN_TAG_PRIORITY.indexOf(a.tagKey) - BRAIN_TAG_PRIORITY.indexOf(b.tagKey);
    })
    .slice(0, limit)
    .map(({ tagKey }) => tagKey);
}

// 路径激活颜色映射
const PATH_COLORS: Record<string, string> = {
  "path-motor-1": "#FE6B1F",
  "path-motor-2": "#FE6B1F",
  "path-vision-1": "#9500FF",
  "path-vision-2": "#9500FF",
  "path-hand-1": "#00A79A",
  "path-hand-2": "#00A79A",
  "path-audio": "#439A42",
  "path-brain-1": "#F8BF00",
  "path-brain-2": "#F8BF00",
  "path-creative-1": "#E14757",
  "path-creative-2": "#E14757",
  "path-creative-3": "#E14757",
  "path-lang": "#DC5CA3",
  "path-logic": "#208FDF",
};

// 判断路径等级
function getPathLevel(width: number): "walk" | "road" | "highway" {
  if (width < LEVEL_ROAD.min) return "walk";
  if (width < LEVEL_HIGHWAY.min) return "road";
  return "highway";
}

// 行为 → 通路绑定规则
const ACTION_PATH_CONFIG: Record<string, Record<string, number>> = {
  basketball: {
    "path-motor-1": 0.3,
    "path-motor-2": 0.3,
    "path-vision-1": 0.2,
    "path-vision-2": 0.2,
  },
  piano: {
    "path-hand-1": 0.3,
    "path-hand-2": 0.3,
    "path-audio": 0.2,
    "path-brain-1": 0.1,
    "path-brain-2": 0.1,
  },
  drawing: {
    "path-hand-1": 0.2,
    "path-hand-2": 0.2,
    "path-vision-1": 0.2,
    "path-vision-2": 0.2,
    "path-creative-1": 0.1,
    "path-creative-2": 0.1,
    "path-creative-3": 0.1,
  },
  speech: {
    "path-lang": 0.3,
    "path-audio": 0.2,
  },
  puzzle: {
    "path-logic": 0.3,
    "path-creative-1": 0.1,
    "path-creative-2": 0.1,
    "path-creative-3": 0.1,
  },
};

// other 类路径绑定规则（介入程度统一为 0.1）
const ACTION_OTHER_CONFIG: Record<string, string[]> = {
  basketball: ["other-right"],
  piano: ["other-mid"],
  drawing: ["other-right", "other-mid"],
  speech: ["other-left"],
  puzzle: ["other-left"],
};

// 道路 → 胞体 cell 关联映射
const PATH_TO_CELLS: Record<string, string[]> = {
  "path-hand-1": ["cell-09", "cell-15"],
  "path-hand-2": ["cell-08", "cell-06"],
  "path-motor-1": ["cell-13", "cell-15"],
  "path-motor-2": ["cell-02", "cell-10"],
  "path-vision-1": ["cell-12", "cell-15"],
  "path-vision-2": ["cell-09", "cell-12"],
  "path-lang": ["cell-02", "cell-04", "cell-06"],
  "path-audio": ["cell-07", "cell-13", "cell-14"],
  "path-logic": ["cell-01", "cell-02", "cell-07"],
  "path-creative-1": ["cell-07", "cell-08", "cell-13"],
  "path-creative-2": ["cell-01", "cell-02"],
  "path-creative-3": ["cell-03", "cell-08"],
  "path-brain-1": ["cell-07", "cell-08", "cell-11"],
  "path-brain-2": ["cell-08", "cell-09"],
};

// HSL 颜色转换函数
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }

  const toHex = (val: number) => {
    const hex = Math.round((val + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getStrokeColorFromFill(fillColor: string): string {
  const hsl = hexToHSL(fillColor);
  return hslToHex((hsl.h + 12) % 360, hsl.s, Math.min(hsl.l + 20, 100));
}

export function Background({ isBlurActive = false, showVector1 = true }: { isBlurActive?: boolean; showVector1?: boolean }) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[1332.462px] left-[calc(50%+191.17px)] top-[calc(50%+123.23px)] w-[1460.344px]" data-name="background">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1460.34 1332.46">
        <style>{`
          @keyframes bg-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.06); }
          }
        `}</style>
        <g id="background">
          <g style={{ transformOrigin: "730px 666px", animation: "bg-pulse 6s ease-in-out infinite" }}>
            <path d={svgPaths.p10f1d780} fill="var(--fill-0, black)" fillOpacity="0.05" id="Vector 135" />
          </g>
          <g style={{ transformOrigin: "730px 666px", animation: "bg-pulse 8s ease-in-out infinite" }}>
            <path d={svgPaths.p25a7a680} fill="var(--fill-0, white)" fillOpacity="0.5" id="Vector 134" />
          </g>
          {showVector1 && (
            <>
              <g filter="url(#filter-default-2)" opacity={isBlurActive ? 0 : 1} style={{ transition: "opacity 0.8s ease-out" }}>
                <path d={svgPaths.p2976d580} fill="var(--fill-0, #E2E2E2)" />
                <path d={svgPaths.p2976d580} stroke="var(--stroke-0, #252525)" strokeWidth="2" />
              </g>
              <g filter="url(#filter-click-0.1)" opacity={isBlurActive ? 0.8 : 0} style={{ transition: "opacity 0.8s ease-out" }}>
                <path d={svgPaths.p2976d580} fill="var(--fill-0, #E2E2E2)" />
                <path d={svgPaths.p2976d580} stroke="var(--stroke-0, #252525)" strokeWidth="2" />
              </g>
            </>
          )}
        </g>
        {showVector1 && (
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1193" id="filter-default-2" width="1271" x="111" y="63">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="25" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_439" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_439" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1193" id="filter-click-0.1" width="1271" x="111" y="63">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="10" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_439" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_439" mode="normal" result="shape" />
            </filter>
          </defs>
        )}
      </svg>
    </div>
  );
}

export function BrainScene({
  pathWidths,
  pathColors,
  cellColors,
  flashingPaths = new Set()
}: {
  pathWidths: Record<string, number>;
  pathColors: Record<string, string>;
  cellColors: Record<string, { fill: string; stroke: string }>;
  flashingPaths?: Set<string>;
}) {
  // 计算路径样式
  const getPathStyle = (pathId: string) => {
    const width = pathWidths[pathId] || INITIAL_PATH_WIDTH;
    const level = getPathLevel(width);
    const color = pathColors[pathId] || "#000000";

    const opacityMap = { walk: 0.5, road: 0.7, highway: 1 };

    return {
      stroke: color,
      strokeWidth: width,
      opacity: opacityMap[level],
    };
  };

  // 闪烁动画样式
  const getFlashStyle = (pathId: string) => {
    if (flashingPaths.has(pathId)) {
      return { animation: "path-flash 0.8s ease-out" };
    }
    return {};
  };

  // 判断车道线是否可见（只在 highway 等级显示）
  const isLineVisible = (pathId: string) => {
    const width = pathWidths[pathId] || INITIAL_PATH_WIDTH;
    return getPathLevel(width) === "highway";
  };

  // 渲染 other 类路径的辅助函数
  const renderOtherPath = (id: string, pathData: string, fillNone = false) => {
    const width = pathWidths[id] || INITIAL_PATH_WIDTH;
    const level = getPathLevel(width);
    const opacity = level === "walk" ? 0.5 : 0.7;

    return (
      <path
        d={pathData}
        id={id}
        fill={fillNone ? "none" : undefined}
        stroke="#000000"
        strokeLinecap="round"
        strokeWidth={width}
        opacity={opacity}
        style={{ transition: "all 0.3s ease-out", ...getFlashStyle(id) }}
      />
    );
  };

  // 获取 cell 颜色
  const getCellColors = (cellId: string) => {
    return cellColors[cellId] || { fill: "#93E758", stroke: "#D5FC74" };
  };
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[476.377px] left-[calc(50%+177.66px)] top-[calc(50%+9.94px)] w-[705.526px] overflow-visible" data-name="brain-scene">
      <style>{`
	        @keyframes path-flash {
	          0% { opacity: 0.3; }
	          50% { opacity: 1; }
	          100% { opacity: inherit; }
	        }
      `}</style>
      <div className="absolute inset-[0_-4.55%_-8.76%_0] overflow-visible">
        <svg className="block size-full mx-[0px] mt-[0px] mb-[0px]" fill="none" preserveAspectRatio="none" viewBox="0 0 750 530" overflow="visi mx-[0px] mt-[200px] mb-[0px]ble">
          <g id="brain-scene">
            {renderOtherPath("other-mid-10", svgPaths.p8597880)}
            {renderOtherPath("other-mid-9", svgPaths.p2d471f00)}
            {renderOtherPath("other-mid-8", svgPaths.p1a7c2480, true)}
            {renderOtherPath("other-mid-7", svgPaths.p332d3400)}
            {renderOtherPath("other-mid-6", svgPaths.p1db44100)}
            {renderOtherPath("other-mid-5", svgPaths.p1fd7dac0)}
            {renderOtherPath("other-mid-4", svgPaths.p18423600)}
            {renderOtherPath("other-mid-3", svgPaths.p14da9740)}
            {renderOtherPath("other-mid-2", svgPaths.p36635400)}
            {renderOtherPath("other-mid-1", svgPaths.p2182ed00)}
            {renderOtherPath("other-left-9", svgPaths.p33516d40)}
            {renderOtherPath("other-left-8", svgPaths.p1b107500)}
            {renderOtherPath("other-left-7", svgPaths.p2821ef60)}
            {renderOtherPath("other-left-6", svgPaths.p1e741b00)}
            {renderOtherPath("other-left-5", svgPaths.p24303300)}
            {renderOtherPath("other-left-4", svgPaths.p34c58900)}
            {renderOtherPath("other-left-3", svgPaths.p2891c820)}
            {renderOtherPath("other-left-2", svgPaths.p236825f0)}
            {renderOtherPath("other-left-1", svgPaths.p3a2ea500)}
            {renderOtherPath("other-right-10", svgPaths.p3f58d80)}
            {renderOtherPath("other-right-9", svgPaths.p765040)}
            {renderOtherPath("other-right-8", svgPaths.p16283a80)}
            {renderOtherPath("other-right-7", svgPaths.p4da46c0)}
            {renderOtherPath("other-right-6", svgPaths.p3dd5e800, true)}
            {renderOtherPath("other-right-5", svgPaths.p2f1b5ee0)}
            {renderOtherPath("other-right-4", svgPaths.p162f7240)}
            {renderOtherPath("other-right-3", svgPaths.p2ff640)}
            {renderOtherPath("other-right-2", svgPaths.p3b7e7500)}
            {renderOtherPath("other-right-1", svgPaths.p3a525980)}
            <path d={svgPaths.p33996e00} id="path-brain-2" strokeLinecap="round" {...getPathStyle("path-brain-2")} style={{ transition: "all 0.3s ease-out", ...getFlashStyle("path-brain-2") }} />
            <path d={svgPaths.p2fd60800} id="path-brain-1" strokeLinecap="round" {...getPathStyle("path-brain-1")} style={{ transition: "all 0.3s ease-out", ...getFlashStyle("path-brain-1") }} />
            <path d={svgPaths.p3fd19e00} id="path-creative-3" strokeLinecap="round" {...getPathStyle("path-creative-3")} style={{ transition: "all 0.3s ease-out", ...getFlashStyle("path-creative-3") }} />
            <path d={svgPaths.p8cc500} id="path-creative-2" strokeLinecap="round" {...getPathStyle("path-creative-2")} style={{ transition: "all 0.3s ease-out", ...getFlashStyle("path-creative-2") }} />
            <path d={svgPaths.p22f1500} id="path-creative-1" strokeLinecap="round" {...getPathStyle("path-creative-1")} style={{ transition: "all 0.3s ease-out", ...getFlashStyle("path-creative-1") }} />
            <path d={svgPaths.p34a86700} id="path-logic" strokeLinecap="round" {...getPathStyle("path-logic")} style={{ transition: "all 0.3s ease-out", ...getFlashStyle("path-logic") }} />
            <path d={svgPaths.p3517f880} id="path-audio" strokeLinecap="round" {...getPathStyle("path-audio")} style={{ transition: "all 0.3s ease-out", ...getFlashStyle("path-audio") }} />
            <path d={svgPaths.p2ec41080} id="path-lang" strokeLinecap="round" {...getPathStyle("path-lang")} style={{ transition: "all 0.3s ease-out", ...getFlashStyle("path-lang") }} />
            <path d={svgPaths.p2fcfd780} id="path-vision-2" strokeLinecap="round" {...getPathStyle("path-vision-2")} style={{ transition: "all 0.3s ease-out", ...getFlashStyle("path-vision-2") }} />
            <path d={svgPaths.p251d6c00} id="path-vision-1" strokeLinecap="round" {...getPathStyle("path-vision-1")} style={{ transition: "all 0.3s ease-out", ...getFlashStyle("path-vision-1") }} />
            <path d={svgPaths.p2886ac0} id="path-motor-2" strokeLinecap="round" {...getPathStyle("path-motor-2")} style={{ transition: "all 0.3s ease-out", ...getFlashStyle("path-motor-2") }} />
            <path d={svgPaths.p4e72540} id="path-motor-1" strokeLinecap="round" {...getPathStyle("path-motor-1")} style={{ transition: "all 0.3s ease-out", ...getFlashStyle("path-motor-1") }} />
            <path d={svgPaths.p26e67a00} id="path-hand-2" strokeLinecap="round" {...getPathStyle("path-hand-2")} style={{ transition: "all 0.3s ease-out", ...getFlashStyle("path-hand-2") }} />
            <path d={svgPaths.p3fe8cc00} id="path-hand-1" strokeLinecap="round" {...getPathStyle("path-hand-1")} style={{ transition: "all 0.3s ease-out", ...getFlashStyle("path-hand-1") }} />
            <path d={svgPaths.p11c72480} id="path-brain-2-line" opacity={isLineVisible("path-brain-2") ? 1 : 0} stroke="white" strokeDasharray="8 12" strokeWidth="2.5" style={{ transition: "opacity 0.3s ease-out" }} />
            <path d={svgPaths.p320f9980} id="path-brain-1-line" opacity={isLineVisible("path-brain-1") ? 1 : 0} stroke="white" strokeDasharray="8 12" strokeWidth="2.5" style={{ transition: "opacity 0.3s ease-out" }} />
            <path d={svgPaths.p294e63c0} id="path-creative-3-line" opacity={isLineVisible("path-creative-3") ? 1 : 0} stroke="white" strokeDasharray="8 12" strokeWidth="2.5" style={{ transition: "opacity 0.3s ease-out" }} />
            <path d={svgPaths.p3ad15080} id="path-creative-2-line" opacity={isLineVisible("path-creative-2") ? 1 : 0} stroke="white" strokeLinecap="round" strokeDasharray="8 12" strokeWidth="2.5" style={{ transition: "opacity 0.3s ease-out" }} />
            <path d={svgPaths.p22f1500} id="path-creative-1-line" opacity={isLineVisible("path-creative-1") ? 1 : 0} stroke="white" strokeDasharray="8 12" strokeWidth="2.5" style={{ transition: "opacity 0.3s ease-out" }} />
            <path d={svgPaths.p2665d700} id="path-lang-line" opacity={isLineVisible("path-lang") ? 1 : 0} stroke="white" strokeDasharray="8 12" strokeWidth="2.5" style={{ transition: "opacity 0.3s ease-out" }} />
            <path d={svgPaths.p1ed71600} id="path-audio-line" opacity={isLineVisible("path-audio") ? 1 : 0} stroke="white" strokeDasharray="8 12" strokeWidth="2.5" style={{ transition: "opacity 0.3s ease-out" }} />
            <path d={svgPaths.p5328b00} id="path-logic-line" opacity={isLineVisible("path-logic") ? 1 : 0} stroke="white" strokeDasharray="8 12" strokeWidth="2.5" style={{ transition: "opacity 0.3s ease-out" }} />
            <path d={svgPaths.p2fcfd780} id="path-vision-2-line" opacity={isLineVisible("path-vision-2") ? 1 : 0} stroke="white" strokeDasharray="8 12" strokeWidth="2.5" style={{ transition: "opacity 0.3s ease-out" }} />
            <path d={svgPaths.p10340280} id="path-vision-1-line" opacity={isLineVisible("path-vision-1") ? 1 : 0} stroke="white" strokeDasharray="8 12" strokeWidth="2.5" style={{ transition: "opacity 0.3s ease-out" }} />
            <path d={svgPaths.p2b489100} id="path-motor-2-line" opacity={isLineVisible("path-motor-2") ? 1 : 0} stroke="white" strokeDasharray="8 12" strokeWidth="2.5" style={{ transition: "opacity 0.3s ease-out" }} />
            <path d={svgPaths.p1394b300} id="path-motor-1-line" opacity={isLineVisible("path-motor-1") ? 1 : 0} stroke="white" strokeDasharray="8 12" strokeWidth="2.5" style={{ transition: "opacity 0.3s ease-out" }} />
            <path d={svgPaths.p3ca70900} id="path-hand-2-line" opacity={isLineVisible("path-hand-2") ? 1 : 0} stroke="white" strokeDasharray="8 12" strokeWidth="2.5" style={{ transition: "opacity 0.3s ease-out" }} />
            <path d={svgPaths.p886d980} id="path-hand-1-line" opacity={isLineVisible("path-hand-1") ? 1 : 0} stroke="white" strokeDasharray="8 12" strokeWidth="2.5" style={{ transition: "opacity 0.3s ease-out" }} />
            <circle cx="688.483" cy="459.335" fill={getCellColors("cell-15").fill} id="cell-15" r="14.4646" stroke={getCellColors("cell-15").stroke} strokeWidth="5.15531" style={{ transition: "all 0.3s ease-out", ...getFlashStyle("cell-15") }} />
            <circle cx="21.2249" cy="21.2249" fill={getCellColors("cell-14").fill} id="cell-14" r="18.6472" stroke={getCellColors("cell-14").stroke} strokeWidth="5.15531" transform="matrix(1 0 0 -1 539.69 395.083)" style={{ transition: "all 0.3s ease-out", ...getFlashStyle("cell-14") }} />
            <circle cx="21.2249" cy="21.2249" fill={getCellColors("cell-13").fill} id="cell-13" r="18.6472" stroke={getCellColors("cell-13").stroke} strokeWidth="5.15531" transform="matrix(1 0 0 -1 420.229 463.516)" style={{ transition: "all 0.3s ease-out", ...getFlashStyle("cell-13") }} />
            <circle cx="688.483" cy="192.746" fill={getCellColors("cell-12").fill} id="cell-12" r="14.4646" stroke={getCellColors("cell-12").stroke} strokeWidth="5.15531" style={{ transition: "all 0.3s ease-out", ...getFlashStyle("cell-12") }} />
            <circle cx="543.883" cy="287.66" fill={getCellColors("cell-11").fill} id="cell-11" r="14.4646" stroke={getCellColors("cell-11").stroke} strokeWidth="5.15531" style={{ transition: "all 0.3s ease-out", ...getFlashStyle("cell-11") }} />
            <circle cx="590.622" cy="98.9325" fill={getCellColors("cell-10").fill} id="cell-10" r="14.4646" stroke={getCellColors("cell-10").stroke} strokeWidth="5.15531" style={{ transition: "all 0.3s ease-out", ...getFlashStyle("cell-10") }} />
            <circle cx="479.736" cy="181.402" fill={getCellColors("cell-09").fill} id="cell-09" r="14.4646" stroke={getCellColors("cell-09").stroke} strokeWidth="5.15531" style={{ transition: "all 0.3s ease-out", ...getFlashStyle("cell-09") }} />
            <circle cx="21.2249" cy="21.2249" fill={getCellColors("cell-08").fill} id="cell-08" r="18.6472" stroke={getCellColors("cell-08").stroke} strokeWidth="5.15531" transform="matrix(1 0 0 -1 355.244 328.682)" style={{ transition: "all 0.3s ease-out", ...getFlashStyle("cell-08") }} />
            <circle cx="281.066" cy="390.903" fill={getCellColors("cell-07").fill} id="cell-07" r="14.4646" stroke={getCellColors("cell-07").stroke} strokeWidth="5.15531" style={{ transition: "all 0.3s ease-out", ...getFlashStyle("cell-07") }} />
            <circle cx="21.2249" cy="21.2249" fill={getCellColors("cell-06").fill} id="cell-06" r="18.6472" stroke={getCellColors("cell-06").stroke} strokeWidth="5.15531" transform="matrix(1 0 0 -1 406.048 42.4498)" style={{ transition: "all 0.3s ease-out", ...getFlashStyle("cell-06") }} />
            <circle cx="327.44" cy="181.403" fill={getCellColors("cell-05").fill} id="cell-05" r="18.6472" stroke={getCellColors("cell-05").stroke} strokeWidth="5.15531" style={{ transition: "all 0.3s ease-out", ...getFlashStyle("cell-05") }} />
            <circle cx="264.027" cy="81.8914" fill={getCellColors("cell-04").fill} id="cell-04" r="14.4646" stroke={getCellColors("cell-04").stroke} strokeWidth="5.15531" style={{ transition: "all 0.3s ease-out", ...getFlashStyle("cell-04") }} />
            <circle cx="148.185" cy="235.828" fill={getCellColors("cell-03").fill} id="cell-03" r="14.4646" stroke={getCellColors("cell-03").stroke} strokeWidth="5.15531" style={{ transition: "all 0.3s ease-out", ...getFlashStyle("cell-03") }} />
            <circle cx="21.2249" cy="21.2249" fill={getCellColors("cell-02").fill} id="cell-02" r="18.6472" stroke={getCellColors("cell-02").stroke} strokeWidth="5.15531" transform="matrix(1 0 0 -1 88.6934 120.159)" style={{ transition: "all 0.3s ease-out", ...getFlashStyle("cell-02") }} />
            <circle cx="17.0423" cy="209.789" fill={getCellColors("cell-01").fill} id="cell-01" r="14.4646" stroke={getCellColors("cell-01").stroke} strokeWidth="5.15531" style={{ transition: "all 0.3s ease-out", ...getFlashStyle("cell-01") }} />
          </g>
        </svg>
      </div>
    </div>
  );
}

function FeedbackAnimation({ isAnimating }: { isAnimating: boolean }) {
  return (
    <div
      className={`absolute font-bold leading-[1.4] left-[465px] not-italic text-black top-[calc(50%+275px)] whitespace-nowrap transition-all duration-500 ease-out pointer-events-none ${
        isAnimating ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-50 translate-x-[-30px] translate-y-[30px]'
      }`}
      data-name="feedback animation"
    >
      <p className="text-[60px]">连接+1</p>
    </div>
  );
}

function Slot() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Slot">
      <p className="font-normal leading-[1.4] not-italic relative shrink-0 text-[14.4px] text-black text-center w-[122.4px]">太久不用的通路就要开始“荒废”了</p>
    </div>
  );
}

function Tooltip({ isVisible, isAnimating }: { isVisible: boolean; isAnimating: boolean }) {
  if (!isVisible) return null;

  return (
    <div
      className="absolute bg-white content-stretch drop-shadow-[0px_1px_2px_rgba(12,12,13,0.1),0px_1px_2px_rgba(12,12,13,0.05)] flex flex-col items-center left-[calc(50%+564.6px)] px-[14.4px] py-[9.6px] rounded-[9.6px] top-[calc(50%-206.4px)] transition-all duration-500"
      data-name="Tooltip"
      style={{
        transform: `translate(-50%, ${isAnimating ? '-50%' : 'calc(-50% + 20px)'})`,
        opacity: isAnimating ? 1 : 0,
        transitionProperty: 'opacity, transform'
      }}
    >
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[9.6px]" />
      <div className="-translate-x-1/2 absolute bottom-[-6.24px] flex items-center justify-center left-1/2 size-[13.576px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "20" } as React.CSSProperties}>
        <div className="flex-none rotate-45">
          <div className="relative size-[9.6px]" data-name="Beak">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6 9.6">
              <path d="M0 0H9.6V9.6H0V0Z" fill="var(--fill-0, white)" id="Beak" />
            </svg>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bottom-[-6.24px] flex items-center justify-center left-1/2 size-[13.576px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "20" } as React.CSSProperties}>
        <div className="flex-none rotate-45">
          <div className="relative size-[9.6px]" data-name="Beak (Stroke)">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6 9.6">
              <path clipRule="evenodd" d="M0 9.6H9.6V0H8.4V8.4H0V9.6Z" fill="var(--fill-0, #D9D9D9)" fillRule="evenodd" id="Beak (Stroke)" />
            </svg>
          </div>
        </div>
      </div>
      <Slot />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[44px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
        <g id="Frame">
          <path d={svgPaths.p3c9eaef0} id="Vector" stroke="var(--stroke-0, #333333)" strokeLinejoin="round" strokeWidth="3.66667" />
          <path d="M16.5 3.66667H27.5" id="Vector_2" stroke="var(--stroke-0, #333333)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.66667" />
          <path d="M22 17.4167V24.75" id="Vector_3" stroke="var(--stroke-0, #333333)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.66667" />
          <path d="M29.3333 24.75H22" id="Vector_4" stroke="var(--stroke-0, #333333)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.66667" />
          <path d="M22 3.66667V7.33333" id="Vector_5" stroke="var(--stroke-0, #333333)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.66667" />
        </g>
      </svg>
    </div>
  );
}

function Timer({ onTimerEnd, paused }: { onTimerEnd: () => void; paused: boolean }) {
  const [timeLeft, setTimeLeft] = useState(60);
  const onTimerEndRef = useRef(onTimerEnd);

  useEffect(() => { onTimerEndRef.current = onTimerEnd; }, [onTimerEnd]);

  useEffect(() => {
    if (paused || timeLeft <= 0) {
      if (timeLeft <= 0) onTimerEndRef.current();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newValue = Math.max(prev - 1, 0);
        if (newValue === 0) setTimeout(() => onTimerEndRef.current(), 100);
        return newValue;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, paused]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${String(minutes).padStart(2, '0')}：${String(seconds).padStart(2, '0')}`;
  const isBlinking = timeLeft <= 10 && timeLeft > 0;

  return (
    <div
      className={`bg-white content-stretch flex gap-[12px] items-center px-[20px] py-[12px] relative rounded-[99px] shrink-0 cursor-pointer ${isBlinking ? 'animate-blink-bg' : ''} ${paused ? 'opacity-50' : ''}`}
      data-name="Timer"
      onClick={() => { if (timeLeft > 10) setTimeLeft(10); }}
    >
      <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none rounded-[99px]" />
      <Frame />
      <p className="font-normal leading-[1.4] not-italic relative shrink-0 text-[30px] text-black whitespace-nowrap select-none">
        {timeString}
      </p>
    </div>
  );
}

function Close({ onStop, onClose, paused }: { onStop?: () => void; onClose?: () => void; paused?: boolean }) {
  const stopSrc = paused ? iconContinue : iconStop;
  return (
    <div className="bg-white border-2 border-black border-solid content-stretch flex flex-col items-center justify-center overflow-clip px-[5px] py-[20px] rounded-[99px] h-[68px] w-[68px] hover:h-[136px] transition-all duration-300 cursor-pointer group" data-name="close-button">
      <div className="shrink-0 size-[36px] mb-[34px] hidden group-hover:flex" data-name="stop" onClick={(e) => { e.stopPropagation(); onStop?.(); }}>
        <img alt="" className="block size-full" src={stopSrc} />
      </div>
      <div className="shrink-0 size-[27px]" data-name="close" onClick={(e) => { e.stopPropagation(); onClose?.(); }}>
        <img alt="" className="block size-full" src={iconClose} />
      </div>
    </div>
  );
}

function Toolbar({ onTimerEnd, onStop, onClose, paused }: { onTimerEnd: () => void; onStop?: () => void; onClose?: () => void; paused: boolean }) {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[18px] items-start h-[68px] right-[80px] top-[calc(50%-386px)]" data-name="toolbar">
      <Timer onTimerEnd={onTimerEnd} paused={paused} />
      <Close onStop={onStop} onClose={onClose} paused={paused} />
    </div>
  );
}

function PromptAction({ onPromptClick, mode = "tool" }: { onPromptClick: () => void; mode?: string }) {
  const src = mode === "tool" ? promptActionToolMode : promptActionCursorMode;
  const handleClick = mode === "tool" ? undefined : onPromptClick;
  return (
    <button
      onClick={handleClick}
      className={`-translate-y-1/2 absolute content-stretch flex h-[242px] items-center justify-center left-[80px] rounded-[12px] top-[calc(50%+299px)] w-[328px] ${mode === "tool" ? "cursor-default" : "cursor-pointer"}`}
      data-name="prompt-action"
    >
      <img alt="教具提示" className="block max-w-none size-full" src={src} />
    </button>
  );
}

function ActionTitle({ selectedAction }: { selectedAction: string }) {
  const actionTexts: { [key: string]: string } = {
    basketball: "打篮球",
    piano: "弹钢琴",
    drawing: "绘画",
    speech: "演讲",
    puzzle: "解谜"
  };

  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-end relative shrink-0 w-full whitespace-nowrap" data-name="action-title">
      <p className="font-bold relative shrink-0 text-[46px]">{actionTexts[selectedAction]}</p>
      <p className="font-normal relative shrink-0 text-[30px]">时，</p>
    </div>
  );
}


// Slide-in from left 动画变体
const slideInVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 }
};
function TextAction({ selectedAction }: { selectedAction: string }) {
  return (
    <motion.div
      key={selectedAction}
      variants={slideInVariants}
      initial="hidden"
      animate="visible"

      transition={{ duration: 0.5, ease: "easeOut" }}
      className="content-stretch flex flex-col gap-[4px] items-start justify-center leading-[1.4] not-italic relative shrink-0 text-black w-full" data-name="text-action">
      <ActionTitle selectedAction={selectedAction} />
      <p className="font-normal h-[21px] relative shrink-0 text-[30px] whitespace-nowrap w-[max-content]">被激活的神经通路：</p>
    </motion.div>
  );
}

function TagHand() {
  return (
    <div className="bg-[#00a79a] content-stretch flex h-[42px] items-center justify-center px-[11.627px] relative rounded-[115.105px] shrink-0" data-name="tag-hand">
      <p className="font-normal leading-[1.4] not-italic relative shrink-0 text-[28px] text-white whitespace-nowrap">手部精细运动通路</p>
    </div>
  );
}

function TagAudio() {
  return (
    <div className="bg-[#439a42] content-stretch flex h-[42px] items-center justify-center px-[11.627px] relative rounded-[115.105px] shrink-0" data-name="tag-audio">
      <p className="font-normal leading-[1.4] not-italic relative shrink-0 text-[28px] text-white whitespace-nowrap">听觉反馈通路</p>
    </div>
  );
}

function TagBrain() {
  return (
    <div className="bg-[#f8bf00] content-stretch flex h-[42px] items-center justify-center px-[11.627px] relative rounded-[115.105px] shrink-0" data-name="tag-brain">
      <p className="font-normal leading-[1.4] not-italic relative shrink-0 text-[28px] text-white whitespace-nowrap">左右脑协调通路</p>
    </div>
  );
}

function TagMotor() {
  return (
    <div className="bg-[#fe6b1f] content-stretch flex h-[42px] items-center justify-center px-[11.627px] relative rounded-[115.105px] shrink-0" data-name="tag-motor">
      <p className="font-normal leading-[1.4] not-italic relative shrink-0 text-[28px] text-white whitespace-nowrap">运动控制通路</p>
    </div>
  );
}

function TagVision() {
  return (
    <div className="bg-[#9500ff] content-stretch flex h-[42px] items-center justify-center px-[11.627px] relative rounded-[115.105px] shrink-0" data-name="tag-vision">
      <p className="font-normal leading-[1.4] not-italic relative shrink-0 text-[28px] text-white whitespace-nowrap">视觉处理通路</p>
    </div>
  );
}

function TagCreative() {
  return (
    <div className="bg-[#e14757] content-stretch flex h-[42px] items-center justify-center px-[11.627px] relative rounded-[115.105px] shrink-0" data-name="tag-creative">
      <p className="font-normal leading-[1.4] not-italic relative shrink-0 text-[28px] text-white whitespace-nowrap">创造性思维通路</p>
    </div>
  );
}

function TagLang() {
  return (
    <div className="bg-[#dc5ca3] content-stretch flex h-[42px] items-center justify-center px-[11.627px] relative rounded-[115.105px] shrink-0" data-name="tag-lang">
      <p className="font-normal leading-[1.4] not-italic relative shrink-0 text-[28px] text-white whitespace-nowrap">语言处理通路</p>
    </div>
  );
}

function TagLogic() {
  return (
    <div className="bg-[#208fdf] content-stretch flex h-[42px] items-center justify-center px-[11.627px] relative rounded-[115.105px] shrink-0" data-name="tag-logic">
      <p className="font-normal leading-[1.4] not-italic relative shrink-0 text-[28px] text-white whitespace-nowrap">逻辑推理通路</p>
    </div>
  );
}

function ListPath({ selectedAction }: { selectedAction: string }) {
  const animatedTag = (index: number, element: React.ReactNode) => (
    <motion.div
      key={`${selectedAction}-tag-${index}`}
      variants={slideInVariants}
      initial="hidden"
      animate="visible"

      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + index * 0.05 }}
    >
      {element}
    </motion.div>
  );

  const renderTags = () => {
    switch (selectedAction) {
      case "basketball":
        return (
          <>
            {animatedTag(0, <TagMotor />)}
            {animatedTag(1, <TagVision />)}
          </>
        );
      case "piano":
        return (
          <>
            {animatedTag(0, <TagHand />)}
            {animatedTag(1, <TagAudio />)}
            {animatedTag(2, <TagBrain />)}
          </>
        );
      case "drawing":
        return (
          <>
            {animatedTag(0, <TagHand />)}
            {animatedTag(1, <TagVision />)}
            {animatedTag(2, <TagCreative />)}
          </>
        );
      case "speech":
        return (
          <>
            {animatedTag(0, <TagLang />)}
            {animatedTag(1, <TagAudio />)}
          </>
        );
      case "puzzle":
        return (
          <>
            {animatedTag(0, <TagLogic />)}
            {animatedTag(1, <TagCreative />)}
          </>
        );
      default:
        return (
          <>
            {animatedTag(0, <TagHand />)}
            {animatedTag(1, <TagAudio />)}
            {animatedTag(2, <TagBrain />)}
          </>
        );
    }
  };

  return (
    <div className="content-stretch flex flex-col gap-[23.254px] items-start justify-center relative shrink-0" data-name="list-path">
      {renderTags()}
    </div>
  );
}
function Frame1({ selectedAction }: { selectedAction: string }) {
  return (
    <AnimatePresence>
      <div key={selectedAction || "empty"} className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[55px] items-start left-[80px] top-[calc(50%-50px)] w-[266px] h-[305px]">
        {selectedAction ? (
          <>
            <TextAction selectedAction={selectedAction} />
            <ListPath selectedAction={selectedAction} />
          </>
        ) : (
          <div className="text-black text-[30px] leading-[1.8] shrink-0 w-max">
            <p>请选择"本领块"，</p>
            <p>为大脑塑造神经道路</p>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}

function PlayBasketball({ isActive }: { isActive: boolean }) {
  const blendMode = isActive ? "darken" : "difference";

  return (
    <div className={isActive ? "mix-blend-darken relative shrink-0 size-full" : "mix-blend-difference relative shrink-0 size-full"} data-name="play basketball">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="play basketball" style={{ mixBlendMode: blendMode }}>
          <g clipPath="url(#clip0_1_303)">
            <rect fill="var(--fill-0, white)" height="72" rx="4.58182" width="72" />
            <path d={svgPaths.p16702840} fill="var(--fill-0, #252525)" id="Vector" />
            <path d={svgPaths.p75edf80} fill="var(--fill-0, #252525)" id="Vector_2" />
            <path d={svgPaths.p37c31100} fill="var(--fill-0, #252525)" id="Vector_3" />
            <path d={svgPaths.p33b81680} fill="var(--fill-0, #252525)" id="Vector_4" />
            <path d={svgPaths.p230ab80} fill="var(--fill-0, #252525)" id="Vector_5" />
            <path d={svgPaths.p3e223a00} fill="var(--fill-0, #252525)" id="Vector_6" />
            <path d={svgPaths.pd75ba00} fill="var(--fill-0, #252525)" id="Vector_7" />
            <path d={svgPaths.p2d865e00} fill="var(--fill-0, #252525)" id="Vector_8" />
            <path d={svgPaths.p18227200} fill="var(--fill-0, #252525)" id="Vector_9" />
            <path d={svgPaths.p4aeff40} fill="var(--fill-0, #252525)" id="Vector_10" />
            <path d={svgPaths.p2a26ae00} fill="var(--fill-0, #252525)" id="Vector_11" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_303">
            <rect fill="white" height="72" rx="4.58182" width="72" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PlayPiano({ isActive }: { isActive: boolean }) {
  const blendMode = isActive ? "darken" : "difference";

  return (
    <div className={isActive ? "mix-blend-darken relative shrink-0 size-full" : "mix-blend-difference relative shrink-0 size-full"} data-name="play piano">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 110 110">
        <g id="play piano" style={{ mixBlendMode: blendMode }}>
          <g clipPath="url(#clip0_1_328)">
            <rect fill="var(--fill-0, white)" height="110" rx="7" width="110" />
            <path d={svgPaths.p2ee45180} fill="var(--fill-0, #252525)" id="Vector" />
            <path d={svgPaths.pbfbd780} fill="var(--fill-0, #252525)" id="Vector_2" />
            <path d={svgPaths.p2c3218c0} fill="var(--fill-0, #252525)" id="Vector_3" />
            <path d={svgPaths.p21a0bdf0} fill="var(--fill-0, #252525)" id="Vector_4" />
            <path clipRule="evenodd" d={svgPaths.p3c53b700} fill="var(--fill-0, #252525)" fillRule="evenodd" id="Vector_5" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_328">
            <rect fill="white" height="110" rx="7" width="110" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Drawing({ isActive }: { isActive: boolean }) {
  const blendMode = isActive ? "darken" : "difference";

  return (
    <div className={isActive ? "mix-blend-darken relative shrink-0 size-full" : "mix-blend-difference relative shrink-0 size-full"} data-name="drawing">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="drawing" style={{ mixBlendMode: blendMode }}>
          <rect fill="var(--fill-0, white)" height="72" rx="4.58182" width="72" />
          <path d={svgPaths.p55cc80} fill="var(--fill-0, #252525)" id="Vector" />
          <path d={svgPaths.p260278c0} fill="var(--fill-0, #252525)" id="Vector_2" />
          <path d={svgPaths.p3087e370} fill="var(--fill-0, #252525)" id="Vector_3" />
          <path d={svgPaths.pa821b00} fill="var(--fill-0, #252525)" id="Vector_4" />
          <path d={svgPaths.pad60b00} fill="var(--fill-0, #252525)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Speeching({ isActive }: { isActive: boolean }) {
  const blendMode = isActive ? "darken" : "difference";

  return (
    <div className={isActive ? "mix-blend-darken relative shrink-0 size-full" : "mix-blend-difference relative shrink-0 size-full"} data-name="speeching">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="speeching" style={{ mixBlendMode: blendMode }}>
          <rect fill="var(--fill-0, white)" height="72" rx="4.58182" width="72" />
          <path d={svgPaths.p29cc81c0} fill="var(--fill-0, #252525)" id="Vector" />
          <path d={svgPaths.p12150c00} fill="var(--fill-0, #252525)" id="Vector_2" />
          <path d={svgPaths.p38a0a900} fill="var(--fill-0, #252525)" id="Vector_3" />
          <path d={svgPaths.p8ae6300} fill="var(--fill-0, #252525)" id="Vector_4" />
          <path d={svgPaths.p2f040b00} fill="var(--fill-0, #252525)" id="Vector_5" />
          <path d={svgPaths.pf1cac00} fill="var(--fill-0, #252525)" id="Vector_6" />
          <path d={svgPaths.p32e5000} fill="var(--fill-0, #252525)" id="Vector_7" />
        </g>
      </svg>
    </div>
  );
}

function PalyPuzzle({ isActive }: { isActive: boolean }) {
  const blendMode = isActive ? "darken" : "difference";

  return (
    <div className={isActive ? "mix-blend-darken relative shrink-0 size-full" : "mix-blend-difference relative shrink-0 size-full"} data-name="paly puzzle">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="paly puzzle" style={{ mixBlendMode: blendMode }}>
          <g clipPath="url(#clip0_1_348)">
            <rect fill="white" height="72" rx="4.58182" width="72" />
            <path d={svgPaths.p22971300} fill="var(--fill-0, #252525)" id="Vector" />
            <path d={svgPaths.pdfd2a00} fill="var(--fill-0, #252525)" id="Vector_2" />
            <path d={svgPaths.pb2a2240} fill="var(--fill-0, #252525)" id="Vector_3" />
            <path d={svgPaths.p2a219c00} fill="var(--fill-0, #252525)" id="Vector_4" />
            <path d={svgPaths.p5de7c00} fill="var(--fill-0, #252525)" id="Vector_5" />
            <path d={svgPaths.p2cadbd40} fill="var(--fill-0, #252525)" id="Vector_6" />
            <path d={svgPaths.p34829b00} fill="var(--fill-0, #252525)" id="Vector_7" />
            <path d={svgPaths.p1febada0} fill="var(--fill-0, #252525)" id="Vector_8" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_348">
            <rect fill="white" height="72" rx="4.58182" width="72" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

interface ActionButtonProps {
  isActive: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  dataName: string;
}

function ActionButton({ isActive, onClick, children, dataName }: ActionButtonProps) {
  if (isActive) {
    return (
      <motion.button layout transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`bg-[#d5fc74] content-stretch drop-shadow-[0px_4px_0px_black] flex items-center justify-center p-[9px] relative rounded-[12px] shrink-0 size-[128px] ${onClick ? "cursor-pointer" : "cursor-default"}`}
        data-name={dataName}
        onClick={onClick}
      >
        <div aria-hidden="true" className="absolute border-[1.5px] border-black border-solid inset-0 pointer-events-none rounded-[12px]" />
        <div className="size-[110px]">
          {children}
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button layout transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`bg-[#E2E2E2] content-stretch flex items-center justify-center p-[5.906px] relative rounded-[7.875px] shrink-0 size-[84px] ${onClick ? "cursor-pointer hover:bg-[#d0d0d0]" : "cursor-default"}`}
      data-name={dataName}
      onClick={onClick}
    >
      <div className="size-[72px]">
        {children}
      </div>
    </motion.button>
  );
}

function Container({ selectedAction, onActionClick, mode }: { selectedAction: string; onActionClick: (action: string) => void; mode?: string }) {
  const isToolMode = mode === "tool";
  const handleClick = (action: string) => isToolMode ? undefined : () => onActionClick(action);
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="container">
      <ActionButton
        isActive={selectedAction === "basketball"}
        onClick={handleClick("basketball")}
        dataName="icon-basketball"
      >
        <PlayBasketball isActive={selectedAction === "basketball"} />
      </ActionButton>
      <ActionButton
        isActive={selectedAction === "piano"}
        onClick={handleClick("piano")}
        dataName="icon-piano"
      >
        <PlayPiano isActive={selectedAction === "piano"} />
      </ActionButton>
      <ActionButton
        isActive={selectedAction === "drawing"}
        onClick={handleClick("drawing")}
        dataName="icon-draw"
      >
        <Drawing isActive={selectedAction === "drawing"} />
      </ActionButton>
      <ActionButton
        isActive={selectedAction === "speech"}
        onClick={handleClick("speech")}
        dataName="icon-speech"
      >
        <Speeching isActive={selectedAction === "speech"} />
      </ActionButton>
      <ActionButton
        isActive={selectedAction === "puzzle"}
        onClick={handleClick("puzzle")}
        dataName="icon-puzzle"
      >
        <PalyPuzzle isActive={selectedAction === "puzzle"} />
      </ActionButton>
    </div>
  );
}

function MenuAction({ selectedAction, onActionClick, mode }: { selectedAction: string; onActionClick: (action: string) => void; mode?: string }) {
  return (
    <div className="-translate-y-1/2 absolute bg-[#252525] content-stretch flex flex-col h-[109px] items-start left-[80px] pt-[12px] px-[40px] rounded-[99px] top-[calc(50%-365.5px)] w-[608px]" data-name="menu-action">
      <Container selectedAction={selectedAction} onActionClick={onActionClick} mode={mode} />
    </div>
  );
}

export interface BrainSceneState {
  pathWidths: Record<string, number>;
  pathColors: Record<string, string>;
  cellColors: Record<string, { fill: string; stroke: string }>;
}

export default function Unit({ onComplete, mode = "tool", onClose }: { onComplete?: (data: BrainSceneState) => void; mode?: string; onClose?: () => void }) {
  const [selectedAction, setSelectedAction] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipAnimating, setTooltipAnimating] = useState(false);
  const initialWidth = INITIAL_PATH_WIDTH;
  const [pathWidths, setPathWidths] = useState<Record<string, number>>({
    "path-motor-1": initialWidth,
    "path-motor-2": initialWidth,
    "path-vision-1": initialWidth,
    "path-vision-2": initialWidth,
    "path-hand-1": initialWidth,
    "path-hand-2": initialWidth,
    "path-audio": initialWidth,
    "path-brain-1": initialWidth,
    "path-brain-2": initialWidth,
    "path-creative-1": initialWidth,
    "path-creative-2": initialWidth,
    "path-creative-3": initialWidth,
    "path-lang": initialWidth,
    "path-logic": initialWidth,
    "other-mid-1": initialWidth,
    "other-mid-2": initialWidth,
    "other-mid-3": initialWidth,
    "other-mid-4": initialWidth,
    "other-mid-5": initialWidth,
    "other-mid-6": initialWidth,
    "other-mid-7": initialWidth,
    "other-mid-8": initialWidth,
    "other-mid-9": initialWidth,
    "other-mid-10": initialWidth,
    "other-left-1": initialWidth,
    "other-left-2": initialWidth,
    "other-left-3": initialWidth,
    "other-left-4": initialWidth,
    "other-left-5": initialWidth,
    "other-left-6": initialWidth,
    "other-left-7": initialWidth,
    "other-left-8": initialWidth,
    "other-left-9": initialWidth,
    "other-right-1": initialWidth,
    "other-right-2": initialWidth,
    "other-right-3": initialWidth,
    "other-right-4": initialWidth,
    "other-right-5": initialWidth,
    "other-right-6": initialWidth,
    "other-right-7": initialWidth,
    "other-right-8": initialWidth,
    "other-right-9": initialWidth,
    "other-right-10": initialWidth,
  });

  const [pathColors, setPathColors] = useState<Record<string, string>>({});
  const [cellColors, setCellColors] = useState<Record<string, { fill: string; stroke: string }>>({});
  const [flashingPaths, setFlashingPaths] = useState<Set<string>>(new Set());
  const [isBlurActive, setIsBlurActive] = useState(false);
  const [paused, setPaused] = useState(false);

  const handlePromptClick = () => {
    // 触发反馈动画
    setShowFeedback(true);
    setIsAnimating(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    });

    setTimeout(() => {
      setShowFeedback(false);
      setIsAnimating(false);
    }, 1000);

    // 更新路径宽度
    const pathConfig = ACTION_PATH_CONFIG[selectedAction];
    const otherConfig = ACTION_OTHER_CONFIG[selectedAction];
    const activatedPaths: string[] = [];
    let updatedWidths: Record<string, number> = {};

    // 辅助函数：更新 other 类路径
    const updateOtherCategory = (category: string, count: number, widths: Record<string, number>) => {
      const otherStep = BASE_SCALE * 0.1;
      for (let i = 1; i <= count; i++) {
        const pathId = `${category}-${i}`;
        widths[pathId] = Math.min((widths[pathId] || INITIAL_PATH_WIDTH) + otherStep, LEVEL_WALK.max - 0.01);
      }
    };

    setPathWidths(prev => {
      const newWidths = { ...prev };

      // 更新主要路径
      if (pathConfig) {
        Object.entries(pathConfig).forEach(([pathId, involv]) => {
          const step = BASE_SCALE * involv;
          const newWidth = Math.min((prev[pathId] || INITIAL_PATH_WIDTH) + step, LEVEL_HIGHWAY.max);
          newWidths[pathId] = newWidth;
          activatedPaths.push(pathId);
        });
      }

      // 更新 other 类路径（介入程度统一为 0.1，限制在 level-walk）
      if (otherConfig) {
        const categoryConfig = {
          "other-mid": 10,
          "other-left": 9,
          "other-right": 10,
        };

        otherConfig.forEach(category => {
          const count = categoryConfig[category as keyof typeof categoryConfig];
          if (count) {
            updateOtherCategory(category, count, newWidths);
          }
        });
      }

      updatedWidths = newWidths;
      return newWidths;
    });

    // 更新颜色：达到 highway 等级的路径永久保持激活颜色
    setPathColors(prevColors => {
      const updated = { ...prevColors };
      activatedPaths.forEach(pathId => {
        const width = updatedWidths[pathId] || INITIAL_PATH_WIDTH;
        if (getPathLevel(width) === "highway") {
          updated[pathId] = PATH_COLORS[pathId] || "#000000";
        }
      });
      return updated;
    });

    // 更新 cell 颜色：达到 highway 等级的路径关联的 cell 变为 creative 状态
    setCellColors(prevCellColors => {
      const updatedCellColors = { ...prevCellColors };

      activatedPaths.forEach(pathId => {
        const width = updatedWidths[pathId] || INITIAL_PATH_WIDTH;
        if (getPathLevel(width) === "highway") {
          const activationColor = PATH_COLORS[pathId];
          const cells = PATH_TO_CELLS[pathId];

          if (cells && activationColor) {
            cells.forEach(cellId => {
              const fillColor = activationColor;
              const strokeColor = getStrokeColorFromFill(fillColor);
              updatedCellColors[cellId] = { fill: fillColor, stroke: strokeColor };
            });
          }
        }
      });

      return updatedCellColors;
    });

    // 收集主路径 ID 并触发闪烁（other 类路径不闪烁）
    const affectedPathIds = new Set<string>();
    if (pathConfig) {
      Object.keys(pathConfig).forEach(id => affectedPathIds.add(id));
    }
    setFlashingPaths(affectedPathIds);
    setIsBlurActive(true);

    // 闪烁动画结束后清除
    setTimeout(() => {
      setFlashingPaths(new Set());
      setIsBlurActive(false);
    }, 200);
  };

  // 键盘快捷键监听（教具模式）
  const handlePromptClickRef = useRef(handlePromptClick);
  handlePromptClickRef.current = handlePromptClick;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (mode !== "tool") return;
      const key = e.key.toLowerCase();
      if (key === "a") {
        setSelectedAction("basketball");
      } else if (key === "b") {
        setSelectedAction("piano");
      } else if (key === "c") {
        setSelectedAction("drawing");
      } else if (key === "d") {
        setSelectedAction("speech");
      } else if (key === "e") {
        setSelectedAction("puzzle");
      } else if (e.key === "Tab") {
        e.preventDefault();
        handlePromptClickRef.current();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode]);

  // 衰退效果：所有 path 以每秒 -0.2 stroke weight 的速度变窄
  useEffect(() => {
    const decayInterval = setInterval(() => {
      setPathWidths(prev => {
        const newWidths = { ...prev };
        let hasChanges = false;
        let hasDowngrade = false;

        // 遍历所有路径
        Object.keys(prev).forEach(pathId => {
          const currentWidth = prev[pathId];
          const currentLevel = getPathLevel(currentWidth);

          // 每 100ms 减少 0.02（每秒减少 0.2）
          const newWidth = Math.max(currentWidth - 0.02, INITIAL_PATH_WIDTH);
          const newLevel = getPathLevel(newWidth);

          if (newWidth !== currentWidth) {
            newWidths[pathId] = newWidth;
            hasChanges = true;

            // 检测从 highway 降级到 road
            if (currentLevel === "highway" && newLevel === "road") {
              hasDowngrade = true;
            }
          }
        });

        // 如果检测到降级，触发 Tooltip 显示
        if (hasDowngrade) {
          setShowTooltip(true);
          setTooltipAnimating(false);

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setTooltipAnimating(true);
            });
          });

          setTimeout(() => {
            setTooltipAnimating(false);
          }, 2000);

          setTimeout(() => {
            setShowTooltip(false);
          }, 2500);
        }

        return hasChanges ? newWidths : prev;
      });

      // 检查并更新路径颜色和 cell 颜色
      setPathColors(prevColors => {
        const updated = { ...prevColors };
        let hasChanges = false;

        Object.keys(prevColors).forEach(pathId => {
          const width = pathWidths[pathId] || INITIAL_PATH_WIDTH;
          if (getPathLevel(width) !== "highway") {
            delete updated[pathId];
            hasChanges = true;
          }
        });

        return hasChanges ? updated : prevColors;
      });

      setCellColors(prevCellColors => {
        const updatedCellColors = { ...prevCellColors };
        let hasChanges = false;

        // 检查所有 cell，如果关联的所有路径都不是 highway，则恢复 default 状态
        Object.keys(prevCellColors).forEach(cellId => {
          let shouldReset = true;

          // 检查是否有任何路径仍然关联到这个 cell 且处于 highway 状态
          Object.entries(PATH_TO_CELLS).forEach(([pathId, cells]) => {
            if (cells.includes(cellId)) {
              const width = pathWidths[pathId] || INITIAL_PATH_WIDTH;
              if (getPathLevel(width) === "highway") {
                shouldReset = false;
              }
            }
          });

          if (shouldReset && prevCellColors[cellId]) {
            delete updatedCellColors[cellId];
            hasChanges = true;
          }
        });

        return hasChanges ? updatedCellColors : prevCellColors;
      });
    }, 100); // 每 100ms 执行一次

    return () => clearInterval(decayInterval);
  }, [pathWidths]);

  // 倒计时结束处理
  const handleTimerEnd = useCallback(() => {
    if (!onComplete) return;

    // 保存当前的完整状态
    onComplete({
      pathWidths: { ...pathWidths },
      pathColors: { ...pathColors },
      cellColors: { ...cellColors }
    });
  }, [onComplete, pathWidths, pathColors, cellColors]);

  return (
    <div className="bg-[#E2E2E2] relative w-screen h-screen overflow-hidden" data-name="unit1-3">
      <Background isBlurActive={isBlurActive} />
      <BrainScene pathWidths={pathWidths} pathColors={pathColors} cellColors={cellColors} flashingPaths={flashingPaths} />
      {showFeedback && <FeedbackAnimation isAnimating={isAnimating} />}
      <Tooltip isVisible={showTooltip} isAnimating={tooltipAnimating} />
      <Toolbar onTimerEnd={handleTimerEnd} paused={paused} onStop={() => setPaused(p => !p)} onClose={onClose} />
      <PromptAction onPromptClick={handlePromptClick} mode={mode} />
      <Frame1 selectedAction={selectedAction} />
      <MenuAction selectedAction={selectedAction} onActionClick={setSelectedAction} mode={mode} />
    </div>
  );
}
