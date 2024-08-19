'use client'

import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button, Container, Toolbar, Typography, Box, Grid, Link } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export default function Pricing() {

    
  const handleSubmitPro = async () => {
    const checkoutSession = await fetch('/api/checkout_session/pro', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000' //CHANGE THIS BEFORE DEPLOYMENT -------------------------------------------------------[[]]
      }
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    })

    if (error) {
      console.warn(error.message)
    }
  }

      
  const handleSubmitBasic = async () => {
    const checkoutSession = await fetch('/api/checkout_session/basic', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000' //CHANGE THIS BEFORE DEPLOYMENT -------------------------------------------------------[[]]
      }
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    })

    if (error) {
      console.warn(error.message)
    }
  }

  return(
    <Container maxWidth="100vw"  sx={{position: 'absolute', top:'50%', left:'50%', transform: "translate(-50%, -50%)"}}>
      <Box sx={{mb:6, textAlign:'center'}}>
          <Typography variant="h4" gutterBottom sx={{fontFamily: "ATAlowwe", fontWeight:'bold'}}>Pick the best price for you</Typography>
          <Typography variant="h6" gutterBottom sx={{fontFamily: "ATAlowwe", fontWeight:'bold'}}>Every option is tailored specifically to bring you everything you need!</Typography>
          <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
              <Box sx={{
              padding:3,
              border: "1px solid grey",
              borderRadius: 2,
              backgroundColor: "#eebbc3",
              }}>
              <Typography variant="h5" gutterBottom sx={{fontFamily: "ATAlowwe", fontWeight:'bold'}}>Free</Typography>
              <Typography variant="h1" sx={{fontFamily: "ATAlowwe", fontWeight:'bold'}}> $0 </Typography>
              <Typography variant="h6" gutterBottom sx={{fontFamily: "ATAlowwe", fontWeight:'bold'}}>FREE</Typography>
              <Typography><CheckIcon/>LIMITED FLASHCARD FEATURES</Typography>
              <Typography><CheckIcon/>LIMITED STORAGE</Typography>
              </Box>
          </Grid>
          <Grid item xs={12} md={4}>
              <Box sx={{
              padding:3,
              border: "1px solid grey",
              borderRadius: 2,
              backgroundColor:"#232946",
              color: "#fffffe"
              }}>
              <Typography variant="h5" gutterBottom sx={{fontFamily: "ATAlowwe", fontWeight:'bold'}}>Basic</Typography>
              <Typography variant="h1" sx={{fontFamily: "ATAlowwe", fontWeight:'bold'}}> $2 </Typography>
              <Typography variant="h6" gutterBottom sx={{fontFamily: "ATAlowwe", fontWeight:'bold'}}>Good Deal!</Typography>
              <Typography><CheckIcon/>BETTER FLASHCARD FEATURES</Typography>
              <Typography><CheckIcon/>BETTER STORAGE</Typography>
              <Typography><CheckIcon/>CUSTOMER SUPPORT</Typography>
              <Button variant="contained" color="primary" sx={{mt:2}} onClick={handleSubmitBasic}>
              Choose Basic
              </Button>
              </Box>
          </Grid>
          <Grid item xs={12} md={4}>
              <Box sx={{
              padding:3,
              border: "1px solid grey",
              borderRadius: 2,
              backgroundColor: "#b8c1ec"
              }}>
              <Typography variant="h5" gutterBottom sx={{fontFamily: "ATAlowwe", fontWeight:'bold'}}>Pro</Typography>
              <Typography variant="h1" sx={{fontFamily: "ATAlowwe", fontWeight:'bold'}}> $5 </Typography>
              <Typography variant="h6" gutterBottom sx={{fontFamily: "ATAlowwe", fontWeight:'bold'}}>Best Deal!</Typography>
              <Typography><CheckIcon/>ALL FLASHCARD FEATURES</Typography>
              <Typography><CheckIcon/>UNLIMITED STORAGE</Typography>
              <Typography><CheckIcon/>PRIORITY SUPPORT</Typography>
              <Typography><CheckIcon/>BETTER EXPERIENCE</Typography>
              <Button variant="contained" color="primary" sx={{mt:2}} onClick={handleSubmitPro}>
              Choose Pro
              </Button>
              </Box>
          </Grid> 
          </Grid>
      </Box>
    </Container>
)}
