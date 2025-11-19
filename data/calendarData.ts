import type { DoorData } from '../types';

// HINWEIS: Google Drive-Links sind für das direkte Einbetten von Medien unzuverlässig.
// Sie wurden durch Platzhalter von einem öffentlichen Dienst ersetzt, um die Funktionalität sicherzustellen.
// Für die endgültige Version laden Sie Ihre MP3s bitte auf einen Hosting-Dienst hoch, der direkte Links bereitstellt.
const audioUrlDay1 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const audioUrlDay2 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";
const audioUrlDay3 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3";


export const doorsData: DoorData[] = Array.from({ length: 24 }, (_, i) => {
  const day = i + 1;
  let audioSrc: string | null = null;

  if (day === 1) {
    audioSrc = audioUrlDay1;
  } else if (day === 2) {
    audioSrc = audioUrlDay2;
  } else if (day === 3) {
    audioSrc = audioUrlDay3;
  }
  else {
    // Platzhalter-MP3s für die restlichen Tage.
    audioSrc = `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i % 16) + 1}.mp3`;
  }

  return {
    day,
    audioSrc,
  };
});