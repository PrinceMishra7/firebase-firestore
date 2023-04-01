import react, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState=(props)=>{
    const s1={
        "name":"Prince",
        "class":"TE COMP"
    }
    const [state,setState]=useState(s1);
    const update=()=>{
        setTimeout(() => {
            setState({
                "name":"David",
                "class":"B.E. COMP"
            })
        }, 1000);
    }
    return(
        // passing state
        // <NoteContext.Provider  value={state}>
        //     {props.children}
        // </NoteContext.Provider>

        
        // passing state and method
        <NoteContext.Provider  value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;