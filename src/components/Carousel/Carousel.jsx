import React,{useState,useEffect} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from "axios"
import { img_300,noPicture } from '../config/config';
import "./Carousel.css"

const Carousel = ({media_type,id}) => {
     const handleDragStart = (e) => e.preventDefault();
     const [Credits, setCredits] = useState([])

     const fetchCredits = async () => {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
          );
          console.log(data.cast);
          setCredits(data.cast);
        };

        const responsive = {
          0: {
            items: 3,
          },
          512: {
            items: 5,
          },
          1024: {
            items: 7,
          },
        };

        const items = Credits.map((c) => (
          <div className="carouselItem">
            <img
              src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
              alt={c?.name}
              onDragStart={handleDragStart}
              className="carouselItem__img"
            />
            <b className="carouselItem__txt">{c?.name}</b>
          </div>
        ));


        useEffect(() => {
          fetchCredits();
          // eslint-disable-next-line
        }, [])
     return (
         
          <AliceCarousel
          mouseTracking
          infinite
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          items={items}
          autoPlay
        />
             
     )
}

export default Carousel
