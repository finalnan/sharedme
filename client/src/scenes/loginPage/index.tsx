import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  TextField,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { setLogin } from 'store/authSlice';

interface LoginValues {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
});

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isNonMible = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = async (values: LoginValues, onSubmitProps: any) => {
    const loggedInResponse = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate('/home');
    }
  };

  return (
    <Box>
      <Box
        width="100%"
        bgcolor={theme.palette.background.alt}
        padding="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          SharedMe
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        padding="2rem"
        margin="2rem auto"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.alt}
      >
        <Typography
          fontWeight={500}
          variant="h5"
          sx={{ marginBottom: '1.5rem' }}
        >
          Welcome to SharedMe, the social Media for Sociopaths!
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0,1fr)"
                sx={{
                  '& > div': {
                    gridColumn: isNonMible ? undefined : 'span 4',
                  },
                }}
              >
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="email"
                  value={values.email}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="password"
                  value={values.password}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: 'span 4' }}
                />
              </Box>
              <Box>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    margin: '2rem 0',
                    padding: '1rem',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.alt,
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  LOGIN
                </Button>
                <Typography
                  onClick={() => {
                    resetForm();
                    navigate('/register');
                  }}
                  sx={{
                    textDecoration: 'underline',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      cursor: 'pointer',
                      color: theme.palette.primary.light,
                    },
                  }}
                >
                  Don't have an account ? Sign up here.
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
