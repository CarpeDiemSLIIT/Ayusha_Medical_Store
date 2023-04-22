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
export default function CartItemsTable({ items, total }) {
  const dispatch = useDispatch();
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Product</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Total</TableCell>
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
                  // src={`/assets/${item.productID.imageURL}`}
                  src={item.productID.imageURL}
                  sx={{ width: 75, height: 75 }}
                />
              </TableCell>
              <TableCell align="left">
                <Typography>{item.productID.productName}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{item.productID.listingPrice}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{item.quantity}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{item.priceForRow}</Typography>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} align="right">
              <Typography>Cart Total</Typography>
            </TableCell>
            <TableCell colSpan={1} align="center">
              <Typography>$ {total}</Typography>
            </TableCell>
            <TableCell colSpan={1}></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
