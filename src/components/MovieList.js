import React , {useState,useEffect}from 'react'
import { getDocs, collection, addDoc,deleteDoc,doc , updateDoc} from 'firebase/firestore';
import { ref,uploadBytes } from 'firebase/storage';
import {db, auth,storage} from '../config/Firebse'
import './MovieList.css'
const MovieList = () => {
    const [movieList,setMovieList]=useState([])
  const [movieTitle,setMovieTitle]=useState("")
  const [leadRole,setLeadRole]=useState("")
  const [releaseYear,setReleaseYear]=useState(0)
  const [newTitle,setNewTitle]=useState("")
  const [myFile,setMyFile]=useState(null)

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
          leadRole:leadRole,
          userId:auth?.currentUser?.uid
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
    const res=await deleteDoc(movieDoc);
    console.log("delete",res)
    getMovieList();
    } catch (error) {
      console.log(error)
    }
    
  }
  
  // update data
  const updateTitle=async(_id)=>{
      try {
        const movieDoc=doc(db,"movies",_id);
        const res=await updateDoc(movieDoc,{title:newTitle})
        console.log(res)
        getMovieList();
      } catch (error) {
        console.log(error.message)
      }
  }


  // upload file
  const uploadFile=async()=>{
    if(!myFile) return;
    console.log(myFile)

    try {
      const filesFolderRef=ref(storage,`projectFiles/${myFile.name}`);
      const res=await uploadBytes(filesFolderRef,myFile)
      console.log(res)
    } catch (error) {
      console.log(error.message)
    }

  }
  return (
    <div className='movie-page'>
<h1 id='h1-tag'>Add Movie</h1>
    <div className='add-movie-p-div'>
        <div className='title-div'>
        <label htmlFor="title">Title</label>
      <input type="text"  id='title' name='title'  onChange={(e)=>setMovieTitle(e.target.value)}/>
        </div>
     <div className="lead-role-div">
     <label htmlFor="title">Lead Role</label>
      <input type="text"  onChange={(e)=>setLeadRole(e.target.value)}/>
     </div>
     <div className="year-div">
     <label htmlFor="title">Released Year</label>
      <input type="number"  onChange={(e)=>setReleaseYear(e.target.value)}/>
     </div>
      <div className="add-button">
      <button onClick={addNewMovie}>ADD</button>
      </div>
     
    </div>

    <div style={{backgroundColor:'lightgreen', display:'flex',justifyContent:'space-between',alignItems:'center',marginLeft:'5px',marginRight:'5px',flexWrap:'wrap'}}>
      {movieList && movieList.map((movie)=>(
        <div key={movie.id}>
          <h1>{movie.title}</h1>
          <h3>{movie.leadRole}</h3>
          <p>{movie.year}</p>
          <button onClick={()=>deleteMovie(movie.id)}>Delete</button>
          <input type="text" placeholder='Change Title' onChange={(e)=>{
            setNewTitle(e.target.value)
          }} />
          <button onClick={
            ()=>{
            updateTitle(movie.id)
          }
        }
          >Update</button>
        </div>
      ))}
    </div>

    </div>
  )
}

export default MovieList