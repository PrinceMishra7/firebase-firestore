import {react, useState,useEffect} from 'react';
import Auth from './components/Auth';
import {db, auth,storage} from './config/Firebse'
import { getDocs, collection, addDoc,deleteDoc,doc , updateDoc} from 'firebase/firestore';
import { ref,uploadBytes } from 'firebase/storage';
import {Routes,Route} from 'react-router-dom'
import Movies from './components/Movies';
import AddMovies from './components/AddMovies';
function App() { 
  const [movieList,setMovieList]=useState([])
  const [movieTitle,setMovieTitle]=useState("")
  const [leadRole,setLeadRole]=useState("")
  const [releaseYear,setReleaseYear]=useState(0)
  const [newTitle,setNewTitle]=useState("")
  const [myFile,setMyFile]=useState(null)

  // fetch data
  // const movieCollectionRef=collection(db,"movies");
  // const getMovieList = async ()=>{
  //   try {
  //     const data=await getDocs(movieCollectionRef)
  //     // console.log(data) 
  //     const filteredData=data.docs.map((doc)=>(
  //       {...doc.data(),id:doc.id}
  //     ))
  //     setMovieList(filteredData)
  //     // console.log(movieList)
  //     console.log(filteredData)
  //   } catch (error) {
  //     console.log(error.message);
  //   }

  // } 
  // useEffect(() => {
  //   getMovieList(); 
  // }, [])

  // add data
  // const addNewMovie=async()=>{
  //   console.log(movieTitle,leadRole,releaseYear);
  //   try {
  //     await addDoc(movieCollectionRef,
  //       {
  //         title:movieTitle,
  //         year:releaseYear,
  //         leadRole:leadRole,
  //         userId:auth?.currentUser?.uid
  //       })

  //     getMovieList();
  //   } catch (error) {
  //     console.log(error)
  //   }
    
  // }


  // delete data

  // const deleteMovie= async(_id)=>{
  //   try {
  //   const movieDoc=doc(db,"movies",_id);
  //   const res=await deleteDoc(movieDoc);
  //   console.log("delete",res)
  //   getMovieList();
  //   } catch (error) {
  //     console.log(error)
  //   }
    
  // }
  
  // update data
  // const updateTitle=async(_id)=>{
  //     try {
  //       const movieDoc=doc(db,"movies",_id);
  //       const res=await updateDoc(movieDoc,{title:newTitle})
  //       console.log(res)
  //       getMovieList();
  //     } catch (error) {
  //       console.log(error.message)
  //     }
  // }


  // upload file
  // const uploadFile=async()=>{
  //   if(!myFile) return;
  //   console.log(myFile)

  //   try {
  //     const filesFolderRef=ref(storage,`projectFiles/${myFile.name}`);
  //     const res=await uploadBytes(filesFolderRef,myFile)
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error.message)
  //   }

  // }
  
  return ( 
    <div className="App">
     
      <Routes>
        <Route path='/' element={<Auth/>}></Route>
        <Route path='/movies' element={<Movies/>}></Route>
        <Route path='/add-movie' element={<AddMovies/>}></Route>
      </Routes>

    {/* <div style={{margin:'10px'}}>
      <h1>Add Movie</h1>
      <input type="text" placeholder="Movie Title" onChange={(e)=>setMovieTitle(e.target.value)}/>
      <input type="text" placeholder="Lead Role" onChange={(e)=>setLeadRole(e.target.value)}/>
      <input type="number" placeholder="Release Year" onChange={(e)=>setReleaseYear(e.target.value)}/>
      <button onClick={addNewMovie}>ADD</button>
    </div> */}



        {/* upload a file */}
{/* 
        <div>
          <input type="file" onChange={(e)=>{
            setMyFile(e.target.files[0])
          }}/>
          <button onClick={uploadFile}>UPLOAD</button>
        </div> */}
    </div> 
  );
}

export default App;
