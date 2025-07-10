import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruitorLogin from './components/Recruitor/RecruitorLogin'
import DashBoard from './pages/Recruitor/DashBoard'
import AddJob from './pages/Recruitor/AddJob'
import ManageJobs from './pages/Recruitor/ManageJobs'
import ViewApplications from './pages/Recruitor/ViewApplications'
import 'quill/dist/quill.snow.css'




//to use nested routes use outlet
const App = () => {
  const {showRecruitorLogin} = useContext(AppContext)
  return (

    <div>
      {showRecruitorLogin && <RecruitorLogin />}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/apply-job/:id' element={<ApplyJob />}></Route>
        <Route path='/applications' element={<Applications />}></Route>
        <Route path='/dashboard' element={<DashBoard />} >
          <Route path="add-job" element={<AddJob />}/>
          <Route path='manage-job' element={<ManageJobs />} />
          <Route path='view-applications' element={<ViewApplications/>}/>
        </Route>
        
      </Routes>
    </div>
  )
}

export default App
