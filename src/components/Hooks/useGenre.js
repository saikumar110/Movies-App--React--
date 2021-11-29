

const useGenre = (selectedGenre) => {
     if (selectedGenre.length<1) return "";

     const genreId = selectedGenre.map((e)=>e.id);
     return  genreId.reduce((acc,current)=> acc+","+current);
}


export default useGenre