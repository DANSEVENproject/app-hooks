import {Fragment} from 'react'
import { Navbar } from './components/Navbar';
import {Home} from './pages/Home'
import {About} from './pages/About'
import {Profile} from './pages/Profile'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Alert } from './components/Alert'
import { AlertState } from './context/alert/alertState';
import { GithubState } from './context/github/githubState';

function App() {
  return (
    <GithubState>
      <AlertState>
        <BrowserRouter>
          <Fragment>
            <Navbar />
            <div className='container pt-4'>
              <Alert alert={{text: 'Test alert'}}/>
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/profile/:name' element={<Profile />} /> 
              </Routes>
            </div>
          </Fragment>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  );
}

export default App;
