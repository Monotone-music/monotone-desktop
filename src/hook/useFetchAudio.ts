import { useEffect, useRef, useState } from 'react';
import { getTrackStream } from '../service/track.api';

const CHUNK_SIZE = 1024 * 1024; // 1MB
const BUFFER_THRESHOLD = 5; // Seconds before end to trigger new fetch

const useFetchAudio = (trackId: string) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioBuffer, setAudioBuffer] = useState<Blob[]>([]);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isEndOfTrack, setIsEndOfTrack] = useState(false);
  const startRef = useRef(0);
  const totalLengthRef = useRef(0);
  const isFetchingRef = useRef(false); // Prevent simultaneous fetches

  const fetchChunk = async () => {
    if (isFetchingRef.current || isEndOfTrack) return;
    isFetchingRef.current = true;

    const start = startRef.current;
    const end = Math.min(start + CHUNK_SIZE - 1, totalLengthRef.current);

    try {
      const { chunk, contentLength } = await getTrackStream(trackId, start, end);

      if (contentLength) {
        totalLengthRef.current = parseInt(contentLength.toString(), 10);
      }

      setAudioBuffer((prev) => [...prev, new Blob([chunk], { type: 'audio/mpeg' })]);

      startRef.current += CHUNK_SIZE;
      if (startRef.current >= totalLengthRef.current) {
        setIsEndOfTrack(true);
      }
    } catch (error) {
      console.error('Error fetching chunk:', error);
    } finally {
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const handleTimeUpdate = () => {
      if (!audioRef.current || isFetchingRef.current) return;

      const bufferedEnd = audioRef.current.buffered.length
        ? audioRef.current.buffered.end(audioRef.current.buffered.length - 1)
        : 0;

      const timeRemaining = bufferedEnd - audioRef.current.currentTime;

      if (timeRemaining < BUFFER_THRESHOLD && !isEndOfTrack) {
        fetchChunk();
      }
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    return () => audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
  }, [isEndOfTrack]);

  useEffect(() => {
    if (trackId) {
      setAudioBuffer([]);
      setIsEndOfTrack(false);
      startRef.current = 0;
      totalLengthRef.current = 0;
      fetchChunk();
    }
  }, [trackId]);

  useEffect(() => {
    if (audioBuffer.length > 0) {
      const blob = new Blob(audioBuffer, { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);

      setAudioSrc((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    }
  }, [audioBuffer]);

  return { audioRef, audioSrc, isEndOfTrack };
};

export default useFetchAudio;
