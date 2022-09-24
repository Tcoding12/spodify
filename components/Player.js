import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlaying } from "../Atom/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

function Player() {
  const spotifyapi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackIdStates, setCurrentTrackIdState] =
    useRecoilState(currentTrackIdState);

  const songInfo = useSongInfo();

  const [isPlayings, setIsPlayings] = useRecoilState(isPlaying);

  const [volume, setVolume] = useState(50);
  return (
    <div>
      <div>
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album?.images?.[0]?.url}
          alt=""
        />
      </div>
    </div>
  );
}

export default Player;
