'use client'

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Typography, Box, Grid, Link } from "@mui/material";
import Head from 'next/head'
import Typewriter from 'typewriter-effect'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useUser } from "@clerk/nextjs"
import "./globals.css"

export default function Home() {
  const {isLoaded, isSignedIn} = useUser()
  return (
    <Container maxWidth="120vw" disableGutters sx={{position: 'relative'}}>
      <Container id="homepage" maxWidth="100%" sx={{backgroundColor: "#232946", height: "110vh"}}>
      <Head>
        <title>Fl.ai.sh</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>
      <Toolbar position="static" maxWidth="100vw" sx={{backgroundColor: "#232946"}}>
        <Typography style={{flexGrow:1, fontSize: "24px", fontFamily: "ATAllowe", fontWeight: "bold"}}><Link href="#homepage" underline="none" sx={{color:"#b8c1ec"}}>Fl.ai.sh</Link></Typography>
        <Typography style={{flexGrow:1, fontSize: "18px", fontFamily: "ATAllowe", fontWeight: "bold"}}><Link href="#product" underline="none" sx={{color:"#b8c1ec"}}>Product</Link></Typography>
        <Typography style={{flexGrow:1, fontSize: "18px", fontFamily: "ATAllowe", fontWeight: "bold"}}><Link href="#pricing" underline="none" sx={{color:"#b8c1ec"}}>Pricing</Link></Typography>
        <Typography style={{fontSize: "18px", fontFamily: "ATAllowe", fontWeight: "bold", marginRight: 15}}><Link href={(!isLoaded || !isSignedIn) ? "/sign-in" : "/flashcards"} underline="none" sx={{color:"#b8c1ec"}}>Dashboard</Link></Typography>
        <SignedOut>
          <Button sx={{color:"#b8c1ec", fontSize: "14px", fontWeight: "bold"}} href="/sign-in">Login</Button>
          <Button sx={{color:"#b8c1ec", fontSize: "14px", fontWeight: "bold"}} href="/sign-up">Sign Up</Button>
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </Toolbar>

      <Box 
      sx={{
        textAlign:'center',
        my:4,
        positon: 'absolute',
        top: "50%",
        left: '50%',
        transform: "translateY(150%)"
      }}>
        <div style={{fontSize: "48px", color: "#fffffe", fontWeight: "bold"}}>
          <Typewriter onInit={(typewriter) => { typewriter.typeString('Welcome to Fl.ai.sh!').start();}}></Typewriter>
        </div>
        <Typography variant="h5" sx={{color: "#b8c1ec"}} gutterBottom>The easiest way to make flashcards from a simple text</Typography>
        <Button 
        sx={{mt:2, 
        padding: "10px 20px", 
        backgroundColor:"#eebbc3", 
        color:"#232946",
        ':hover': { backgroundColor: "#f3cfd5"}, 
        textTransform: "capitalize", 
        fontWeight: "700"}} href={(!isLoaded || !isSignedIn) ? "/sign-in" : "/generate"}>Get Started<ArrowOutwardIcon/>
        </Button>
      </Box>
      </Container>
      <Container id="product" maxWidth="100%" sx={{backgroundColor: "#C8B39E", height: "110vh", alignItems: "center"}}>
      <Grid container spacing={4} color="#151931">  
          <Grid item xs={12} md={4} marginTop={3}>
            <div style={{maxWidth:"500px", backgroundColor: "#A096A5"}}>
              <Typography textAlign="center" variant="h6" gutterBottom>Easy Text Input</Typography>
              <Typography textAlign="center">
                {' '}
                Simply input your text and let our software do the rest. Creating flashcards has never been easier.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4} marginTop={3}>
            <div>
              <Typography variant="h6" textAlign="center" gutterBottom>Smart Flashcards</Typography>
              <Typography textAlign="center">
                {' '}
                Our AI intelligently breaks down your text into concise flashcards, perfect for studying
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4} marginTop={3}>
            <div>
              <Typography variant="h6" textAlign="center" gutterBottom>Accessible Anywhere</Typography>
              <Typography textAlign="center">
                {' '}
                Access your flashcards from any device, at any time. Study on the go with ease.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Container id="pricing" maxWidth="100%" sx={{backgroundColor: "#A096A5", height: "110vh"}}>

      </Container>
    </Container>
  )
}
