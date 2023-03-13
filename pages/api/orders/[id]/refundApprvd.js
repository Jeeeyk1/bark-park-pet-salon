import nc from "next-connect";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";

const handler = nc({});

handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isApproved = true;
    order.approvedAt = Date.now();
    order.totalSales = req.body.totalSalesUpdate;
    order.status = "Approved";
    const totalSales = await order.save();
    order.save;

    res.send({
      message: "Refund request Approved!",
      order: totalSales,
    });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "refund not found" });
  }
});

export default handler;
