import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Howl } from "howler";

const AUDIO_INTERACTION_EVENTS = ["click", "touchstart", "keydown"];

let hasAudioInteraction = false;
const persistentSounds = new Map();

const getPersistentSoundKey = ({
  html5,
  loop,
  preload,
  rate,
  sourceList,
  volume,
}) => [sourceList.join("|"), volume, html5, preload, loop, rate].join("::");

export const useHowlSound = (
  src,
  {
    volume = 1,
    html5 = true,
    preload = true,
    loop = false,
    rate = 1,
    persist = false,
    unlockOnInteraction = true,
  } = {}
) => {
  const initialAudioReady = !unlockOnInteraction || hasAudioInteraction;
  const soundRef = useRef(null);
  const readyRef = useRef(initialAudioReady);
  const [audioReady, setAudioReady] = useState(initialAudioReady);

  const sourceList = useMemo(() => {
    if (!src) return [];
    return Array.isArray(src) ? src : [src];
  }, [src]);

  useEffect(() => {
    if (sourceList.length === 0) return undefined;

    const soundOptions = {
      src: sourceList,
      volume,
      html5,
      preload,
      loop,
      rate,
    };

    const persistentSoundKey = persist
      ? getPersistentSoundKey({
          html5,
          loop,
          preload,
          rate,
          sourceList,
          volume,
        })
      : null;

    let sound = persistentSoundKey
      ? persistentSounds.get(persistentSoundKey)
      : null;

    if (!sound) {
      sound = new Howl(soundOptions);

      if (persistentSoundKey) {
        persistentSounds.set(persistentSoundKey, sound);
      }
    }

    soundRef.current = sound;

    return () => {
      if (!persist) {
        sound.unload();
      }

      if (soundRef.current === sound) {
        soundRef.current = null;
      }
    };
  }, [sourceList, volume, html5, preload, loop, rate, persist]);

  useEffect(() => {
    if (!unlockOnInteraction || hasAudioInteraction) {
      readyRef.current = true;
      return undefined;
    }

    const markAudioReady = () => {
      hasAudioInteraction = true;
      readyRef.current = true;
      setAudioReady(true);
    };

    AUDIO_INTERACTION_EVENTS.forEach((event) => {
      document.addEventListener(event, markAudioReady, {
        once: true,
        capture: true,
      });
    });

    return () => {
      AUDIO_INTERACTION_EVENTS.forEach((event) => {
        document.removeEventListener(event, markAudioReady, true);
      });
    };
  }, [unlockOnInteraction]);

  const play = useCallback((spriteOrId) => {
    if (!soundRef.current || !readyRef.current) return null;
    return spriteOrId === undefined
      ? soundRef.current.play()
      : soundRef.current.play(spriteOrId);
  }, []);

  const pause = useCallback(() => {
    soundRef.current?.pause();
  }, []);

  const stop = useCallback(() => {
    soundRef.current?.stop();
  }, []);

  return {
    audioReady,
    pause,
    play,
    soundRef,
    stop,
  };
};

export default useHowlSound;
