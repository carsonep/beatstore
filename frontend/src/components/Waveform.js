import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#ddd",
  progressColor: "#e08b27",
  cursorColor: "#fff",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 150,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
});

export default function Waveform({ url }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  // Only use MediaElement backend for Safari
  const isSafari =
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent || "") ||
    /iPad|iPhone|iPod/i.test(navigator.userAgent || "");

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(
    (volume) => {
      setPlay(false);
      if (isSafari) {
        wavesurfer.backend = "MediaElement";
      }

      const options = formWaveSurferOptions(waveformRef.current);
      wavesurfer.current = WaveSurfer.create(options);

      wavesurfer.current.load(url);

      wavesurfer.current.on(
        "ready",
        function () {
          // https://wavesurfer-js.org/docs/methods.html
          // wavesurfer.current.play();
          // setPlay(true);

          // make sure object stillavailable when file loaded
          if (wavesurfer.current) {
            wavesurfer.current.setVolume(volume);
            setVolume(volume);
          }
        },
        [url, volume]
      );

      // Removes events, elements and disconnects Web Audio nodes.
      // when component unmount
      return () => wavesurfer.current.destroy();
    },
    [url]
  );

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  return (
    <div className="my-3">
      <div id="waveform" ref={waveformRef} />
      <div className="control-space">
        <div
          className="controls my-3"
          style={{
            display: "flex",
            alignItems: "center",
            flex: "1",
          }}
        >
          <button className="play-btn" onClick={handlePlayPause}>
            {!playing ? (
              <i
                className="fas fa-play"
                style={{
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "center",
                }}
              ></i>
            ) : (
              <i
                className="fas fa-pause"
                style={{
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "center",
                }}
              ></i>
            )}
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: "1",
              justifyContent: "flex-end",
            }}
          >
            <input
              type="range"
              id="volume"
              name="volume"
              className="range-style"
              // waveSurfer recognize value of `0` same as `1`
              //  so we need to set some zero-ish value for silence
              min="0.01"
              max="1"
              step=".025"
              onChange={onVolumeChange}
              defaultValue={volume}
            />
            <label htmlFor="volume"></label>
          </div>
        </div>
      </div>
    </div>
  );
}
