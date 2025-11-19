import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addCar } from '../api/carapi';
import { Car } from '../types';
import CarDialogContent from './CarDialogContent';

function AddCar() {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    mutate(car);

    setCar({
      brand: '',
      model: '',
      color: '',
      registrationNumber: '',
      modelYear: 0,
      price: 0,
    });

    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCar({
      ...car,
      [name]:
        name === 'modelYear' || name === 'price'
          ? Number(value)
          : value,
    });
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          textTransform: 'none',
          borderRadius: '999px',
          fontWeight: 600,
        }}
      >
        New Car
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCar;
