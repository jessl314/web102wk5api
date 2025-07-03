import React, {useState} from 'react'
import './RoverContainer.css'
const ACCESS_KEY = import.meta.env.VITE_APP_NASA_API_KEY

const rovers = ["curiosity"]

const RoverContainer = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const getImage = async () => {
        setLoading(true);
        setImage(null);

        try {
        const rover = "curiosity"
        
        const manifestRes = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${ACCESS_KEY}`);
        const manifestData = await manifestRes.json();

        const validSols = manifestData.photo_manifest.photos;
        const randomSolEntry = validSols[Math.floor(Math.random() * validSols.length)];
        const randomSol = randomSolEntry.sol;

        const photoRes = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${randomSol}&api_key=${ACCESS_KEY}`);
        const photoData = await photoRes.json()
        const photos = photoData.photos;

        if (photos.length > 0) {
            const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
            setImage(randomPhoto.img_src.replace("http://", "https://"))
        } else {
            setImage(null);
        } 
    } catch (err) {
         console.error("Error fetching rover image:", err);
            setImage(null);

        }
        setLoading(false);

    }

    return (
        <div className="rover-container">
            <h1>Veni Veci!</h1>
            <h3>Here are some cool rover images!</h3>
            <button className="button" onClick={getImage}>Discover!</button>
            {loading && <p>Loading...</p>}
            {image ? <img src={image} alt="Mars Rover"/> : !loading && <p>No image found. Try again!</p> }

        </div>
    );
}

export default RoverContainer;