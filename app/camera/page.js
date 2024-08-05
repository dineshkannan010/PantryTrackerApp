"use client"
import React, { useState, useRef } from "react";
import {Camera} from "react-camera-pro";
import { uploadImage, saveImageURL } from "../../services/firebaseService";
import {Box, Button , Container, Typography} from '@mui/material';

const CameraPage = () => {

    const camera = useRef(null);
    const [image, setImage] = useState(null);
    const [cameraOpen, setCameraOpen] = useState(true);

    const takePhoto = async () => {
        if (cameraOpen && camera.current) {
            const photo = camera.current.takePhoto();
            setImage(photo);
            try {
                const imageUrl = await uploadImage(photo);
                await saveImageURL(imageUrl);
                console.log("Image uploaded and URL saved to Firestore");
            } catch (error) {
                console.error("Error uploading image: ", error);
            }
        } else {
            alert("Can't take photo as camera is off");
        }
    };

    const toggleCamera = () => {
        setCameraOpen(prevState => !prevState);
    };
    
    return (
        <Container maxWidth="sm" style={{ paddingTop: "20px" }}>
            <Typography variant="h4" justifyContent="center" gutterBottom >
                Camera
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Box width="100%" height="200px" style={{ backgroundColor: cameraOpen ? 'transparent' : 'black' }}>
                    {cameraOpen && <Camera ref={camera} aspectRatio={16 / 9} />}
                </Box>
                <Box display="flex" justifyContent="center" width="100%" marginTop="40px">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={takePhoto}
                        style={{ marginRight: "10px" }}
                    >
                        Take Photo
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={toggleCamera}
                    >
                        Off/On Camera
                    </Button>
                </Box>
                <Box width="100%" height="200px" margin={12}>
                {image && <img src={image} alt="Taken photo" style={{ marginTop: "20px" }} />}
                </Box>
            </Box>
        </Container>
      );
};

export default CameraPage;
