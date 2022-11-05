const express = require("express");
const { db } = require("./firebase.js");
const stripe = require("stripe")(
  "sk_test_51M0KGaSDfnVBrdujH04TsbfdshfWPUtwgCrphuQDBjgumyUpZuFvjcQvgJ5lb0s5fKC2IkzQg7SP8Duf4Chpr7oz00HGPo7Grx"
);
const endpointSecret =
  "whsec_156653f2d3d12e2df3d97acab8facb50f54d165b20a251abfe3328eaf800c895";

const PORT = 4343;
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// POST request to add payment link to session document
/*
  post("/session-payment-link")
  body: {
    doctorName,
    sessionID,
    consultationFee,
  }
*/
app.post("/session-payment-link", async (req, res) => {
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
      paymentLink: paymentLink.url,
    });

    res.status(200).json({ paymentLink: paymentLink.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/generic-payment-link", async (req, res) => {
  try {
    const { name, reqPrice, isPharma } = req.body;
    const parsedPrice = +reqPrice;

    const product = await stripe.products.create({
      name: name,
    });

    const price = await stripe.prices.create({
      currency: "inr",
      unit_amount: parsedPrice * 100,
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

    if (isPharma) {
      // firestore collection part
    }

    res.status(200).json({ paymentLink: paymentLink.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
