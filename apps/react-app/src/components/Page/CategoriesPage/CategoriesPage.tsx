import { Alert, Grid } from "@mui/material";

import { PageContainer } from "./CategoriesPage.styles";
import { Category } from "../../../types";
import { useState } from "react";
import { useEffect } from "react";
import CategoryForm from "../../Form/CategoryForm";
import { NewCategory, CreateCategoryPayload } from "../../../types";

// Importaciones para la tabla
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {
  getCategories as apiGetCategories,
  createCategory as apiCreateCategory,
  updateCategory as apiUpdateCategory,
  deleteCategory as apiDeleteCategory,
} from "../../../api/endpoints/categories";


function CategoriesPage() {
  const [openForm, setOpenForm] = useState(false);
  // ACT 6 - Create a state called "rows" (Done)
  const [rows, setRows] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);

  // ACT 6 - Call setRows when the component is mounted for first time, use "categories" variable as new value. (Done)
  useEffect(() => {
    setError(null);
    apiGetCategories({
      onLoading: (isLoading) => setLoading(isLoading),
      onSuccess: (data) => {
        setRows(data);
      },
      onError: (err) => {
        setError(err.message ?? "Error getting categories");
      },
    });
  }, []);

  //ACT 6 - Create two empty functions called "handleEditItem" and "handleDeleteItem" (Done)
  function handleEditItem(category: Category) {
    setSelectedCategory(category);
    setOpenForm(true);
  };

  const handleDeleteItem = (category: Category) => {
    setError(null);
    const categoryID = category._id;
    if (!categoryID) {
      setError("Invalid category id");
      return;
    }
    apiDeleteCategory({
      categoryID,
      onLoading: (isLoading) => setLoading(isLoading),
      onSuccess: () => {
        setRows((prevRows) =>
          prevRows.filter((row) => (row._id) !== categoryID)
        );
      },
      onError: (err) => {
        setError(err.message ?? "Error deleting category");
      },
    });
  };

  const handleOpenForm = () => {
    setSelectedCategory(null);
    setOpenForm(true);
  }

  const addCategory = (category: CreateCategoryPayload) => {
    setError(null);
    apiCreateCategory({
      newCategory: category,
      onLoading: (isLoading) => setLoading(isLoading),
      onSuccess: (created) => {
        setRows((prevRows) => [...prevRows, created]);
        setOpenForm(false);
        setSelectedCategory(null);
      },
      onError: (err) => {
        setError(err.message ?? "Error creating category");
      },
    });
  };

  const updateCategory = (updatedCategory: NewCategory) => {
    setError(null);
    apiUpdateCategory({
      payload: { _id: updatedCategory._id, name: updatedCategory.name },
      onLoading: (isLoading) => setLoading(isLoading),
      onSuccess: (data) => {
        setRows((prevRows) =>
          prevRows.map((category) => (category._id === data._id ? data : category))
        );
        setOpenForm(false);
        setSelectedCategory(null);
      },
      onError: (err) => {
        setError(err.message ?? "Error updating category");
      },
    });
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
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row._id}
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
  
// ACT 9 - Use the getList, create, edit, delete and update categories APIs  (Done)
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
        {error && <Alert severity="error">{error}</Alert>}
        {loading && <div>Loading...</div>}
        {/* ACT 6 - Create a component called "Table" to display category names (Done) */
          <BasicTable />}
      </Grid>
      {/* ACT 8 - Create a Modal to add new categories and update existing ones (Done) */}
      <CategoryForm open={openForm} setOpen={setOpenForm} addCategory={addCategory} updateCategory={updateCategory} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
          
    </PageContainer>
  );
}

export default CategoriesPage;
