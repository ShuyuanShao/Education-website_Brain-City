import { useState } from "react";
import Unit13, { BrainSceneState } from "../imports/Unit13/Unit13";
import Page2 from "../imports/Page2-1/Page2";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'page1' | 'page2'>('page1');
  const [gameData, setGameData] = useState<BrainSceneState | null>(null);

  const handlePage1Complete = (data: BrainSceneState) => {
    setGameData(data);
    setCurrentPage('page2');
  };

  if (currentPage === 'page1') {
    return <Unit13 onComplete={handlePage1Complete} />;
  }

  return <Page2 brainSceneState={gameData} />;
}