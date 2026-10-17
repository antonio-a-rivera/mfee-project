// Forms de categorias
import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { validator } from "../../common/utils";
import { Category, CategoryFormInputs, NewCategory } from "../../types";

const emptyInputs: CategoryFormInputs = {
  name: { value: "", error: "" },
}

interface CategoryFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addCategory: (category: {name:string}) => void;
  updateCategory: (category: NewCategory) => void;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  selectedCategory?: Category | null;
}

const CategoryForm = ({ open, setOpen, addCategory, updateCategory, setSelectedCategory, selectedCategory }: CategoryFormProps) => {
  const [categoryInputs, setCategoryInputs] = React.useState(emptyInputs);

  React.useEffect(() => {
    if (!selectedCategory) return;
    const existingCategory = {
      name: { value: selectedCategory.name, error: "" },
    };
    setCategoryInputs(existingCategory);
  }, [selectedCategory]);

  const handleClose = () => {
    setCategoryInputs(emptyInputs);
    setSelectedCategory(null);
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedCategory) {
      const updatedCategory: NewCategory = {
        _id: selectedCategory._id,
        name: categoryInputs.name.value,
      };
      updateCategory(updatedCategory);
    }
    else {
      const newFormCategory = {
        name: categoryInputs.name.value,
      };
      addCategory(newFormCategory);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCategoryInputs((prevInputs) => ({
      ...prevInputs,
      [name]: { value, error: "" },
    }));
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const error = validator({ name, value });
    setCategoryInputs((prevInputs) => ({
      ...prevInputs,
      [name]: { value, error },
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}>
      <DialogTitle>
        {selectedCategory ? "Edit Category" : "Add Category"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={categoryInputs.name.value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!categoryInputs.name.error}
          helperText={categoryInputs.name.error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm;