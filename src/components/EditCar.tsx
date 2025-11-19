import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Car, CarResponse, CarEntry } from '../types';
import { updateCar } from '../api/carapi';
import CarDialogContent from './CarDialogContent';

type FormProps = {
  cardata: CarResponse;
};

function EditCar({ cardata }: FormProps) {
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
    mutationFn: updateCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleClickOpen = () => {
    setCar({
      brand: cardata.brand,
      model: cardata.model,
      color: cardata.color,
      registrationNumber: cardata.registrationNumber,
      modelYear: cardata.modelYear,
      price: cardata.price,
    });
    setOpen(true);
  };

  const handleClose = () => {
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

  const handleSave = () => {
    const url = cardata._links.self.href;
    const entry: CarEntry = { car, url };

    mutate(entry);

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

  return (
    <>
      <Tooltip title="Edit car">
        <IconButton
          aria-label="edit"
          size="small"
          onClick={handleClickOpen}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditCar;
