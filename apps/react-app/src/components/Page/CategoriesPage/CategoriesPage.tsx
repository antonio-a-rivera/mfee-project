import { Grid } from "@mui/material";

import { PageContainer } from "./CategoriesPage.styles";
import { Category } from "../../../types";
import { useState } from "react";
import { useEffect } from "react";

// Importaciones para la tabla
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const categories: Category[] = [
  { id: "663fef70d513515319551d1f", name: "Travel" },
  { id: "663fef70d513515319546d1f", name: "Food" },
];

function CategoriesPage() {
  // ACT 6 - Create a state called "rows" (Done)
  const [rows, setRows] = useState<Category[]>([]);

  // ACT 6 - Call setRows when the component is mounted for first time, use "categories" variable as new value. (Done)
  useEffect(() => {
    setRows(categories);
  }, []);

  //ACT 6 - Create two empty functions called "handleEditItem" and "handleDeleteItem" (Done)
  function handleEditItem() {
  };

  function handleDeleteItem() {
  };

  // Componente de tabla para mostrar las categorías
  function BasicTable() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Name</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <PageContainer container>
      Categories Page
      <Grid item sx={{ justifyContent: "flex-end", display: "flex" }}>
        //Add category (Icon button)
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {/* ACT 6 - Create a component called "Table" to display category names (Done) */
          <BasicTable />}
      </Grid>
      //Modal
    </PageContainer>
  );
}

export default CategoriesPage;
