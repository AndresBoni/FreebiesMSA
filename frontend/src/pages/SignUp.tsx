import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import api from "@/config/axiosConfig";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setToken, setUser } from "@/store/slices/userSlice";

const registerUser = async (
  name: string,
  email: string,
  password: string,
  agreeTerms: boolean,
  role: string,
) => {
  if (!agreeTerms) {
    throw new Error("You must agree to the terms and conditions.");
  }

  try {
    const response = await api.post("/api/account/register", {
      name,
      email,
      password,
      image: null,
      role,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorData = error.response.data;
      if (typeof errorData === "object") {
        const firstError = Array.isArray(errorData) ? errorData[0] : errorData;
        if (typeof firstError === "object" && firstError.description) {
          throw new Error(firstError.description);
        }
      }
      if (error.response.status === 400) {
        throw new Error("Please verify your details and try again.");
      } else if (error.response.status === 500) {
        throw new Error(
          "An error occurred while creating your account. Please try again later.",
        );
      }
    }
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasNumber: false,
  });
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { type } = useParams<{ type?: string }>();
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    if (token) {
      navigate(token === "Company" ? "/company" : "/");
    }
  }, [token, navigate]);

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidFullName = (name: string): boolean => {
    return name.length > 4;
  };

  const validatePassword = (value: string) => {
    setPassword(value);
    setPasswordValidation({
      minLength: value.length >= 6,
      hasUpperCase: /[A-Z]/.test(value),
      hasNumber: /[0-9]/.test(value),
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setNameError(null);
    setEmailError(null);

    if (!isValidFullName(name)) {
      setNameError("Name must be more than 4 characters.");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const { token, id, role } = await registerUser(
        name,
        email,
        password,
        agreeTerms,
        type === "store" ? "Company" : "Customer",
      );

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ id, name, email, role }));
      dispatch(setToken(token));
      dispatch(setUser({ id, name, email, role }));

      navigate(role === "Company" ? "/company" : "/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {type === "store" ? "Register Store" : "Sign Up"}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label={type === "store" ? "Store Name" : "Full Name"}
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!nameError}
                helperText={nameError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => validatePassword(e.target.value)}
              />
              <Box sx={{ mt: 1 }}>
                <Typography
                  variant="body2"
                  color={
                    passwordValidation.minLength ? "green" : "text.secondary"
                  }
                >
                  {passwordValidation.minLength
                    ? "✓ Minimum length of 6 characters"
                    : "Minimum length of 6 characters required"}
                </Typography>
                <Typography
                  variant="body2"
                  color={
                    passwordValidation.hasUpperCase ? "green" : "text.secondary"
                  }
                >
                  {passwordValidation.hasUpperCase
                    ? "✓ Contains at least one uppercase letter"
                    : "At least one uppercase letter required"}
                </Typography>
                <Typography
                  variant="body2"
                  color={
                    passwordValidation.hasNumber ? "green" : "text.secondary"
                  }
                >
                  {passwordValidation.hasNumber
                    ? "✓ Contains at least one number"
                    : "At least one number required"}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    color="primary"
                    required
                  />
                }
                label="I agree to the Terms and Conditions."
              />
            </Grid>
          </Grid>
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {type === "store" ? "Register" : "Sign Up"}
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
