import nc from "next-connect";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";

import { isAuth } from "../../../../utils/auth";

const handler = nc({});
handler.use(isAuth);
handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  order.totalSales = order.totalPrice;
  if (order && !order.isPaid) {
    order.isPaid = true;
    order.paidAt = Date.now();
    const paidOrder = await order.save();
    await db.disconnect();
    res.send({ message: "order paid", order: paidOrder });
  }
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const deliveredOrder = await order.save();
    await db.disconnect();
    res.send({ message: "order delivered", order: deliveredOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "order not found" });
  }
});

export default handler;
