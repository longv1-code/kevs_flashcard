'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import getStripe from "@/utils/get-stripe"
import { useSearchParams } from "next/navigation"
import { Button, Container, Toolbar, Typography, Box, Link, CircularProgress } from "@mui/material";
import { useUser, SignedIn, SignedOut, UserButton  } from "@clerk/nextjs"




const ResultPage = () => {
    const {isLoaded, isSignedIn, user} = useUser()
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) return

            try{
                const res = await fetch(`/api/checkout_session/pro?session_id=${session_id}`)
                const sessionData = await res.json()
                if (res.ok) {
                    setSession(sessionData)
                } else {
                    setError(sessionData.error)
                }
            }
            catch(err) {
                setError("An error occured")
            }
            finally {
                setLoading(false)
            }

        }
        fetchCheckoutSession()

    }, [session_id])

    if (loading) {
        return (
            <Container maxWidth="100vw" sx={{
                textAlign: 'center',
                mt:4,
            }}>
                <CircularProgress/>
                <Typography variant="h6"> Loading... </Typography>
            </Container>
        )
    }

    if (error) {
        return(
            <Container maxWidth="100vw" sx={{
                textAlign: 'center',
                mt:4,
            }}>
                <Typography variant="h6">
                    {error}
                </Typography>
            </Container>
        )
    }

    return (
        <Container maxWidth="100vw" disableGutters sx={{height: "100vh", backgroundColor: "#b8c1ec"}}>
        <Toolbar position="static" maxWidth="100vw" sx={{backgroundColor: "#232946"}}>
        <Typography style={{flexGrow:1, fontSize: "24px", fontFamily: "ATAllowe", fontWeight: "bold"}}><Link href="/#homepage" underline="none" sx={{color:"#b8c1ec"}}>Fl.ai.sh</Link></Typography>
        <Typography style={{flexGrow:1, fontSize: "18px", fontFamily: "ATAllowe", fontWeight: "bold"}}><Link href="/#product" underline="none" sx={{color:"#b8c1ec"}}>Product</Link></Typography>
        <Typography style={{flexGrow:1, fontSize: "18px", fontFamily: "ATAllowe", fontWeight: "bold"}}><Link href="/#pricing" underline="none" sx={{color:"#b8c1ec"}}>Pricing</Link></Typography>
        <Typography style={{fontSize: "18px", fontFamily: "ATAllowe", fontWeight: "bold", marginRight: 15}}><Link href={(!isLoaded || !isSignedIn) ? "/sign-in" : "/flashcards"} underline="none" sx={{color:"#b8c1ec"}}>Dashboard</Link></Typography>
        <SignedOut>
          <Button sx={{color:"#b8c1ec", fontSize: "14px", fontWeight: "bold"}} href="/sign-in">Login</Button>
          <Button sx={{color:"#b8c1ec", fontSize: "14px", fontWeight: "bold"}} href="/sign-up">Sign Up</Button>
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </Toolbar>
        <Container maxWidth="100vw" sx={{
            textAlign: 'center',
            mt:4,
        }}>
            {
                session.payment_status === 'paid' ? (
                    <>
                    <Typography variant="h4">Thank you for purchasing</Typography>
                    <Box sx={{mt:22}}>
                        {/* <Typography variant="h6">Session ID: {session_id}</Typography> */}
                        <Typography variant="body1">
                            We have received your payment. You will receive an email with the order details shortly
                        </Typography> 
                    </Box>
                    </>
                ) : 
                (<>
                <Typography variant="h4">Payment Failed</Typography>
                    <Box sx={{mt:22}}>
                        {/* <Typography variant="h6">Session ID: {session_id}</Typography> */}
                        <Typography variant="body1">
                            Your payment was not sucessful. Please try again.
                        </Typography> 
                    </Box>
                </>)
            }
        </Container>
        </Container>
    )
}

export default ResultPage