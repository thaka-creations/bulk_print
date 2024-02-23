const express = require("express");
const app = express();
const printFile = require("./print.js"); 

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.get("/print", async (req, res) => {
  const fileLinks = [
    'http://192.168.214.200/sharedservice/media/2024/02/22/18/bf3a3889-b54e-43a9-b93e-14978f9247ca.pdf',
    'https://css4.pub/2017/newsletter/drylab.pdf',
    'https://www.princexml.com/samples/invoice/invoicesample.pdf'
  ];

  try {
    for (const fileLink of fileLinks) {
      await printFile(fileLink); // Invoke printFile for each file link
    }
    res.send("Files sent to print successfully.");
  } catch (error) {
    res.status(500).send(`Error printing files: ${error.message}`);
  }
});
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
