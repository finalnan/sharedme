import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Home from 'scenes/homePage';
import Login from 'scenes/loginPage';
import Profile from 'scenes/profilePage';
import { useMemo } from 'react';
import { useAppSelector } from 'store';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { themeSettings } from 'theme';

import { createTheme } from '@mui/material/styles';
import Register from 'scenes/registerPage/Register';

function App() {
  const mode = useAppSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useAppSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={isAuth ? <Navigate to="/home" /> : <Login />}
            />
            <Route
              path="/register"
              element={isAuth ? <Navigate to="/home" /> : <Register />}
            />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <Profile /> : <Navigate to="/" />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
