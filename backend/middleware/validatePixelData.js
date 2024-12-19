export const validatePixelData = (req, res, next) => {
  const { x, y, color } = req.body;

  if (x === undefined || y === undefined || !color)
    return res.status(400).json({ msg: "Pixeldata is incomplete!" });

  const maxCanvasSize = 1000;

  if (x < 0 || y < 0 || x >= maxCanvasSize || y >= maxCanvasSize) {
    return res.status(400).json({ msg: "Pixel is out of bounds!" });
  }

  const hexColorPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  if (!hexColorPattern.test(color)) {
    return res.status(400).json({ msg: "Invalid color format!" });
  }

  next();
};
