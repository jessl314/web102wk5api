import React, {useState} from 'react'
import './RoverContainer.css'
import AttributeDisplay from './AttributeDisplay'
const ACCESS_KEY = import.meta.env.VITE_APP_NASA_API_KEY

const rovers = ["curiosity"]

const RoverContainer = ({ bannedAttributes, onBan, history, setHistory}) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [attributes, setAttributes] = useState([]);

    const handleAttributeClick = (attr) => {
      onBan(attr);
    };

    const getImage = async () => {
        setLoading(true);
        setImage(null);

        try {
        const rover = "curiosity"
        
        // getting the data for curiosity and finding the Sols with valid photo data
        const manifestRes = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${ACCESS_KEY}`);
        const manifestData = await manifestRes.json();

        const validSols = manifestData.photo_manifest.photos;
        let imageFound = false;
        let retries = 0;
        const maxRetries = 10;
        
        while (!imageFound && retries < maxRetries) {
            retries++;
            // finding a random Sol to narrow down list of photos to choose from
            const randomSolEntry = validSols[Math.floor(Math.random() * validSols.length)];
            const randomSol = randomSolEntry.sol;

            const photoRes = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${randomSol}&api_key=${ACCESS_KEY}`);
            const photoData = await photoRes.json()
            const photos = photoData.photos;

            // filtering by banned attributes
            const validPhotos = photos.filter((photo) => {

            const attrs = [
            { label: "Camera", value: photo.camera.full_name },
            { label: "Sol", value: photo.sol },
            { label: "Earth Date", value: photo.earth_date },
            { label: "Status", value: photo.rover.status },
            { label: "Landing Date", value: photo.rover.landing_date },
            { label: "Launch Date", value: photo.rover.launch_date }
            ];

            return !attrs.some((attr) =>
            bannedAttributes.some(
                (b) => b.label === attr.label && b.value === attr.value
            )
            );
        });

        // picking a random photo and setting non-banned attributes
        if (validPhotos.length > 0) {
            const randomPhoto = validPhotos[Math.floor(Math.random() * validPhotos.length)];
            const imgURL = randomPhoto.img_src.replace("http://", "https://")
            setImage(imgURL)
            setHistory(prev => [...prev, imgURL]);

            // getting attributes
            const attrs = [
                { label: "Camera", value: randomPhoto.camera.full_name },
                { label: "Sol", value: randomPhoto.sol },
                { label: "Earth Date", value: randomPhoto.earth_date },
                { label: "Status", value: randomPhoto.rover.status },
                { label: "Landing Date", value: randomPhoto.rover.landing_date},
                { label: "Launching Date", value: randomPhoto.rover.launch_date}
            ];
            
            setAttributes(attrs);
            imageFound = true;
        } else {
            setImage(null);
            setAttributes([]);
        } 
    }
    } catch (err) {
         console.error("Error fetching rover image:", err);
         setImage(null);
         setAttributes([]);

        }
        setLoading(false);

    }


    return (
        <div className="rover-container">
            <h1>Veni Veci!</h1>
            <h3>Here are some cool rover images!</h3>
            {attributes.length > 0 && <AttributeDisplay attributes={attributes} onClick={handleAttributeClick} />}
            <br></br>
            {loading && <p>Loading...</p>}
            {image ? <img src={image} alt="Mars Rover" className="rover-image"/> : !loading && <p>No image found. Try again!</p> }
            <br></br>
            <button className="button" onClick={getImage}>Discover!</button>

        </div>
    );
}

export default RoverContainer;