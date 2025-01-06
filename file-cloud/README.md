To build a full-stack JavaScript app that is functionally similar to cloud, you'll need to create a service that allows users to upload files and then provides information about those files, such as their size and content type. You can use Node.js and Express.js for the backend and a front-end framework like React for the user interface. Here are the steps to create such an app:

**1. Set up your development environment:**
   - Install Node.js and npm (Node Package Manager) if you haven't already.

**2. Create a new project directory:**
   - Open your terminal and create a new directory for your project.

```bash
mkdir file-metadata-app
cd file-metadata-app
```

**3. Initialize your project:**
   - Run `npm init` to initialize your project and follow the prompts to set up your `package.json` file.

**4. Install required packages:**
   - You'll need Express.js for the server and potentially other packages for handling file uploads and front-end components. Install them using `npm`:

```bash
npm install express multer cors react react-dom axios
```

**5. Set up the backend:**

   - Create a `server.js` file in your project directory and set up your Express server:

```javascript
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
```

**6. Create the front-end:**

   - Create a `client` directory in your project and set up a basic React application:

```bash
npx create-react-app client
cd client
```

   - Replace the contents of `src/App.js` with a file upload form and logic to send the file to the server:

```javascript
// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData);
      setFileData(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <h1>File Metadata Microservice</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {fileData && (
        <div>
          <h2>File Information:</h2>
          <p>Original Name: {fileData.originalname}</p>
          <p>MIME Type: {fileData.mimetype}</p>
          <p>Size: {fileData.size} bytes</p>
        </div>
      )}
    </div>
  );
}

export default App;
```

**7. Start the application:**

   - In your project root, start both the server and the client:

```bash
node server.js
```

   - In another terminal window, navigate to the `client` directory and start the React app:

```bash
cd client
npm start
```

**8. Test your app:**
   - Visit `http://localhost:3000` in your browser to test the app.

You've now created a full-stack JavaScript app that allows users to upload files and provides information about those files. You can further customize and expand this app as needed, including adding more features, improving the user interface, and enhancing error handling.
