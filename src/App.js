import { useState,useEffect } from "react";
import Content from './Content';
import Base from './Base';
import Header from './Header';
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import Loading from "./Loading";
import apiRequest from "./apiRequest";

function App() {
  const API_URL='http://localhost:3500/items';

  const [items,setItems]=useState([]);
  const [newItem,setNewItem]=useState('');
  const [search,setSearch]=useState('');
  const [fetcherror,setfetcherror]=useState(null);
  const [isloading,setisloading]=useState(true);
  useEffect(()=>{
     const fetchItems=async()=>{
    try{
      const response= await fetch(API_URL);
      if(!response.ok) throw Error('Do not receive data');
      const listItems=await response.json();
      console.log(listItems);
      setItems(listItems);
      setfetcherror(null);
    }
    catch(err){
      setfetcherror(err.message);
    }
    finally{
      setisloading(false)
    }
     }
     setTimeout(()=>{
      (async ()=> await fetchItems())();
     },2000)

    },[]
  )
  
const addItem=async(item)=>{
  const id= items.length? items[items.length-1].id +1:1;
  const mynewItem={id,checked:false,item};
  const listItems=[...items,mynewItem];
setItems(listItems);
const postOptions={
  method:"POST",
  headers:{
    'Content-Type' : 'application/json'
  },
  body:JSON.stringify(mynewItem)
}
const result=await apiRequest(API_URL,postOptions);
if(result) setfetcherror(result);
}
  const handlecheck=async(id)=>{
    const listItems=items.map((item)=>item.id===id?{...item,checked:!item.checked}:
    item);
    setItems(listItems);
    const myItems=listItems.filter((item)=>item.id===id);
    const updateOptions={
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({checked:myItems[0].checked})
    };
    const reqUrl=`${API_URL}/${id}`;
    const result=await apiRequest(reqUrl,updateOptions);
    if(result) setfetcherror(result);
  }
   const handledelete=async(id)=>{
    const listItems=items.filter((item)=>id!==item.id);
    setItems(listItems);
    const deleteOptions={
      method:'DELETE',
    }
    const reqUrl=`${API_URL}/${id}`;
    const result=await apiRequest(reqUrl,deleteOptions);
    if(result) setfetcherror(result);
   }
  const handlesubmit=(e)=>{
e.preventDefault();
    if (!newItem)return;
    addItem(newItem)
    setNewItem('')
  }
  return (
    <div className='App'>
    <Header
    title="Grocery List"
    />
  
    <AddItem 
    newItem={newItem}
    setNewItem={setNewItem}
    handlesubmit={handlesubmit}
    />
    <SearchItem
  search={search}
  setSearch={setSearch}
  />
   <main>
    {isloading && <Loading/>}
    {fetcherror && <p style={{color:"red"}}>{`Error:${fetcherror}`}</p>}
   {!fetcherror && <Content
    items={items.filter((item)=>((item.item).toLowerCase()).includes(search.toLowerCase()))}

    handledelete={handledelete}
    handlecheck={handlecheck}

    />}
    </main> 
<Base 
length={items.length}
/>
    </div>
  );
}

export default App;
