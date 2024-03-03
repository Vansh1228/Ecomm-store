import {useEffect} from 'react'

function ThemeConfig() {

    useEffect(()=>{
        const fetchData = async ()=>{
          const result = await fetch('http://localhost:3000/')
          const data = await result.json()
          setItems(data)
          console.log(items);
        }
    
        fetchData();
      },[])
  return (
    <>
     <div>
        {items.map((dummy)=>
        <>
          <button>{dummy.AppName}</button>
          <img src = {dummy.logo} alt="" />
        </>
        )} 
      </div>
    </>
  )
}

export default ThemeConfig