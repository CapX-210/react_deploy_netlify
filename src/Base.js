
const Base = ({length}) => {
  return (
    <footer>
<p> {length} {length<2?"item":"items"} in the list</p>
</footer>
  )
}

export default Base
