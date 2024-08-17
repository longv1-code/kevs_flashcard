'use client'

import { useUser } from "@clerk/nextjs"
import { db } from "@/firebase"
import { Box, Button,Toolbar, Link, Card, CardActionArea, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation"
import {doc, collection, setDoc, getDoc, writeBatch} from 'firebase/firestore'


export default function Generate() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashCards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleSubmit = async() => {
        fetch('api/generate', {
            method: 'POST',
            body: text,
        })
        .then((res) => res.json())
        .then((data) => setFlashCards(data))
    }


    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter a name')
            return
        }

    const batch = writeBatch(db)
    const userDocRef = doc(collection(db, 'users'), user.id)
    const docSnap = await getDoc(userDocRef)

    if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || []
        if(collections.find((f) => f.name === name)) {
            alert("Flashcard collection with the same name already exists")
            return
        }
        else {
            collections.push({name})
            batch.set(userDocRef, {flashcards: collections}, {merge:true})
        }
    } else {
        batch.set(userDocRef, {flashcards: [{name}]})
    }

    const colRef = collection (userDocRef, name)
    flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef)
        batch.set(cardDocRef, flashcard)
    });

    await batch.commit()
    handleClose()
    router.push("/flashcards")
    }

    return(
        <Container sx={{backgroundColor: "#b8c1ec", height: "100vh"}} disableGutters maxWidth="100vw">
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
            <Box sx={{
                mt:4,mb:4, display:"flex", flexDirection: 'column', alignItems: 'center'
            }}>
                <Typography variant="h5" alignSelf={"start"} gutterBottom sx={{fontFamily: 'ATAllowe', fontWeight:'bold'}}>
                    Flashcards Generator
                </Typography>
                <TextField value ={text} onChange={(e) => setText(e.target.value)} label="Enter Text" fullWidth multiline rows={8} variant="outlined"  sx={{mb:2}}/>
                <Box maxWidth="100vw" display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={5}>
                    <Button variant="contained" onClick={handleSubmit} sx={{backgroundColor:'#2a3342'}}>
                        {' '}
                        Generate Flashcards
                    </Button>
                    {flashcards.length > 0 ?
                        <Button variant="contained" onClick={handleOpen} sx={{backgroundColor:'#25ba2a'}}>
                        Save Collection
                    </Button>
                    :
                    null
                    }
                    
                </Box>
            </Box>
            <Box maxWidth={"100vw"} maxHeight={"40vh"} overflow={"auto"}>
            {flashcards.length > 0 && (
                <Box sx={{mt:4}}>
                    <Grid container spacing={3}>
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
                </Box>
            )}
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save Flashcards</DialogTitle>
                <DialogContent>
                    <DialogContentText gutterBottom>
                        Please enter a name for your flashcards collection
                    </DialogContentText>
                    <TextField
                    autoFocus
                    margin="dense"
                    label='Collection Name'
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={saveFlashcards}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    </Container>
    )
}