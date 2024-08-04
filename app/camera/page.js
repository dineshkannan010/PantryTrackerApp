"use client"
import React, { useState, useRef } from "react";
import {Camera} from "react-camera-pro";
import { uploadImage, saveImageURL } from "../../services/firebaseService";
import {Box, Button , Container, Typography} from '@mui/material';

const CameraPage = () => {

    const camera = useRef(null);
    const [image, setImage] = useState(null);

    const takePhoto = async () => {
        const photo = camera.current.takePhoto();
        setImage(photo);
        try {
            const imageUrl = await uploadImage(photo);
            await saveImageURL(imageUrl);
            console.log("Image uploaded and URL saved to Firestore");
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
    };
    
    return (
        <Container maxWidth="sm" style={{ paddingTop: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Camera
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Box width="100%" height="200px">
                    <Camera ref={camera} aspectRatio={16 / 9} />
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={takePhoto}
                    style={{ marginTop: "20px" }}
                >
                    Take Photo
                </Button>
                {image && <img src={image} alt="Taken photo" style={{ marginTop: "20px" }} />}
            </Box>
        </Container>
      );
};

export default CameraPage;
