import { useEffect } from "react";
import style from "./DailyAudio.module.css";
import { useState } from "react";

export default function DailyAudio() {
  const date = new Date();
  const audioSource = `/audios/audio-${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.mp3`;
  const [audioExists, setAudioExists] = useState(true);

  useEffect(() => {
    fetch(audioSource)
      .then((response) => {
        if (!response.ok) {
          setAudioExists(false);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [audioSource]);

  return (
    <div className={style.dailyaudio__container}>
      <div className={style.text__container}>
        <h3>Audio do dia</h3>
        <p>Ouça o audio diário para</p>
      </div>
      {audioExists ? (
        <audio controls controlsList="nodownload noplaybackrate">
          <source src={audioSource} type="audio/mpeg" />
          Seu navegador não é compatível com o elemento de audio. Tente outro navegador
        </audio>
      ) : (
        <div className={style.no__audio}>
          <span>O audio diário ainda não está disponível, volte em alguns momentos!</span>
        </div>
      )}
    </div>
  );
}
