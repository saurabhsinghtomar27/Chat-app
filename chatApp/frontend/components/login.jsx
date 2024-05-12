import React from 'react'
import { useState } from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Home from '../components/Home';
function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const signUp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email")
    const password = data.get("password")
    const name = data.get("name")
    const confirmpassword = data.get("confirmpassword")
    if (!email || !name || !password || !confirmpassword)
      return toast.error("All Fields are Required")
    if (password !== confirmpassword) {
      return toast.error('Password does not match');
    }
    axios.post("http://localhost:5000/api/auth/signup", { email, password, name }).then(e => {
      if (e.data === "User already exist") {
        toast.error("User already exist")
      }
      else {
        navigate('/chat')
        setTimeout(() => { toast.success(e.data) }, 1000)

      }
    }
    ).catch(e => toast.error(e.response.data))
    
      
  }
  const signin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")
    const password = data.get("password")
    // console.log(email, password)
    if (!email || !password)
      return toast.error("All Fields are Required")
    axios.post("http://localhost:5000/api/auth/login", { email, password }).then(e => {
      if (e.data === "User does not exist")
        toast.error(e.data)
      else if (e.data === "Invalid password")
        toast.error(e.data)
      else {
        setTimeout(() => { toast.success("Succesfully Sigin") }, 3000)
        navigate('/chat')
      }

    }
    ).catch(e => toast.error(e.response.data))
       
  }
  return (
    <>
      {/* <Home /> */}
      {isLogin ?
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={signin} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                // onClick={login}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item >
                  <button onClick={() => setIsLogin(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "blue" }}>
                    {"Don't have an account? Sign Up"}
                  </button>

                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        :
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" onSubmit={signUp} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm password"
                type="password"
                id="confirmpassword"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <button onClick={() => setIsLogin(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "blue" }}>
                    {"Already have an account? Sign In"}
                  </button>

                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>


      }
      <Toaster />
    </>
  )
}

export default Login