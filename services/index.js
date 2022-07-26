import Product from "../models/Product";

import db from "../utils/db";





const service  = {

  getData: ({ from, to }) => {
    return new Promise((resolve, reject) => {
      const data = Product.slice(from, to);
      resolve({
        count: Product.length,
        data: data,
      });
    });
  },
};
export default  service

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    "-reviews"
  )
    .lean()

    .limit(3);
  const topRatedProductsDocs = await Product.find({}, "-reviews")
    .lean()
    .sort({
      rating: -1,
    })
    .limit(6);
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}
