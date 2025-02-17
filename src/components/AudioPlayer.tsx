import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

interface AudioPlayerProps {
  title: string;
  src: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ title, src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => setDuration(audio.duration);
    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    // Ensure playbackRate is correctly applied on mount
    audio.playbackRate = playbackRate;

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, [playbackRate]); // Now the effect also runs when `playbackRate` changes

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const changeSpeed = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const speed = parseFloat(e.target.value);
    setPlaybackRate(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md max-w-md w-full">
      <div className="flex items-center justify-between gap-2 mb-5">
        <h3 className="text-sky-700 text-sm truncate text-center">{title}</h3>
        <select
          value={playbackRate}
          onChange={changeSpeed}
          className="text-sky-700 bg-white border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring focus:ring-sky-200"
        >
          <option value="0.5">0.5x</option>
          <option value="0.75">0.75x</option>
          <option value="1.0">1.0x (Normal)</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2.0">2.0x</option>
        </select>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() =>
            audioRef.current && (audioRef.current.currentTime -= 10)
          }
          className="text-sky-700 hover:text-sky-800 transition-colors"
        >
          <SkipBack size={20} />
        </button>

        <button
          onClick={togglePlay}
          className="text-sky-700 hover:text-sky-800 transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button
          onClick={() =>
            audioRef.current && (audioRef.current.currentTime += 10)
          }
          className="text-sky-700 hover:text-sky-800 transition-colors"
        >
          <SkipForward size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <span className="text-xs text-gray-500 w-10">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="flex-grow h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-700"
        />
        <span className="text-xs text-gray-500 w-10">
          {formatTime(duration)}
        </span>
        <button
          onClick={toggleMute}
          className="text-sky-700 hover:text-sky-800 transition-colors ml-2"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      <audio ref={audioRef} src={src} />
    </div>
  );
};
