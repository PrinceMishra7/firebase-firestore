import {react, useState,useEffect} from 'react';
import Auth from './components/Auth';
import {db} from './config/Firebse'
import { getDocs, collection, addDoc,deleteDoc,doc } from 'firebase/firestore';
function App() { 
  const [movieList,setMovieList]=useState([])
  const [movieTitle,setMovieTitle]=useState("")
  const [leadRole,setLeadRole]=useState("")
  const [releaseYear,setReleaseYear]=useState(0)

  // fetch data
  const movieCollectionRef=collection(db,"movies");
  const getMovieList = async ()=>{
    try {
      const data=await getDocs(movieCollectionRef)
      // console.log(data) 
      const filteredData=data.docs.map((doc)=>(
        {...doc.data(),id:doc.id}
      ))
      setMovieList(filteredData)
      // console.log(movieList)
      console.log(filteredData)
    } catch (error) {
      console.log(error.message);
    }

  } 
  useEffect(() => {
    getMovieList(); 
  }, [])

  // add data
  const addNewMovie=async()=>{
    console.log(movieTitle,leadRole,releaseYear);
    try {
      await addDoc(movieCollectionRef,
        {
          title:movieTitle,
          year:releaseYear,
          leadRole:leadRole
        })

      getMovieList();
    } catch (error) {
      console.log(error)
    }
    
  }


  // delete data

  const deleteMovie= async(_id)=>{
    try {
    const movieDoc=doc(db,"movies",_id);
    await deleteDoc(movieDoc);
    getMovieList();
    } catch (error) {
      console.log(error)
    }
    
  }
  
  // update data
  
  return ( 
    <div className="App">
      <h1>Firebase Firestore</h1>
      <Auth />

    <div style={{margin:'10px'}}>
      <h1>Add Movie</h1>
      <input type="text" placeholder="Movie Title" onChange={(e)=>setMovieTitle(e.target.value)}/>
      <input type="text" placeholder="Lead Role" onChange={(e)=>setLeadRole(e.target.value)}/>
      <input type="number" placeholder="Release Year" onChange={(e)=>setReleaseYear(e.target.value)}/>
      <button onClick={addNewMovie}>ADD</button>
    </div>
    <div style={{backgroundColor:'lightgreen', display:'flex',justifyContent:'space-between',alignItems:'center',marginLeft:'5px',marginRight:'5px',flexWrap:'wrap'}}>
      {movieList && movieList.map((movie)=>(
        <div key={movie.id}>
          <h1>{movie.title}</h1>
          <h3>{movie.leadRole}</h3>
          <p>{movie.year}</p>
          <button onClick={()=>deleteMovie(movie.id)}>Delete</button>
        </div>
      ))}
    </div>

    </div> 
  );
}

export default App;
