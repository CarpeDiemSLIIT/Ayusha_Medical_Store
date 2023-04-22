import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Box, Chip, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { deleteRow } from "../features/cart/cartSlice.js";
export default function CartItemsTable({ items, total, options }) {
  const dispatch = useDispatch();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Product</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Total</TableCell>
            {options && <TableCell align="center">Options</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Avatar
                  variant="square"
                  alt="Image"
                  src={item.productID.imageURL}
                  sx={{ width: 100, height: 100 }}
                />
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">
                  {item.productID.productName}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">
                  {item.productID.listingPrice}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">{item.quantity}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">{item.priceForRow}</Typography>
              </TableCell>
              {options && (
                <TableCell align="center">
                  <IconButton
                    aria-label="close"
                    sx={{
                      color: (theme) => theme.palette.warning.main,
                    }}
                    onClick={() => {
                      dispatch(
                        deleteRow({
                          cartItemId: item._id,
                        })
                      );
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} align="right">
              <Typography variant="h5">Cart Total</Typography>
            </TableCell>
            <TableCell colSpan={1} align="center">
              <Typography variant="h5">{total}</Typography>
            </TableCell>
            <TableCell colSpan={1}></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
