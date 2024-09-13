import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {

  return (
    <div className="note">
    <p>{props.id}</p>
      <h1>{props.title}</h1>
      {/* <button onClick={handleClick}><DeleteIcon/></button> */}
    </div>
  );
}

export default Note;
