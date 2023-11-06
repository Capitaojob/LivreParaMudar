import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Pause, Play, Square } from "react-feather";
import breathingsData from "../../../data/breathings.json";
import TitleAndSubtitle from "../../../components/TitleAndSubtitle";
import style from "./BreathingExercise.module.css";

export default function BreathingExercise() {
  const { id } = useParams();
  const breathing = breathingsData.breathingExercises.find((exercise) => exercise.id === parseInt(id));

  const [isPlaying, setIsPlaying] = useState(false);

  const currentTimeoutId = useRef(0);
  const currentIntervalId = useRef(0);

  // if (!breathing) {
  //   return redirect("/Error404");
  // }

  function startBreath() {
    if (currentIntervalId.current !== 0) return;

    const inhale = breathing.inhale;
    const exhale = breathing.exhale;
    const holdInhale = breathing.holdInhale ?? 0;
    const holdExhale = breathing.holdExhale ?? 0;

    const holdInhaleEnd = holdInhale + inhale;
    const exhaleEnd = exhale + holdInhale + inhale;

    const duration = inhale + holdInhale + exhale + holdExhale;
    let iteration = 0;
    let scale = 0.3;

    const currentAction = document.querySelector("[data-action]");
    const ball = document.querySelector("[data-ball]");
    const actionSeconds = document.querySelector("[data-action-seconds]");
    const durationText = document.querySelector("[data-duration-element]");
    let lastDuration = breathing.exerciseDuration;

    ball.style.transform = `scale(${scale})`;

    lastDuration = lastDuration - 1;
    durationText.innerHTML = formatSecondsToTimeString(lastDuration);

    scale += 0.7 / inhale;
    ball.style.transform = `scale(${scale})`;
    currentAction.innerHTML = "Inspire";
    actionSeconds.innerHTML = inhale - iteration;

    const intervalId = setInterval(() => {
      iteration++;
      iteration = iteration % duration;

      lastDuration = lastDuration - 1;
      durationText.innerHTML = formatSecondsToTimeString(lastDuration);

      if (iteration < inhale) {
        scale += 0.7 / inhale;
        ball.style.transform = `scale(${scale})`;
        currentAction.innerHTML = "Inspire";

        actionSeconds.innerHTML = inhale - iteration;
      } else if (iteration < holdInhaleEnd) {
        currentAction.innerHTML = "Segure";

        actionSeconds.innerHTML = holdInhaleEnd - iteration;
      } else if (iteration < exhaleEnd) {
        scale -= 0.7 / exhale;
        ball.style.transform = `scale(${scale})`;
        currentAction.innerHTML = "Expire";

        actionSeconds.innerHTML = exhaleEnd - iteration;
      } else {
        currentAction.innerHTML = "Segure";
        actionSeconds.innerHTML = duration - iteration;
      }
    }, 1000);

    currentIntervalId.current = intervalId;

    const timeoutId = setTimeout(() => {
      stopBreath();
    }, breathing.exerciseDuration * 1000);

    currentTimeoutId.current = timeoutId;
  }

  function stopBreath() {
    if (currentIntervalId.current === 0 || currentTimeoutId.current === 0) return;

    const currentAction = document.querySelector("[data-action]");
    const ball = document.querySelector("[data-ball]");
    const actionSeconds = document.querySelector("[data-action-seconds]");
    const durationText = document.querySelector("[data-duration-element]");

    clearInterval(currentIntervalId.current);
    clearTimeout(currentTimeoutId.current);

    currentIntervalId.current = 0;
    currentTimeoutId.current = 0;

    ball.style.transform = `scale(0.3)`;
    actionSeconds.innerHTML = "";
    currentAction.innerHTML = "Clique no play para começar";
    durationText.innerHTML = formatSecondsToTimeString(breathing.exerciseDuration);

    setIsPlaying(false);
  }

  function formatSecondsToTimeString(seconds) {
    if (typeof seconds !== "number" || isNaN(seconds)) {
      return "Invalid input";
    }

    const minutesPart = Math.floor(seconds / 60);
    const secondsPart = seconds % 60;

    const formattedMinutes = String(minutesPart).padStart(2, "0");
    const formattedSeconds = String(secondsPart).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <main className="main__container">
      <div className={style.container}>
        <TitleAndSubtitle title={breathing.name} subtitle={breathing.description} />
        <div className={style.exercise}>
          <span data-action-seconds></span>
          <div className={`${style.ball} ${isPlaying ? style.transition__ball : ""}`} data-ball />
          <div className={style.auxiliary__text}>
            <p className={style.action} data-action>
              Clique no play para começar
            </p>
            <div>
              {isPlaying ? (
                <Square
                  onClick={() => {
                    setIsPlaying(false);
                    stopBreath();
                  }}
                  className={style.play__control}
                />
              ) : (
                <Play
                  onClick={() => {
                    setIsPlaying(true);
                    startBreath();
                  }}
                  className={style.play__control}
                />
              )}
              <p className={style.timer}>
                Duração: <span data-duration-element>{formatSecondsToTimeString(breathing.exerciseDuration)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
