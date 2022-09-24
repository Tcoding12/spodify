import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlaying } from "../Atom/songAtom";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutes } from "./time";

function SongList({ order, track }) {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const spotifyApi = useSpotify();

  const [isPlayings, setIsPlaying] = useRecoilState(isPlaying);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: track.track.uri,
    });
  };

  return (
    <div className="grid grid-cols-2 py-[10px] hover:bg-gray-900 duration-200 ease-linear cursor-pointer rounded-[5px] text-gray-500  ">
      <div className="flex items-center space-x-4 ">
        <p>{order + 1}</p>
        <img className="h-10 w-10" src={track?.track?.album?.images?.[0].url} />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p>{track.track.artists?.[0].name}</p>
        </div>
      </div>

      <div className="flex items-center h-full  flex-grow justify-between ml-auto md:ml-0">
        <p className="hidden md:inline">{track.track.album.name}</p>

        <p>{millisToMinutes(track?.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default SongList;
