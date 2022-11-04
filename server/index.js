const express = require("express");
const { db } = require("./firebase.js");
const stripe = require("stripe")(
  "sk_test_51M0KGaSDfnVBrdujH04TsbfdshfWPUtwgCrphuQDBjgumyUpZuFvjcQvgJ5lb0s5fKC2IkzQg7SP8Duf4Chpr7oz00HGPo7Grx"
);

const PORT = 4343;

const app = express();
app.use(express.json());

// POST request to add payment link to session document
/*
  post("/session-payment-link")
  body: {
    doctorName,
    sessionID,
    consultationFee,
  }
*/
app.get("/session-payment-link", async (req, res) => {
  try {
    const { doctorName, sessionID, consultationFee } = req.body;
    const doctorFee = +consultationFee;
    const product = await stripe.products.create({
      name: doctorName,
    });

    const price = await stripe.prices.create({
      currency: "inr",
      unit_amount: doctorFee * 100,
      product: product.id,
    });

    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      after_completion: {
        type: "redirect",
        redirect: {
          url: "http://localhost:3000/",
        },
      },
    });

    const sessionRef = db.collection("session").doc(sessionID);
    await sessionRef.update({
      paymentLink: paymentLink,
      complete: Number(2),
    });

    res.status(200).json({ paymentLink: paymentLink.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
