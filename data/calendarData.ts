import type { DoorData } from '../types';

// The Google Drive link provided by the user is converted to a direct download link.
// NOTE: Hotlinking from Google Drive can be an unreliable. For a production app,
// it's better to host audio files on a dedicated service (e.g., S3, Cloudinary).
const audioUrlDay1 = "https://drive.google.com/uc?export=download&id=1ODc86AyKuznuGxxCQQhiJx104534DGWl";
const audioUrlDay2 = "https://drive.google.com/uc?export=download&id=1yzLGUafUOCSOtg799oW_syA2I7b1KSGS";
const audioUrlDay3 = "https://drive.google.com/uc?export=download&id=1uU3ORCJ8S8MTuaCjeS7daTCr-hlzQM3j";


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
    // Using placeholder MP3s from a public service for demonstration purposes.
    // Replace these with actual audio file URLs.
    audioSrc = `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i % 16) + 1}.mp3`;
  }

  return {
    day,
    audioSrc,
  };
});