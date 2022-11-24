import nc from "next-connect";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";

const handler = nc({});

handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.referenceNumber = req.body.referenceNumber;
    const paidOrderRef = await order.save();
    await db.disconnect();
    res.send({ message: "order paid", order: paidOrderRef });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "order not found" });
  }
});

export default handler;
