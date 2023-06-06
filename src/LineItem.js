import {FaTrashAlt} from "react-icons/fa";
const LineItem = ({item,handlecheck,handledelete}) => {
  return (
    <li className="item">
    <input type="checkbox" checked={item.checked} onChange={()=>handlecheck(item.id)}/>
    <label style={(item.checked)?{textDecoration:'line-through'}:null}
    onDoubleClick={()=>handlecheck(item.id)}
    >{item.item}</label>
    <FaTrashAlt tabIndex="0" aria-label={`Delete ${item.item}`}
    onClick={()=>handledelete(item.id)}
    />
  </li>
  )
}

export default LineItem
