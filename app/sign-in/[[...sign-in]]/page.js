import { SignedIn, SignedOut, UserButton, SignIn } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Typography, Box, Link } from "@mui/material";

export default function SignUpPage(){

    return (
        <>
        <Toolbar position="static" maxWidth="100vw" sx={{backgroundColor: "#dbc5c5"}}>
        <Typography style={{flexGrow:1, fontSize: "24px"}}><Link href="/" underline="none" sx={{color:"#333333"}}>fl.ai.sh</Link></Typography>
          <Typography style={{flexGrow:1, fontSize: "18px"}}><Link href="/product" underline="none" sx={{color:"#333333"}}>Product</Link></Typography>
          <Typography style={{flexGrow:1, fontSize: "18px"}}><Link href="/pricing" underline="none" sx={{color:"#333333"}}>Pricing</Link></Typography>
        <SignedOut>
          <Button sx={{color:"#000", fontSize: "14px"}} href="/sign-in">Login</Button>
          <Button sx={{color:"#000", fontSize: "14px"}} href="/sign-up">Sign Up</Button>
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </Toolbar>
        <Container maxWidth='100vw'>
            <Box display="flex" flexDirection='column' alignItems="center" justifyContent={"center"}  mt={6}>
                <Typography variant="h4" mb={3}>Sign In</Typography>
                <SignIn />
            </Box>
        </Container>
    </>
    )
}