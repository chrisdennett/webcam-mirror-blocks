export const createBlockCanvas = (inputCanvas, blockSize, type = "line2") => {
  const { width: inputW, height: inputH } = inputCanvas;

  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = inputW * blockSize;
  outputCanvas.height = inputH * blockSize;
  const outputCtx = outputCanvas.getContext("2d");

  const inputCtx = inputCanvas.getContext("2d");
  let imgData = inputCtx.getImageData(0, 0, inputW, inputH);
  let pixels = imgData.data;

  let r, g, b, brightness, blockX, blockY;
  outputCtx.fillStyle = "red";
  const halfBlockSize = blockSize / 2;

  for (let y = 0; y < inputH; y++) {
    for (let x = 0; x < inputW; x++) {
      const i = (y * inputW + x) * 4;

      r = pixels[i];
      g = pixels[i + 1];
      b = pixels[i + 2];

      brightness = r * 0.2126 + g * 0.7152 + b * 0.0722;

      const decimalPercentage = 1 - brightness / 255;

      // block width deterimined by brightness
      const brightnessSize = blockSize * decimalPercentage;
      const offset = (blockSize - brightnessSize) / 2;

      blockX = offset + x * blockSize;
      blockY = offset + y * blockSize;

      outputCtx.beginPath();
      if (type === "square") {
        outputCtx.fillRect(blockX, blockY, brightnessSize, brightnessSize);
      } else if (type === "circle") {
        outputCtx.arc(
          blockX + halfBlockSize,
          blockY + halfBlockSize,
          brightnessSize / 2,
          0,
          Math.PI * 2
        );
        outputCtx.fill();
      } else if (type === "line1") {
        outputCtx.lineWidth = brightnessSize / 2;
        outputCtx.moveTo(blockX, blockY);
        outputCtx.lineTo(blockX, blockY + blockSize);
        outputCtx.stroke();
      } else if (type === "line2") {
        outputCtx.lineWidth = brightnessSize / 2;
        outputCtx.moveTo(blockX + blockSize, blockY);
        outputCtx.lineTo(blockX, blockY + blockSize);
        outputCtx.stroke();
      }
      outputCtx.closePath();
    }
  }

  return outputCanvas;
};
