import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePlayerStore } from '../store/usePlayerStore';
import { getStreamAds } from '../service/ads.api';
import { useAuthStore } from '../store/useAuthStore';

const useFetchAudioAds = (adsId: string) => {
  const {setLoading } = usePlayerStore()
    const currentUrlRef = useRef<string | null>(null);
    const [ audioSrc,setAudioSrc] = useState<string | null>(null);
    const {token} = useAuthStore()
  
    const { data, isLoading } = useQuery({
      queryKey: ['adsUrl', adsId],
      queryFn: () => getStreamAds(token!, adsId),
      enabled: !!adsId,
    });

    useEffect(() => {
      setLoading(isLoading);
    }, [isLoading, setLoading]);

    const processAudio = async () => {
      try {
        const blob = new Blob([data?.data], { type: 'audio/x-flac' });
        const url = URL.createObjectURL(blob);
       
        if (currentUrlRef.current) {
          URL.revokeObjectURL(currentUrlRef.current);
        }

        currentUrlRef.current = url;
        setAudioSrc(url);
      } catch (error) {
        console.error('Error processing audio:', audioSrc);
      }
    };
  
    useEffect(() => {
      if (data?.data) {
        processAudio();
      }
  
      return () => {
        if (currentUrlRef.current) {
          URL.revokeObjectURL(currentUrlRef.current);
          currentUrlRef.current = null;
        }
      };
    }, [data, adsId]);
    return currentUrlRef.current;
  };
  
  export default useFetchAudioAds;