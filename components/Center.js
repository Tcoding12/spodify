import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import { playlistAtoms, playlistState } from "../Atom/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import { signOut } from "next-auth/react";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const spotifyApi = useSpotify();
  const playListId = useRecoilValue(playlistState);
  const [playListAtom, setPlayListAtom] = useRecoilState(playlistAtoms);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playListId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playListId)
      .then((data) => {
        setPlayListAtom(data.body);
      })
      .catch((err) => console.log("something went wrong", err));
  }, [spotifyApi, playListId]);

  return (
    <div className="flex-grow    h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          onClick={signOut}
          className="flex items-center z-50 bg-black space-x-3 rounded-full  p-1 pr-2 opacity-90 hover:opacity-80 cursor-pointer"
        >
          <img className="rounded-full w-10 h-10 " src={session?.user.image} />
          <h2 className="text-white ">{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5 text-white " />
        </div>
      </header>
      <section
        className={`flex  items-end h-80  space-x-7 bg-gradient-to-b to-black ${color} text-white p-8`}
      >
        <img
          src={playListAtom?.images?.[0].url}
          className="w-44 h-44  shadow-2xl"
        />

        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">
            {playListAtom?.name}
          </h1>
        </div>
      </section>
      <Songs />
    </div>
  );
}

export default Center;
