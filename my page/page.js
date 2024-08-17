'use client'

import Image from "next/image";
import { useUser } from "@clerk/nextjs"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button, Container, Toolbar, Typography, Box, Link } from "@mui/material";
import Head from 'next/head'
import Typewriter from 'typewriter-effect'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function Home() {
  const {isLoaded, isSignedIn, user} = useUser()

  return (
    <Container maxWidth="100vw" disableGutters sx={{backgroundColor: "#F5ECEC", height: "100vh", position: 'relative'}}>
      <Head>
        <title>SmartCram</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>
      <Toolbar position="static" maxWidth="100vw" sx={{backgroundColor: "#dbc5c5"}}>
        <Typography style={{flexGrow:1, fontSize: "24px"}}><Link href="/" underline="none" sx={{color:"#333333"}}>fl.ai.sh</Link></Typography>
          <Typography style={{flexGrow:1, fontSize: "18px"}}><Link href="/product" underline="none" sx={{color:"#333333"}}>Product</Link></Typography>
          <Typography style={{flexGrow:1, fontSize: "18px"}}><Link href="/pricing" underline="none" sx={{color:"#333333"}}>Pricing</Link></Typography>
          <Typography style={{fontSize: "18px", marginRight: 15}}><Link href="/flashcards" underline="none" sx={{color:"#333333"}}>Dashboard</Link></Typography>
        <SignedOut>
          <Button sx={{color:"#000", fontSize: "14px"}} href="/sign-in">Login</Button>
          <Button sx={{color:"#000", fontSize: "14px"}} href="/sign-up">Sign Up</Button>
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
        <div style={{fontSize: "48px"}}>
          <Typewriter onInit={(typewriter) => { typewriter.typeString('Welcome to fl.ai.sh!').start();}}></Typewriter>
        </div>
        <Typography variant="h5" gutterBottom>The easiest way to make flashcards from a simple text</Typography>
        <Button sx={{mt:2, padding: "10px 20px", backgroundColor:"#dbc5c5", color:"#333333",':hover': { backgroundColor: "#BFBFBF"}, textTransform: "capitalize", fontWeight: "700"}} href="/generate">Get Started<ArrowOutwardIcon/></Button>
      </Box>
    </Container>
  )
}
