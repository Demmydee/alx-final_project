// server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const fileData = {
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size
  };

  res.json(fileData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

