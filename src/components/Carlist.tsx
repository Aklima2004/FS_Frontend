import { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  DataGrid,
  GridColDef,
  GridCellParams,
} from '@mui/x-data-grid';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import { getCars, deleteCar } from '../api/carapi';
import { CarResponse } from '../types';
import AddCar from './AddCar';
import EditCar from './EditCar';

function Carlist() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  // --- FETCH CARS ---
  const {
    data,
    error,
    isSuccess,
  } = useQuery<CarResponse[], Error>({
    queryKey: ['cars'],
    queryFn: getCars,
  });

  // --- DELETE CAR ---
  const { mutate } = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  // --- EXPORT TO CSV ---
  const handleExportCsv = () => {
    if (!data || data.length === 0) {
      return;
    }

    const headers = [
      'Brand',
      'Model',
      'Color',
      'Registration number',
      'Model year',
      'Price',
    ];

    const rows = data.map((car) => [
      car.brand,
      car.model,
      car.color,
      car.registrationNumber,
      car.modelYear.toString(),
      car.price.toString(),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'cars.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // --- COLUMNS (чуть уже, чтобы влезало без горизонтального скролла) ---
  const columns: GridColDef[] = [
    { field: 'brand', headerName: 'Brand', width: 160 },
    { field: 'model', headerName: 'Model', width: 160 },
    { field: 'color', headerName: 'Color', width: 130 },
    {
      field: 'registrationNumber',
      headerName: 'Reg.nr.',
      width: 150,
    },
    { field: 'modelYear', headerName: 'Model Year', width: 120 },
    { field: 'price', headerName: 'Price', width: 120 },

    {
      field: 'edit',
      headerName: '',
      width: 60,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <EditCar cardata={params.row as CarResponse} />
      ),
    },
    {
      field: 'delete',
      headerName: '',
      width: 60,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <Tooltip title="Delete car">
          <IconButton
            aria-label="delete"
            size="small"
            color="error"
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you want to delete ${params.row.brand} ${params.row.model}?`,
                )
              ) {
                mutate((params.row as CarResponse)._links.car.href);
              }
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  if (!isSuccess) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error when fetching cars...</span>;
  }

  // --- RENDER ---
  return (
    <Box sx={{ mt: 2 }}>
      {/* Заголовок + действия в одной строке, ближе к верху */}
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Inventory
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', fontSize: 13 }}
          >
            Manage cars in your shop: add, edit, delete and export to CSV.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <AddCar />
          <Button
            variant="outlined"
            sx={{
              textTransform: 'none',
              borderRadius: '999px',
            }}
            onClick={handleExportCsv}
          >
            Export CSV
          </Button>
        </Box>
      </Box>

      {/* Карточка с таблицей — шире и ближе к заголовку */}
      <Box
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: '0 18px 40px rgba(15,23,42,0.75)',
          border: '1px solid rgba(148,163,184,0.35)',
          overflow: 'hidden',
        }}
      >
        <DataGrid
          rows={data ?? []}
          columns={columns}
          disableRowSelectionOnClick
          getRowId={(row) => row._links.self.href}
          autoHeight
          sx={{
            border: 0,
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: 'rgba(15,23,42,0.95)',
              borderBottom: '1px solid rgba(148,163,184,0.5)',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid rgba(30,41,59,0.9)',
            },
            '& .MuiDataGrid-row:nth-of-type(odd)': {
              bgcolor: 'rgba(15,23,42,0.9)',
            },
            '& .MuiDataGrid-row:nth-of-type(even)': {
              bgcolor: 'rgba(15,23,42,0.85)',
            },
          }}
        />
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="Car deleted"
      />
    </Box>
  );
}

export default Carlist;
