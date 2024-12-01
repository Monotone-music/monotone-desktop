import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTrackStream } from '../service/track.api';
import useAudioStore from '../store/useAudioStore';

const useFetchAudio = (trackId: string) => {
    const { setAudioBuffer, togglePlayPause } = useAudioStore();
    const currentUrlRef = useRef<string | null>(null);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);
  
    const { data, isLoading, error } = useQuery({
      queryKey: ['trackUrl', trackId],
      queryFn: () => getTrackStream(trackId),
    });
  
    useEffect(() => {
      if (data?.data) {
        const processAudio = async () => {
          try {
            const blob = new Blob([data?.data], { type: 'audio/x-flac' });
            const url = URL.createObjectURL(blob);
            if (currentUrlRef.current) {
              URL.revokeObjectURL(currentUrlRef.current);
            }
  
            currentUrlRef.current = url;
            setAudioSrc(url);
            togglePlayPause();
          } catch (error) {
            console.error('Error processing audio:', error);
          }
        };
  
        processAudio();
      }
  
      return () => {
        if (currentUrlRef.current) {
          URL.revokeObjectURL(currentUrlRef.current);
          currentUrlRef.current = null;
        }
      };
    }, [data, setAudioBuffer, togglePlayPause]);
  
    return currentUrlRef.current;
  };
  
  export default useFetchAudio;