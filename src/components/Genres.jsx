import axios from 'axios'
import React,{useEffect} from 'react'
import Chip from '@mui/material/Chip';

const Genres = ({
     selectGeneres,
  setselectGeneres,
  geners,
  setgeners,
  type,
  setPage,
}) => {

     const handleRemove = (genre) =>{
          setselectGeneres(
               selectGeneres.filter((selected) => selected.id !== genre.id)
             );
             setgeners([...geners, genre]);
             setPage(1);
     }
     const handleAdd = (genre) =>{
          setselectGeneres([...selectGeneres,genre])
          setgeners(geners.filter((g)=>g.id !== genre.id));
          setPage(1)
     }


     const fetchgeners = async () =>{
          const {data} = await axios.get( `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
          // console.log(data,"geners");
          setgeners(data.genres)
     }

     // console.log(geners);
     useEffect(() => {
          fetchgeners();
          return () => {
               setgeners({}); // unmounting
             };
             // eslint-disable-next-line
     }, [])

     return (
          <div style={{ padding: "6px 0" }}>
            {selectGeneres.map((genre) => (
              <Chip
                style={{ margin: 2 }}
                label={genre.name}
                key={genre.id}
                color="primary"
                clickable
               
                onDelete={() => handleRemove(genre)}
              />
            ))}
            {geners.map((genre) => (
              <Chip
                style={{ margin: 2 }}
                label={genre.name}
                key={genre.id}
                clickable
              
                onClick={() => handleAdd(genre)}
              />
            ))}
          </div>
        );
}

export default Genres
