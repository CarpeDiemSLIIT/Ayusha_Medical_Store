import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
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
import ConfirmDelete from "../confirmDelete";

export default function Product() {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [productData, setProductdata] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getProductdata = async () => {
      const reqData = await fetch(
        `http://localhost:3101/api/seller/products/all/${user._id}`,
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
      setFilterData(resData);
      // console.log(resData);
    };
    getProductdata();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const deleteProduct = await fetch(
        `http://localhost:3101/api/seller/products/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await deleteProduct.json();
      setProductdata(resData);
      setFilterData(resData);
      // console.log(resData);
      navigate(`/products/all/${user._id}`);

      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  //search Function
  const handleSearch = (event) => {
    const getSearch = event.target.value;
    setQuery(getSearch);
    //console.log(getSearch);

    if (getSearch.length > 0) {
      const searchProduct = productData.filter((product) =>
        product.productName.toLowerCase().includes(getSearch)
      );
      setProductdata(searchProduct);
    } else {
      setProductdata(filterData);
    }
    setQuery(getSearch);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Box sx={{ gridColumn: "span 4" }}>
        <TextField
          fullWidth
          label="Search...."
          id="fullWidth"
          value={query}
          onChange={(e) => handleSearch(e)}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product Image</TableCell>
              <TableCell align="right">Product Name</TableCell>
              <TableCell align="right">Stock&nbsp;</TableCell>
              <TableCell align="right">Net Price&nbsp;($)</TableCell>
              <TableCell align="right">Listing Price&nbsp;($)</TableCell>
              <TableCell align="right">Description&nbsp;</TableCell>
              <TableCell align="right">Actions&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData.map((productData, index) => (
              <TableRow
                key={productData._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    src={`${productData.imageURL}`}
                    alt="product name"
                    width="200px"
                    height="200px"
                  />
                </TableCell>
                <TableCell align="right">{productData.productName}</TableCell>
                <TableCell align="right">{productData.stock}</TableCell>
                <TableCell align="right">{productData.listingPrice}</TableCell>
                <TableCell align="right">{productData.netPrice}</TableCell>
                <TableCell align="right">{productData.description}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    title="Edit"
                    onClick={() => {
                      navigate(`/products/update/${productData._id}`);
                      // window.location.href = `/products/update/${productData._id}`;
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    title="Delete"
                    onClick={() => {
                      //deleteProduct(productData._id);
                      setOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <ConfirmDelete
                    open={open}
                    handleClose={handleClose}
                    deleteProduct={() => {
                      deleteProduct(productData._id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
