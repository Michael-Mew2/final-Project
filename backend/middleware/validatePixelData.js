const maxCanvasSize = parseInt(process.env.CANVAS_GRID_SIZE)

const hexColorPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

// ==========

export const validatePixelData = (req, res, next) => {
  const { x, y, color } = req.body;

  if (x === undefined || y === undefined || !color)
    return res.status(400).json({ msg: "Pixel data is incomplete!" });


  if (x < 0 || y < 0 || x >= maxCanvasSize || y >= maxCanvasSize) {
    return res.status(400).json({ msg: "Pixel is out of bounds!" });
  }

  
  if (!hexColorPattern.test(color)) {
    return res.status(400).json({ msg: "Invalid color format!" });
  }

  next();
};

// ----------

export const validatePixelDataSocket = (data) => {
  const {x, y, color} = data;

  if (x === undefined || y === undefined || !color) {
    throw new Error("Pixel data is incomplete!");
  };

  if (x < 0 || y < 0 || x >= maxCanvasSize || y >= maxCanvasSize) {
    throw new Error("Pixel is out of bounds!");
  };

  if (!hexColorPattern.test(color)) {
    throw new Error("Invalid color format!")
  }
  
}