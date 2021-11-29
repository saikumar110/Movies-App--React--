import React,{useState,useEffect} from 'react'
import axios from "axios"
import CustomPagination from '../../Pagination/CustomPagination'
import SingleComponent from '../../SingleComponent'
import Genres from "../../Genres"
import useGenre from "../../Hooks/useGenre"

const Movies = () => {
     const [content, setcontent] = useState([])
     const [page, setpage] = useState(1);
     const [pageno, setpageno] = useState();
     const [selectGeneres, setselectGeneres] = useState([])
     const [geners, setgeners] = useState([])
     const genreforURL = useGenre(selectGeneres)
     const fetcMovies = async () =>{
          const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
          setcontent(data.results)
          console.log(genreforURL);

          setpageno(data.total_pages)
          console.log(data.results,"moviessss");
     }

     useEffect(() => {
          fetcMovies();
          // eslint-disable-next-line
     }, [page,genreforURL])
     return (
          <>
          <div>
            <span className="pageTitle">Trending Movies</span>
            <Genres 
                 type = "movie"
                 selectGeneres = {selectGeneres}
                 setselectGeneres = {setselectGeneres}
                 geners = {geners}
                 setgeners = {setgeners}
                 setPage  = {setpageno}
            />
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
          <CustomPagination setPage={setpage} numofpage={pageno} />
          </>
     )
}

export default Movies
