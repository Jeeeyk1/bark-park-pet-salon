import nc from "next-connect";
import Product from "../../../../models/Product";
import db from "../../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  try {
    const product = await Product.findById(req.query.id);
    // db.disconnect();
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving product" });
  }
});

export default handler;
