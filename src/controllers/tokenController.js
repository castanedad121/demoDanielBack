const https = require("https");

const generateToken = (req, res) => {
  const { requestSource, merchantCode, orderNumber, publicKey, amount } =
    req.body;
  const transactionId = String(
    req.headers.transactionid || req.headers.TransactionId
  ); // Maneja ambas variantes

  console.log("🔹 Request recibido:", req.body);
  console.log("🔹 transactionId recibido:", transactionId);

  if (!transactionId || transactionId.length < 5 || transactionId.length > 40) {
    return res.status(400).json({
      code: "400",
      message: "transactionId inválido. Debe tener entre 5 y 40 caracteres.",
    });
  }

  if (
    !requestSource ||
    !merchantCode ||
    !orderNumber ||
    !publicKey ||
    !amount
  ) {
    return res.status(400).json({
      code: "400",
      message: "Todos los campos del body son requeridos.",
    });
  }

  const requestBody = JSON.stringify({
    requestSource: String(requestSource).toUpperCase(),
    merchantCode: String(merchantCode),
    orderNumber: String(orderNumber),
    publicKey: String(publicKey),
    amount: String(parseFloat(amount).toFixed(2)),
  });

  console.log("🔹 Body enviado a Izipay:", requestBody);

  const options = {
    method: "POST",
    hostname: "sandbox-api-pw.izipay.pe",
    path: "/security/v1/Token/Generate",
    headers: {
      transactionId: transactionId, // Versión en minúsculas
      TransactionId: transactionId, // Versión en mayúsculas
      "Content-Type": "application/json",
      Accept: "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };

  const apiRequest = https.request(options, (apiResponse) => {
    let chunks = [];

    apiResponse.on("data", (chunk) => {
      chunks.push(chunk);
    });

    apiResponse.on("end", () => {
      const responseBody = Buffer.concat(chunks).toString();
      console.log("🔹 Respuesta de Izipay:", responseBody);

      try {
        res.status(apiResponse.statusCode).json(JSON.parse(responseBody));
      } catch (error) {
        console.error("❌ Error al parsear la respuesta:", error);
        res
          .status(500)
          .json({ message: "Error en la respuesta del servidor." });
      }
    });
  });

  apiRequest.on("error", (error) => {
    console.error("❌ Error en la solicitud:", error);
    res.status(500).json({ message: "Error al conectar con Izipay." });
  });

  apiRequest.write(requestBody);
  apiRequest.end();
};

module.exports = { generateToken };
