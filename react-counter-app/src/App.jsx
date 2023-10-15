import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Counter from './context';
import CounterRecoil from './recoil';

function App(){
   return(
     <Router>
      <Routes>
         <Route path='/' element={<Counter/>}></Route>
         <Route path='/recoil' element={<CounterRecoil/>}></Route>
      </Routes>
     </Router>
   )
}
export default App;