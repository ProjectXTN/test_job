
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';


import Quiz1 from "./pages/Quiz1/index";
import Quiz2 from "./pages/Quiz2/index"



function App() {

  return (
    <div className='App'>
    <BrowserRouter>
            <Routes>
              <Route path='/' element={<Quiz1 />} />
              <Route path='/quiz2' element={<Quiz2 />} />
            </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
