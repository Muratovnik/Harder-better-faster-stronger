import { useCallback, useState, useMemo } from "react";

import { useEvent, useMount } from "react-use";

import styles from "./MusicButtonsList.module.css";

import MusicButton from "../MusicButton/MusicButton.jsx";

const MusicButtonsList = () => {
  const [modes, setModes] = useState([1, 2, 3, 4, 5, 6]);
  const [sounds, setSounds] = useState([
    {
      name: "WorkIt",
      keyCode: 81,
      key: "Q",
    },
    {
      name: "MakeIt",
      keyCode: 87,
      key: "W",
    },
    {
      name: "DoIt",
      keyCode: 69,
      key: "E",
    },
    {
      name: "MakesUs",
      keyCode: 82,
      key: "R",
    },
    {
      name: "Harder",
      keyCode: 65,
      key: "A",
    },
    {
      name: "Better",
      keyCode: 83,
      key: "S",
    },
    {
      name: "Faster",
      keyCode: 68,
      key: "D",
    },
    {
      name: "Stronger",
      keyCode: 70,
      key: "F",
    },
    {
      name: "MoreThan",
      keyCode: 85,
      key: "U",
    },
    {
      name: "Hour",
      keyCode: 73,
      key: "I",
    },
    {
      name: "Our",
      keyCode: 79,
      key: "O",
    },
    {
      name: "Never",
      keyCode: 80,
      key: "P",
    },
    {
      name: "Ever",
      keyCode: 74,
      key: "J",
    },
    {
      name: "After",
      keyCode: 75,
      key: "K",
    },
    {
      name: "WorkIs",
      keyCode: 76,
      key: "L",
    },
    {
      name: "Over",
      keyCode: 186,
      key: ";",
    },
  ]);

  const [currentMode, setCurentMode] = useState(1);
  const [pressedKey, setPressedKey] = useState(null);
  const [location, setLocation] = useState(null);

  const sources = useMemo(
    () =>
      sounds.map((sound) => ({
        key: sound.keyCode,
        audios: modes.map(
          (num) =>
            new Audio(
              `${process.env.PUBLIC_URL}/sounds/${sound.name + num}.mp3`
            )
        ),
      })),
    [modes, sounds]
  );

  const onKeyDown = useCallback(
    ({ keyCode, key }) => {
      setPressedKey(key);
      if (modes.includes(Number(key))) {
        setCurentMode(key);
      } else {
        const sound = sources.find((element) => element.key === keyCode);

        if (sound) {
          sound.audios[currentMode - 1].play();
        }
      }
    },
    [currentMode, modes, sources]
  );

  useEvent("keydown", onKeyDown);
  useEvent("keyup", () => {
    setPressedKey(null);
  });

  useMount(() => {
    setLocation(window.location.origin + window.location.pathname);
  });

  return (
    <div className={styles.MusicButtonsList}>
      {modes.map((mode, i) => (
        <MusicButton onClick={() => setCurentMode(mode)} key={i}>
          {mode}
        </MusicButton>
      ))}
      {sounds.map(({ key }, i) => (
        <span
          key={i}
          className={
            key.toLocaleLowerCase() === pressedKey?.toLocaleLowerCase()
              ? styles["keyboard-key-active"]
              : styles["keyboard-key"]
          }
        >
          {key}
        </span>
      ))}
    </div>
  );
};

export default MusicButtonsList;
