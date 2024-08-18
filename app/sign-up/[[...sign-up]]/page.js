import { SignedIn, SignedOut, UserButton, SignUp } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Typography, Box, Link } from "@mui/material";

export default function SignUpPage(){

    return (
      <Container id="homepage" maxWidth="100%" sx={{backgroundColor: "#b8c1ec", height: "100vh"}} disableGutters>
        <Toolbar position="static" maxWidth="100vw" sx={{backgroundColor: "#232946"}}>
        <Typography style={{flexGrow:1, fontSize: "24px", fontFamily: "ATAllowe", fontWeight: "bold"}}><Link href="/#homepage" underline="none" sx={{color:"#b8c1ec"}}>Fl.ai.sh</Link></Typography>
        <Typography style={{flexGrow:1, fontSize: "18px", fontFamily: "ATAllowe", fontWeight: "bold"}}><Link href="/#product" underline="none" sx={{color:"#b8c1ec"}}>Product</Link></Typography>
        <Typography style={{flexGrow:1, fontSize: "18px", fontFamily: "ATAllowe", fontWeight: "bold"}}><Link href="/#pricing" underline="none" sx={{color:"#b8c1ec"}}>Pricing</Link></Typography>
        <SignedOut>
          <Button sx={{color:"#b8c1ec", fontSize: "14px", fontWeight: "bold"}} href="/sign-in">Login</Button>
          <Button sx={{color:"#b8c1ec", fontSize: "14px", fontWeight: "bold"}} href="/sign-up">Sign Up</Button>
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </Toolbar>
        <Container maxWidth='100vw'>
            <Box display="flex" flexDirection='column' alignItems="center" justifyContent={"center"} mt={6}>
                <Typography variant="h4" mb={3} sx={{fontFamily: "ATAllowe", fontWeight:'bold'}}>Sign Up</Typography>
                <SignUp />
            </Box>
        </Container>
      </Container>
    )
}