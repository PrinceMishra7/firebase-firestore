import {react, useState,useEffect} from 'react';
import {db} from '../config/Firebse'
import { getDocs, collection, deleteDoc,doc , updateDoc} from 'firebase/firestore';
import {auth} from '../config/Firebse'
import { signOut} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
const Movies = () => {
    const [movieList,setMovieList]=useState([])
    const [newTitle,setNewTitle]=useState("")
    const navigate=useNavigate();
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

  // update
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

  return (
  <div>
        {/* Add movies */}

        <div class="flex justify-between mr-10 p-12" style={{marginRight:'105px'}}>
                        <button class="px-6 py-3 leading-5 text-xl text-white transition-colors font-bold duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-900 focus:outline-none focus:bg-gray-600" onClick={
                          ()=>{
                            navigate('/add-movie');
                          }
              }>Add Movie</button>
                        <button class="px-6 py-3 leading-5 text-xl text-white transition-colors font-bold duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-900 focus:outline-none focus:bg-gray-600" 
                        onClick={async ()=>{
                          await signOut(auth)
                          navigate('/')
                      }}
              >Logout</button>
        </div>



<div class="relative overflow-x-auto shadow-md sm:rounded-lg w-4/5 m-auto my-10">
    <table class="w-full text-sm text-left text-gray-500 ">
        <thead class=" text-white uppercase text-1xl bg-blue-500  border-b-2">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Title
                </th>
                <th scope="col" class="px-6 py-3">
                    Lead Actor
                </th>
                <th scope="col" class="px-6 py-3">
                    Release Year
                </th>
                <th scope="col" class="px-6 py-3">
                    Update title
                </th>
                <th scope="col" class="px-6 py-3">
                    Delete Movie
                </th>
            </tr>
        </thead>
        <tbody>
            
      

{movieList && movieList.map((movie)=>(


<tr class="bg-blue-500 border-b-2  text-xl"  key={movie.id}>
                <th scope="row" class="px-6 py-3 font-medium text-white whitespace-nowrap ">
                {movie.title}
                </th>
                <td class="px-6 py-4 text-white">
                {movie.leadRole}
                </td>
                <td class="px-6 py-4 text-white">
                {movie.year}
                </td>
                <td class="px-6 py-4 text-white">


               
    
        
           
                <input class="px-2 py-2 text-gray-700 rounded-lg w-48  placeholder-gray-500  bg-white outline-none  focus:placeholder-transparent mr-2 " type="text" name="title" onChange={(e)=>{
        setNewTitle(e.target.value)
         }} />
                <button class="px-6 py-3 leading-5 text-white transition-colors font-medium duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-900 focus:outline-none focus:bg-gray-600"  onClick={
         ()=>{
             updateTitle(movie.id)
          }
         }>Update</button>
                </td>
                <td class="px-6 py-4 text-white">
                <button class="px-6 py-3 leading-5 text-white transition-colors font-medium duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-900 focus:outline-none focus:bg-gray-600" onClick={()=>deleteMovie(movie.id)} >Delete</button>
                </td>
            </tr> 

        
      ))}
        </tbody>
    </table>
</div>


   
     
   




    </div>
  )
}

export default Movies