import { useState } from "react";
import Page1, { BrainSceneState } from "../imports/Page1/Page1";
import Page2 from "../imports/Page2/Page2";
import Page0 from "../imports/Page0/Page0";

type ModeType = "tool" | "cursor";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'page0' | 'page1' | 'page2'>('page0');
  const [gameData, setGameData] = useState<BrainSceneState | null>(null);
  const [selectedMode, setSelectedMode] = useState<ModeType>("tool");

  const handlePage0Start = (mode: ModeType) => {
    setSelectedMode(mode);
    setCurrentPage('page1');
  };

  const handlePage1Complete = (data: BrainSceneState) => {
    setGameData(data);
    setCurrentPage('page2');
  };

  if (currentPage === 'page0') {
    return <Page0 onStart={handlePage0Start} />;
  }

  if (currentPage === 'page1') {
    return <Page1 mode={selectedMode} onComplete={handlePage1Complete} />;
  }

  return <Page2 brainSceneState={gameData} />;
}
