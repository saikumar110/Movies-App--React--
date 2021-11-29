import React, { useState, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import "./search.css"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from "axios"
import SingleComponent from '../../SingleComponent'


const Search = () => {
     const [type, settype] = useState(0)
     const [page, setPage] = useState(1);
     const [content, setcontent] = useState([])
     const [searchText, setsearchText] = useState("")

     const darkTheme = createTheme({
          palette: {
               type: "dark",
               primary: {
                    main: "#fff",
               },
          },
     });

     const fetchSearch = async () => {
          try {
               const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
                    }&language=en-US&query=${searchText}&page=${page}&include_adult=false`);

               setcontent(data.results)
               setPage(data.total_pages)
               console.log(data.results, "search");
          } catch (error) {

          }


     }

     useEffect(() => {
          fetchSearch();
          // eslint-disable-next-line
     }, [ type, page])


     return (
          <><div>

               <ThemeProvider theme={darkTheme}>
                    <div className="search">
                         <TextField
                              style={{ flex: 1 }}
                              className="searchBox"
                              label="Search"
                              variant="filled"
                              color="primary"
                              onChange={(e) => setsearchText(e.target.value)}
                         />
                         <Button
                              onClick={fetchSearch}
                              variant="contained"
                              style={{ marginLeft: 10 }}
                         >
                              <SearchIcon fontSize="large" />
                         </Button>


                    </div>
                    <Tabs value={type} aria-label="basic tabs example" centered textColor="primary" indicatorColor="primary" onChange={(event, newValue) => {
                         settype(newValue);
                         setPage(1);
                    }}>
                         <Tab label="Search Movies" style={{ width: '50%' }} />
                         <Tab label="Search Tv Series" style={{ width: '50%' }} />

                    </Tabs>
                    <div className="trending">
              {content &&
                content.map((c) => (
                  <SingleComponent
                    key={c.id}
                    id={c.id}
                    poster={c.poster_path}
                    title={c.title || c.name}
                    date={c.first_air_date || c.release_date}
                    media_type={type ? "tv" :"movie "}
                    vote_average={c.vote_average}
                  />
                ))}
            </div>
               </ThemeProvider>
          </div>
          </>

     )
}

export default Search
