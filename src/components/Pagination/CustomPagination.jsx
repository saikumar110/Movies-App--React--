import React from 'react'
import Pagination from '@mui/material/Pagination';
const CustomPagination = ({setPage,numofpage = 10}) => {

     const handelpages =(page_num) =>{
          setPage(page_num)
          window.scroll(0,0)
     }

     return (
          <div 
          
          style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 20,
      }}

          >
               <Pagination count={numofpage}  
                    onChange = {(e)=>{
                         handelpages(e.target.textContent)
                    }}
                    color="primary"
                    hideNextButton
                    hidePrevButton
               />
          </div>
     )
}

export default CustomPagination
