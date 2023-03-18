import nc from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  try {
    const products = await Product.find({});
    await db.disconnect();
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default handler;
