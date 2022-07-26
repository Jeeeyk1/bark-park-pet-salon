import { Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import { useEffect, useState } from "react";

import db from "../utils/db";

const pageSize = 5;

export default function AppPagination(props, { setProducts }) {
  const topRatedProducts = props;
  const service = {
    getData: ({ from, to }) => {
      return new Promise((resolve, reject) => {
        const data = topRatedProducts.slice(from, to);
        resolve({
          count: topRatedProducts.length,
          data: data,
        });
      });
    },
  };

  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {
    service
      .getData({ from: pagination.from, to: pagination.to })

      .then((response) => {
        setPagination({ ...pagination, count: response.count });

        setProducts(response.data);
      });
  }, [pagination.from]);

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination({ ...pagination, from: from, to: to });
  };

  return (
    <Box
      justifyContent={"center"}
      alignItems="center"
      display={"flex"}
      sx={{
        margin: "20px 0px",
      }}
    >
      <Pagination
        count={Math.ceil(pagination.count / pageSize)}
        onChange={handlePageChange}
      ></Pagination>
    </Box>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Products.find(
    { isFeatured: true },
    "-reviews"
  )
    .lean()

    .limit(3);
  const topRatedProductsDocs = await Products.find({}, "-reviews")
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
