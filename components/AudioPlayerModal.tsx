
import React, { useEffect, useRef } from 'react';

interface AudioPlayerModalProps {
  audioSrc: string;
  onClose: () => void;
}

const AudioPlayerModal: React.FC<AudioPlayerModalProps> = ({ audioSrc, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-gray-800 rounded-lg p-6 shadow-2xl border-2 border-yellow-500/50 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors text-3xl"
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold mb-4 text-center text-green-300">Türchen geöffnet!</h3>
        <audio src={audioSrc} controls autoPlay className="w-full">
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default AudioPlayerModal;
