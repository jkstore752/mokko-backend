const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/pay", async (req, res) => {
  try {
    const response = await axios.post(
      "https://paydrc.gofreshbakery.net/api/v5/",
      {
        merchant_id: process.env.MERCHANT_ID,
merchant_secrete: process.env.MERCHANT_SECRET,
        amount: req.body.amount,
        currency: "CDF",
        action: "debit",
        customer_number: req.body.phone,
        firstname: "Client",
        lastname: "Client",
        email: "client@email.com",
        reference: req.body.reference,
        method: "airtel",
        callback_url: "https://mokko-backend.onrender.com/callback"
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).send("Erreur paiement");
  }
});

app.post("/callback", (req, res) => {
  console.log("Paiement reçu :", req.body);
  res.status(200).json({ message: "OK" });
});

app.listen(3000, () => console.log("Serveur lancé"));
