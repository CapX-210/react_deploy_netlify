import ItemList from "./ItemList";

const Content = ({items,handlecheck,handledelete}) => {
 

  return (
 <>
  {items.length?(
  <ItemList

  items={items}
  handlecheck={handlecheck}
  handledelete={handledelete}/>):
  <p style={{marginTop:"15rem",fontWeight:"bold", color:"grey"}}>Your List is Empty </p>
  }
 </>
  )
}

export default Content
