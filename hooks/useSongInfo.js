import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../Atom/songAtom";
import useSpotify from "./useSpotify";

function useSongInfo() {
  const spotifyApi = useSpotify();
  const [currentTrack, setCurrentTrackIdTrack] =
    useRecoilState(currentTrackIdState);

  const [songInfo, setSongInfo] = useState(null);
  useEffect(() => {
    const fetchSongInfo = async () => {
      const trackInfo = await fetch(
        `https://api.spotify.com/v1/tracks/${currentTrack}`,
        {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()} `,
          },
        }
      ).then((res) => res.json());
      setSongInfo(trackInfo);
    };

    fetchSongInfo();
  }, [currentTrack, spotifyApi]);
}

export default useSongInfo;
