const express = require("express");
const cors = require("cors");
const tokenRoutes = require("./routes/tokenRoutes");

const app = express();
const port = process.env.PORT || 4242;

app.use(express.json());
app.use(cors());

app.use("/api", tokenRoutes);

app.get("/", (req, res) => {
  const currentTime = new Date().toLocaleString();
  res.send(`
    <html>
      <head>
        <title>Estado del Servidor</title>
      </head>
      <body>
        <h1>🚀 Servidor corriendo correctamente</h1>
        <p id="time">🕒 Hora actual: ${currentTime}</p>
        <script>
          function updateTime() {
            const timeElement = document.getElementById('time');
            const currentTime = new Date().toLocaleString();
            timeElement.innerHTML = '🕒 Hora actual: ' + currentTime;
          }
          setInterval(updateTime, 1000); // Actualiza cada 1 segundo
        </script>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});
