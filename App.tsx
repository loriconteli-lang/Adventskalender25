
import React, { useState, useEffect, useCallback } from 'react';
import Door from './components/Door';
import AudioPlayerModal from './components/AudioPlayerModal';
import { doorsData } from './data/calendarData';
import type { DoorData } from './types';

const CALENDAR_YEAR = 2025;
const CALENDAR_MONTH = 11; // 0-indexed for December

const App: React.FC = () => {
  const [openedDoors, setOpenedDoors] = useState<Set<number>>(new Set());
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedDoors = localStorage.getItem('openedDoors');
      if (savedDoors) {
        setOpenedDoors(new Set(JSON.parse(savedDoors)));
      }
    } catch (error) {
      console.error("Failed to load opened doors from localStorage", error);
    }
  }, []);

  useEffect(() => {
    // This is for development to test date changes without reloading.
    const timer = setInterval(() => setCurrentDate(new Date()), 60000); // Update date every minute
    return () => clearInterval(timer);
  }, []);

  const isDoorUnlockable = useCallback((day: number): boolean => {
    if (isAdminMode) {
      return true;
    }
    return (
      currentDate.getFullYear() > CALENDAR_YEAR ||
      (currentDate.getFullYear() === CALENDAR_YEAR &&
        (currentDate.getMonth() > CALENDAR_MONTH ||
          (currentDate.getMonth() === CALENDAR_MONTH && currentDate.getDate() >= day)))
    );
  }, [currentDate, isAdminMode]);

  const handleDoorClick = useCallback((day: number, audioSrc: string | null) => {
    if (isDoorUnlockable(day) && audioSrc) {
      const newOpenedDoors = new Set(openedDoors);
      newOpenedDoors.add(day);
      setOpenedDoors(newOpenedDoors);
      try {
        localStorage.setItem('openedDoors', JSON.stringify(Array.from(newOpenedDoors)));
      } catch (error) {
        console.error("Failed to save opened doors to localStorage", error);
      }
      setCurrentAudio(audioSrc);
    } else if (isDoorUnlockable(day) && !audioSrc) {
       alert("Ein kleines technisches Problem... hinter diesem Türchen ist heute leider keine Überraschung versteckt.");
    }
    else {
      alert("Noch ein bisschen Geduld! Dieses Türchen kann erst am richtigen Tag geöffnet werden.");
    }
  }, [openedDoors, isDoorUnlockable]);

  const handleCloseModal = () => {
    setCurrentAudio(null);
  };

  const handleAdminToggle = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
      return;
    }

    const password = prompt("Bitte Admin-Passwort eingeben:");
    if (password === "Ncc1701e") {
      setIsAdminMode(true);
      alert("Admin-Modus aktiviert!");
    } else if (password !== null) { // Check if the user clicked "Cancel"
      alert("Falsches Passwort!");
    }
  };
  
  const InfoPopup: React.FC = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-lg w-full text-center text-white border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Willkommen!</h2>
            <p className="mb-6 text-lg">Dies ist ein Adventskalender für Dezember 2025. Ein Türchen kann erst am entsprechenden Tag geöffnet werden. Viel Spaß!</p>
            <button
                onClick={() => setShowInfo(false)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 text-xl"
            >
                Start
            </button>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white bg-[url('https://www.transparenttextures.com/patterns/snow.png')] relative">
      {showInfo && <InfoPopup />}

      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={handleAdminToggle}
          className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${
            isAdminMode
              ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
              : 'bg-gray-700 bg-opacity-50 backdrop-blur-sm text-white hover:bg-gray-600'
          }`}
          aria-label="Toggle Admin Mode"
        >
          {isAdminMode ? 'Admin-Modus: AN' : 'Admin-Modus'}
        </button>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-red-500" style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.3)' }}>
            Adventskalender
          </h1>
          <p className="text-2xl md:text-3xl text-green-300 mt-2">Dezember 2025</p>
        </header>

        <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 p-4 bg-black/20 rounded-lg border-2 border-yellow-500/50 shadow-2xl">
          {doorsData.map((door: DoorData) => (
            <Door
              key={door.day}
              day={door.day}
              audioSrc={door.audioSrc}
              isOpened={openedDoors.has(door.day)}
              isUnlockable={isDoorUnlockable(door.day)}
              onClick={handleDoorClick}
            />
          ))}
        </main>
        
        <footer className="text-center mt-8 text-gray-400 text-lg">
            <p>Heutiges Datum: {currentDate.toLocaleDateString('de-DE')}</p>
        </footer>
      </div>
      {currentAudio && (
        <AudioPlayerModal audioSrc={currentAudio} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
