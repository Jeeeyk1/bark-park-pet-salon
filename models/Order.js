import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      zipCode: { type: Number, required: true },
      contactNumber: { type: Number, required: true },
      city: { type: String, reuireq: true },
      barangay: { type: String, required: true },
    },

    paymentMethod: { type: String, required: true },
    paymentResult: { id: String, status: String, email_address: String },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    totalSales: { type: Number, required: false },
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
    paidAt: { type: Date },
    isApproved: { type: Boolean, required: false, default: false },
    numberOfRefundRequests: { type: Number, required: false, default: 0 },
    approvedAt: { type: Date },
    applyRefund: { type: Boolean, required: true, default: false },
    appliedAt: { type: Date, required: false },
    description: { type: String, required: false },
    status: { type: String, required: true, default: "pending" },
    imageRefund: { type: String, required: false },
    referenceNumber: {
      type: Number,
      required: false,
    },
    shippedOutBy: { type: String, required: false },
  },

  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
