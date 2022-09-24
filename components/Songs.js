import { useRecoilValue } from "recoil";
import { playlistAtoms } from "../Atom/playlistAtom";
import SongList from "./SongList";

function Songs() {
  const playlist = useRecoilValue(playlistAtoms);
  console.log("working", playlist);
  return (
    <div className=" px-8 flex flex-col space-y-1 pb-28 text-white  opacity-75 ">
      {playlist?.tracks.items.map((profile, i) => (
        <SongList key={profile.track.id} track={profile} order={i} />
      ))}
    </div>
  );
}

export default Songs;
