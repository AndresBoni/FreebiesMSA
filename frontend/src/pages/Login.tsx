import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import api from "@/config/axiosConfig";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";

const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/api/account/login", { email, password });
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
      }
      if (error.response.status === 401) {
        throw new Error("Invalid email or password. Please try again.");
      } else if (error.response.status === 500) {
        throw new Error(
          "An error occurred while logging in. Please try again later.",
        );
      }
    }
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setFormError(null);

    try {
      const { token, id, role, name } = await loginUser(email, password);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ id, name, email, role }));
      dispatch(setToken(token));
      dispatch(setUser({ id, name, email, role }));

      navigate(role === "Company" ? "/company" : "/");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Email")) {
          setEmailError(error.message);
        } else if (error.message.includes("Password")) {
          setPasswordError(error.message);
        } else {
          setFormError(error.message);
        }
      } else {
        setFormError("An unexpected error occurred. Please try again.");
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
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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
                helperText={emailError || ""}
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError || ""}
              />
            </Grid>
          </Grid>
          {formError && <Typography color="error">{formError}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
