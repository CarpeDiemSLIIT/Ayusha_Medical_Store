import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function AllSeller() {
  const token = useSelector((state) => state.auth.user.token);

  const navigate = useNavigate();

  const [productData, setProductdata] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getProductdata = async () => {
      const reqData = await fetch(
        `http://admin-ayusha.com/api/admin/seller/all`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await reqData.json();

      setProductdata(resData);
      //setFilterData(resData);
    };
    getProductdata();
  }, []);

  const suspendSeller = async (id) => {
    try {
      const suspendSeller = await fetch(
        `http://admin-ayusha.com/api/admin/seller/suspend/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await suspendSeller.json();
      setProductdata(resData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Seller Name</TableCell>
              <TableCell align="right">Email&nbsp;</TableCell>
              <TableCell align="right">Status&nbsp;</TableCell>
              <TableCell align="right">Actions&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Sellers Found
                </TableCell>
              </TableRow>
            )}
            {productData.map((productData, index) => (
              <TableRow
                key={productData._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">
                  {productData.firstName} {productData.lastName}
                </TableCell>
                <TableCell align="right">{productData.email}</TableCell>
                <TableCell align="right">{productData.status}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    title="Suspend"
                    onClick={() => {
                      suspendSeller(productData._id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
