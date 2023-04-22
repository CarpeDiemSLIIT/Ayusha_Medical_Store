import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../features/orders/orderSlice";
import OrderView from "../components/order/OrderView";
import CollapsibleTable from "../components/order/CollapsibleOrderTable";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
export default function OrderManagement() {
  const params = useParams();

  //dispatch action to get order list

  const dispatch = useDispatch();

  const { orders, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.order
  );
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  if (isLoading || !orders) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (isError) {
    return <div>{message}</div>;
  }

  return (
    <div>
      <Typography variant="h3" sx={{ textTransform: "capitalize" }}>
        {params.status} Orders
      </Typography>
      <br />
      {params.status === "all" ? (
        <CollapsibleTable orders={orders} />
      ) : (
        <CollapsibleTable
          orders={orders.filter((order) => order.orderStatus == params.status)}
        />
      )}
    </div>
  );
}
