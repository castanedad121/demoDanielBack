const { createHmac } = require("crypto");

const generateSignature = (req, res) => {
  const {
    dateTimeTransaction,
    transactionId,
    amount,
    currency,
    merchantBuyerId,
    documentType,
    document,
    hashKey,
  } = req.body;

  console.log("🔹 Request signature recibido:", req.body);

  // Validar campos requeridos
  if (
    !dateTimeTransaction ||
    !transactionId ||
    !amount ||
    !currency ||
    !merchantBuyerId ||
    !documentType ||
    !document ||
    !hashKey
  ) {
    return res.status(400).json({
      code: "400",
      message:
        "Todos los campos son requeridos: dateTimeTransaction, transactionId, amount, currency, merchantBuyerId, documentType, document, hashKey",
    });
  }

  // Concatenar los campos en el orden correcto
  // DateTimeTransaction + TransactionId + Amount + Currency + MerchantBuyerId + DocumentType + Document
  const stringToSign = `${dateTimeTransaction}${transactionId}${parseFloat(amount).toFixed(2)}${currency}${merchantBuyerId}${documentType}${document}`;

  console.log("🔹 Cadena a firmar:", stringToSign);

  // Generar HMAC-SHA256 en Base64
  const signature = createHmac("sha256", Buffer.from(hashKey, "utf-8"))
    .update(Buffer.from(stringToSign, "utf-8"))
    .digest("base64");

  console.log("🔹 Signature generado:", signature);

  res.status(200).json({
    code: "200",
    message: "Signature generado correctamente",
    response: {
      signature,
      stringToSign,
    },
  });
};

module.exports = { generateSignature };
