import nc from "next-connect";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";

import onError from "../../../../utils/error";
const handler = nc({
  onError,
});

handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.numberOfRefundRequests = 1;
    order.applyRefund = true;
    order.appliedAt = Date.now();
    order.description = req.body.description;
    const description = await order.save();
    await db.disconnect();
    res.send({ message: "Refund request submitted!", order: description });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "order not found" });
  }
});

export default handler;
