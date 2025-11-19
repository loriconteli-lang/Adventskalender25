
import React from 'react';

interface DoorProps {
  day: number;
  audioSrc: string | null;
  isOpened: boolean;
  isUnlockable: boolean;
  onClick: (day: number, audioSrc: string | null) => void;
}

const MusicNoteIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-13c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
    </svg>
);


const Door: React.FC<DoorProps> = ({ day, audioSrc, isOpened, isUnlockable, onClick }) => {
  const handleClick = () => {
    onClick(day, audioSrc);
  };

  const isLocked = !isUnlockable;
  const frontBgColor = isLocked
    ? 'bg-gray-600'
    : isOpened
    ? 'bg-green-800'
    : 'bg-red-700 hover:bg-red-600';
  const frontTextColor = isLocked ? 'text-gray-400' : 'text-white';
  const cursorStyle = isUnlockable ? 'cursor-pointer' : 'cursor-not-allowed';

  return (
    <div className={`aspect-square w-full perspective ${cursorStyle}`} onClick={handleClick}>
      <div className={`relative w-full h-full duration-1000 transform-style-preserve-3d ${isOpened ? 'rotate-y-180' : ''}`}>
        {/* Front of the door */}
        <div className={`absolute w-full h-full backface-hidden flex items-center justify-center rounded-lg shadow-lg border-2 border-yellow-500/80 transition-colors ${frontBgColor}`}>
          <span className={`text-4xl md:text-5xl font-bold ${frontTextColor}`} style={{ textShadow: '2px 2px 2px rgba(0,0,0,0.5)' }}>
            {day}
          </span>
          {isLocked && (
            <div className="absolute top-2 right-2 text-yellow-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
            </div>
          )}
        </div>
        {/* Back of the door (content) */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-green-900 rounded-lg shadow-lg border-2 border-yellow-500/80 flex flex-col items-center justify-center p-2 text-center">
            <MusicNoteIcon />
            <p className="mt-2 text-sm text-yellow-200">Überraschung!</p>
        </div>
      </div>
    </div>
  );
};

export default Door;
