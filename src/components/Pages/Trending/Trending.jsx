import React from 'react'
import axios from "axios"
import {useState,useEffect} from "react"
import SingleComponent from '../../SingleComponent'
import "./Trending.css"
import CustomPagination from '../../Pagination/CustomPagination'




const Trending = () => {
     const [page, setpage] = useState(1)
     const [content, setcontent] = useState([])

     const fetchTrending = async () =>{
          const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
          );
          setcontent(data.results);
          // console.log(data.results.length);
     }

     useEffect(() => {
      
          fetchTrending();
          // eslint-disable-next-line
     },[page]);


     return (
          <>
          <div>
            <span className="pageTitle">Trending Today</span>
            <div className="trending">
              {content &&
                content.map((c) => (
                  <SingleComponent
                    key={c.id}
                    id={c.id}
                    poster={c.poster_path}
                    title={c.title || c.name}
                    date={c.first_air_date || c.release_date}
                    media_type={c.media_type}
                    vote_average={c.vote_average}
                  />
                ))}
            </div>
            
          </div>
          <CustomPagination setPage={setpage} />
          </>
        );
}

export default Trending
