import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Login from './components/Login';

const queryClient = new QueryClient();

// Тёмная тема в стиле твоих прошлых лаб
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4f46e5',
    },
    background: {
      default: '#020617',
      paper: '#020617',
    },
  },
  typography: {
    fontFamily:
      '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        {/* Верхняя панель */}
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          sx={{
            borderBottom: '1px solid rgba(148,163,184,0.3)',
            bgcolor: 'rgba(15,23,42,0.9)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Car Shop
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', fontSize: 13 }}
            >
              React • MUI • React Query
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Контент ближе к верхнему бару */}
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <QueryClientProvider client={queryClient}>
            <Login />
          </QueryClientProvider>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
