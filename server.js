app.post("/pay", async (req, res) => {
  const { amount, phone, reference } = req.body;

  try {
    const response = await fetch("https://paydrc.gofreshbakery.net/api/v5/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        merchant_id: "j#bCzo4,AeMwQ(Plb",
        merchant_secrete: "jzL6yChmAtPIixacib",
        amount: amount,
        currency: "USD",
        action: "debit",
        customer_number: phone,
        firstname: "Client",
        lastname: "Client",
        email: "client@email.com",
        reference: reference,
        method: "airtel"
      })
    });

    const data = await response.json();

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: "Erreur paiement" });
  }
});
