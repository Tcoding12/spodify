import { atom } from "recoil";

export const currentTrackIdState = atom({
  key: "currentTrackIdState",
  default: null,
});

export const isPlaying = atom({
  key: "isPlayingState",
  default: false,
});
