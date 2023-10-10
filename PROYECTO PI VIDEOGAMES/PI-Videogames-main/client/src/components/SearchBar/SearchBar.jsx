import { useState } from "react";
import style from './SearchBar.module.css';

function SearchBar({onSearch}) {
   
   const[name, setName]= useState('');

   const handleChange=(event)=>{
      const value = event.target.value;
      setName(value);
   }

   
   return (
      <div className={style.SearchBar}>

         <label htmlFor="search">ID: </label>
         <input type='search' onChange={handleChange} value={name} placeholder="Ingrese ID" className={style.input}/>

         <button onClick={()=>{onSearch(name); setName('')}} className={style.button}>Agregar</button>
                  
      </div>
   );
}
export default SearchBar;
