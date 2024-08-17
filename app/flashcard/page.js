'use client'

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { Box, Button, Card, CardActionArea, CardContent, Container, Toolbar, Link, Grid, Typography } from "@mui/material"


import { useSearchParams } from "next/navigation"

export default function Flashcard() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashCards] = useState([])
    const [flipped, setFlipped] = useState([])

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(()=> {
        async function getFlashcard(){
            if (!search || !user) return
            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(colRef)
            const flashcards = []

            docs.forEach((doc) => {
                flashcards.push({id: doc.id, ... doc.data()})
            })
            setFlashCards(flashcards)

        }
        getFlashcard()
    }, [user, search])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    if (!isLoaded || !isSignedIn) {
        return <></>
    }


    return (
        <Container sx={{backgroundColor: "#b8c1ec"}} disableGutters maxWidth="100vw">
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
        <Container maxWidth="100vw">
            <Grid container spacing={3} sx={{mt:4}}>
            {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index} >
                                <Card>
                                    <CardActionArea onClick={() => {
                                        handleCardClick(index)
                                    }}>
                                        <CardContent sx={{backgroundColor: "#121629"}}>
                                            <Box sx={{
                                                perspective: "1000px",
                                                '& > div': {
                                                    transition: 'transform 0.6s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: "200px",
                                                    backgroundColor:"#232946",
                                                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                    transform: flipped[index] 
                                                    ? 'rotateY(180deg)' 
                                                    : "rotateY(0deg)"
                                                },
                                                '& > div > div': {
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: "100%",
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    boxSizing: "border-box",
                                                    backgroundColor: '#232946'
                                                },
                                                '& > div > div:nth-of-type(2)': {
                                                    transform: "rotateY(180deg)"
                                                },
                                                
                                            }}>
                                                <div>
                                                    {flashcard.front.length >= 70 
                                                    ? 
                                                    <div style={{overflow: "auto", display:'flex', alignItems:'flex-start'}}>
                                                        <Typography variant="h5" component={"div"} sx={{color:"#fffffe"}}>
                                                            {flashcard.front}
                                                        </Typography>
                                                    </div>
                                                    :
                                                    <div >
                                                        <Typography variant="h5" component={"div"} sx={{color:"#fffffe"}}>
                                                            {flashcard.front}
                                                        </Typography>
                                                    </div>
                                                    } 
                                                    {flashcard.back.length >= 70
                                                    ?
                                                    <div style={{overflow: "auto", display:'flex', alignItems:'flex-start'}}>
                                                    <Typography variant="h5" component={"div"} sx={{color:"#fffffe"}}>
                                                        {flashcard.back}
                                                    </Typography>
                                                    </div>
                                                    :
                                                    <div>
                                                        <Typography variant="h5" component={"div"} sx={{color:"#fffffe"}}>
                                                            {flashcard.back}
                                                        </Typography>
                                                    </div> 
                                                    }
                                                </div>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
        </Container>
        </Container>
    )
}