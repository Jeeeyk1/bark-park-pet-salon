import nc from "next-connect";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";

import { isAuth } from "../../../../utils/auth";

const handler = nc({});
handler.use(isAuth);
handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  console.log(order.isReceived + "received");
  if (order && !order.isPaid) {
    order.isPaid = true;
    order.paidAt = Date.now();
    const paidOrder = await order.save();
    await db.disconnect();
    res.send({ message: "order paid", order: paidOrder });
  }
  if (order) {
    console.log(order.isReceived + "received");
    order.isReceived = true;
    order.receivedAt = Date.now();
    const receivedOrder = await order.save();
    await db.disconnect();
    res.send({ message: "order received", order: receivedOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "order not found" });
  }
});

export default handler;
