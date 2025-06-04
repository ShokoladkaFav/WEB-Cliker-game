import { useEffect, useRef } from 'react';

function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = 0.3; // 🔉 Гучність (0.0–1.0)
      audio.loop = true;   // 🔁 Циклічне відтворення
      audio.play().catch(e => {
        console.warn('🎵 Музика не запустилась автоматично (можливо, потрібно взаємодію з користувачем)');
      });
    }
  }, []);

  return (
    <audio ref={audioRef} src="/audio/theme.mp3" preload="auto" />
  );
}

export default BackgroundMusic;
