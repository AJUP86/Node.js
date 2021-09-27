const express = require("express");
const fs = require("fs");
const app = express();

// YOUR CODE GOES IN HERE
app.use(express.json());

app.post("/blogs", (req, res) => {
  // How to get the title and content from the request??
  const { title, content } = req.body;
  const camelCaseTitle = camelize(title);
  fs.writeFileSync(camelCaseTitle, content);
  res.end("ok");
});
function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}
app.put("/blogs/:title", (req, res) => {
  // How to get the title and content from the request?
  const titleFromParam = req.params.title;
  const { title, content } = req.body;
  console.log({ reqBody: req.body });

  // What if the request does not have a title and/or content?
  console.log(fs.existsSync(title));
  if (fs.existsSync(camelize(titleFromParam))) {
    fs.writeFileSync(camelize(title), content);
    res.end("ok");
  } else {
    // Send response with error message
    throw new Error("blog not found");
  }
});

app.delete("/blogs/:title", (req, res) => {
  const titleFromParam = req.params.title;
  const { title } = req.body;
  if (fs.existsSync(camelize(titleFromParam))) {
    // Add condition here
    fs.unlinkSync(camelize(titleFromParam));
    res.end("ok");
  } else {
    // Respond with message here
  }
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);
