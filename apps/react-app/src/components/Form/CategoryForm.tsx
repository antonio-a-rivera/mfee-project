// Forms de categorias
import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { validator } from "../../common/utils";
import { CategoryFormInputs, NewCategory } from "../../types";

const emptyInputs: CategoryFormInputs = {
  name: { value: "", error: "" },
}

interface CategoryFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addCategory: (category: NewCategory) => void;
  updateCategory: (category: NewCategory) => void;
  setSelectedCategory: React.Dispatch<React.SetStateAction<NewCategory | null>>;
  selectedCategory?: NewCategory | null;
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
        id: selectedCategory.id,
        name: categoryInputs.name.value,
      };
      handleClose();
      updateCategory(updatedCategory);
    }
    else {
      const newFormCategory: NewCategory = {
        id: Math.random().toString(36).substring(2, 9),
        name: categoryInputs.name.value,
      };
      handleClose();
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
