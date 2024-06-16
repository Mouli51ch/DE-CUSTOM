const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const path = require("path"); // Import path module for file path operations
const __path = path.resolve("public");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Path to the Go script (assuming it's in the root directory)
const goScript = path.join(__dirname, "main.go");

// Handle POST requests to /api/chat
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Execute Go script with user message as input
    const command = `go run ${goScript} "${userMessage}"`;
    const { stdout, stderr } = await executeCommand(command);

    if (stderr) {
      console.error(`Go script stderr: ${stderr}`);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request" });
      return;
    }

    // Assuming Go script returns a JSON response
    const botResponse = JSON.parse(stdout);
    res.json({ message: botResponse.message });
  } catch (error) {
    console.error("Error executing Go script:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
});

// Function to execute shell command and return promise
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

app.get("/", (req, res) => {
  res.sendFile(`${__path}/index.html`);
});

app.use(express.static(__path));

app.post("/submit", (req, res) => {
  const goScript = path.join(__dirname, "main.go");
  const command = `go run ${goScript}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Go script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Go script stderr: ${stderr}`);
      return;
    }
    console.log(`Go script output: ${stdout}`);
  });
  res.send(200);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
