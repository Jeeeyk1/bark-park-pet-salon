import nc from "next-connect";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";

const handler = nc({});

handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.numberOfRefundRequests = 1;
    order.applyRefund = true;
    order.appliedAt = Date.now();
    order.description = req.body.description;
    order.imageRefund = req.body.imageRefund;
    order.reason = req.body.reason;
    const description = await order.save();
    const imageRefund = await order.save();
    const reason = await order.save();

    res.send({
      message: "Refund request submitted!",
      order: description,
      imageRefund,
      reason,
    });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "refund not found" });
  }
});

export default handler;
