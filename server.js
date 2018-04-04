
const express = require('express');
const multer  = require('multer');
const upload = multer({ limits: {fileSize: 2000000} });
const app = express();


app.use(express.static('public'))


app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.post("/", upload.single("file"), (req, res) => {
  const size = req.file.size;
  res.send({size: size});
})


app.get("*", (req, res) => {
  res.status(404).end("Page not found");
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err)
})


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})


