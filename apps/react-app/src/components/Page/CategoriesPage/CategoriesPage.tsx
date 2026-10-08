import { Grid } from "@mui/material";

import { PageContainer } from "./CategoriesPage.styles";
import { Category } from "../../../types";
import { useState } from "react";
import { useEffect } from "react";
import CategoryForm from "../../Form/CategoryForm";
import { NewCategory } from "../../../types";

// Importaciones para la tabla
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';

const categories: Category[] = [
  { id: "663fef70d513515319551d1f", name: "Travel" },
  { id: "663fef70d513515319546d1f", name: "Food" },
];


function CategoriesPage() {
  const [openForm, setOpenForm] = useState(false);
  // ACT 6 - Create a state called "rows" (Done)
  const [rows, setRows] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<NewCategory | null>(null);

  // ACT 6 - Call setRows when the component is mounted for first time, use "categories" variable as new value. (Done)
  useEffect(() => {
    setRows(categories);
  }, []);

  //ACT 6 - Create two empty functions called "handleEditItem" and "handleDeleteItem" (Done)
  function handleEditItem(category: NewCategory) {
    setSelectedCategory(category);
    setOpenForm(true);
  };

  const handleDeleteItem = (category: NewCategory) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== category.id));
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  }

  const addCategory = (category: NewCategory) => {
    setRows((prevRows) => [...prevRows, category]);
  };

  const updateCategory = (updatedCategory: NewCategory) => {
    setRows((prevRows) =>
      prevRows.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
  };

  // Componente de tabla para mostrar las categorías
  function BasicTable() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Name</TableCell>

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
                <TableCell align="left">{row.name}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEditItem(row)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleDeleteItem(row)}>
                    Delete
                  </Button>
                </TableCell>
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
        {/* ACT 8 - Use the IconButton component (from MUI) to open the Modal (Done) */}
        <Button variant="contained" onClick={handleOpenForm}>
          Add Category
        </Button>
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {/* ACT 6 - Create a component called "Table" to display category names (Done) */
          <BasicTable />}
      </Grid>
      {/* ACT 8 - Create a Modal to add new categories and update existing ones (Done) */}
      <CategoryForm open={openForm} setOpen={setOpenForm} addCategory={addCategory} updateCategory={updateCategory} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
    </PageContainer>
  );
}

export default CategoriesPage;
