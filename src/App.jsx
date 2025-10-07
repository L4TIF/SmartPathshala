
import { Outlet } from 'react-router-dom'
import './App.css'
const App = () => {
  return (<>
    {/* <div className="text-4xl">Parent Component</div> */}
    <Outlet />
  </>)
}

export default App