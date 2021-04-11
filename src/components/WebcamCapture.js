import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import { createBlockCanvas } from "../logic/createBlockCanvas";
import { createSmallCanvas } from "../logic/createSmallCanvas";

const videoConstraints = {
  width: 800,
  height: 600,
  facingMode: "user"
};

export const WebcamCapture = () => {
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);

  useAnimationFrame(() => onFrameUpdate());

  const onFrameUpdate = useCallback(() => {
    if (!webcamRef || !webcamRef.current) return;
    const frameCanvas = webcamRef.current.getCanvas();
    if (frameCanvas) {
      if (!canvasRef || !canvasRef.current) return;
      const screenCanvas = canvasRef.current;

      const smallCanvas = createSmallCanvas(frameCanvas, 40, 30);
      const blockCanvas = createBlockCanvas(smallCanvas, 10);

      const ctx = screenCanvas.getContext("2d");
      screenCanvas.width = blockCanvas.width;
      screenCanvas.height = blockCanvas.height;
      ctx.drawImage(blockCanvas, 0, 0);
    }
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />

      <Webcam
        audio={false}
        height={320}
        // style={{ position: "fixed", left: -10000 }}
        ref={webcamRef}
        mirrored={true}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
    </div>
  );
};
