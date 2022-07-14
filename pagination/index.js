import { Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import { useEffect, useState } from "react";
import service from "../services";

const pageSize = 5;

export default function AppPagination({ setProducts }) {
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
  }, [pagination.from,]);

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
