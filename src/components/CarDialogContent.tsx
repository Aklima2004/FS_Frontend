import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { Car } from '../types';

type DialogFormProps = {
  car: Car;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function CarDialogContent({ car, handleChange }: DialogFormProps) {
  return (
    <DialogContent>
      <Stack spacing={2} mt={1}>
        <TextField
          label="Brand"
          name="brand"
          value={car.brand}
          onChange={handleChange}
          fullWidth
          size="small"
        />
        <TextField
          label="Model"
          name="model"
          value={car.model}
          onChange={handleChange}
          fullWidth
          size="small"
        />
        <TextField
          label="Color"
          name="color"
          value={car.color}
          onChange={handleChange}
          fullWidth
          size="small"
        />
        <TextField
          label="Year"
          name="modelYear"
          value={car.modelYear}
          onChange={handleChange}
          fullWidth
          size="small"
        />
        <TextField
          label="Reg.nr."
          name="registrationNumber"
          value={car.registrationNumber}
          onChange={handleChange}
          fullWidth
          size="small"
        />
        <TextField
          label="Price"
          name="price"
          value={car.price}
          onChange={handleChange}
          fullWidth
          size="small"
        />
      </Stack>
    </DialogContent>
  );
}

export default CarDialogContent;
