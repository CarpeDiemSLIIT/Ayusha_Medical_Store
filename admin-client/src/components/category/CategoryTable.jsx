import * as React from "react";
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

export default function CategoryTable({ categories }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left" width="80%">
              Category Name
            </TableCell>
            <TableCell align="center" width="20%">
              Options
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Avatar
                  variant="square"
                  alt="Image"
                  // src={`/assets/${category.imageURL}`}
                  src={category.imageURL}
                  sx={{ width: 100, height: 100 }}
                />
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">{category.name}</Typography>
              </TableCell>

              <TableCell align="center">
                <IconButton
                  aria-label="close"
                  disabled
                  sx={{
                    color: (theme) => theme.palette.warning.main,
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="close"
                  disabled
                  sx={{
                    color: (theme) => theme.palette.warning.main,
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
  );
}
