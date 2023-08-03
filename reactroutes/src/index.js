import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation} from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/myapps" element={<Navigate replace to ="/learn"/>}/>
      <Route path="/learn" element={<Learn />}>
        <Route path="courses" element={<Courses/>}> {/*this is equivalent to /learn/courses */}
            <Route path=":courseid" element={<CourseId/>}/>
        </Route>
        <Route path="Bundles" element={<Bundles/>}/> {/*notice that there is no / inside the path for the nested route */}
      </Route>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    
  </Router>
);

function Home()
{
  return(
    <div>
      <h1>Home route</h1>
    </div>
  );
}
function Learn()
{
  return (
    <div>
    <h1>Learn</h1>
    <h4>All courses are listed here</h4>
    <Link to="/learn/courses">courses</Link> {/* html <a> tag can be used for links but it will reload the whole page  */}
    <Link to="/learn/bundles">bundle</Link>
    <Outlet/> {/*determines where should the result of the nest(link)  should appear*/}
    </div>
  );
}
function Courses()
{
  const courseList=["React","Angular","Vue","Nodejs"]
  const randomCourseName=courseList[Math.floor(Math.random()*courseList.length)]
  return(
    <div>
      <h1>Courses List</h1>
      <h4>Courses card</h4>
      <p>More text</p>
        {/*navlink has some additional features than link. we can use styles directly on navlink */}
      <NavLink   
          style={({isActive})=>{
              return { backgroundColor: isActive? "pink" :"yellow"}
          }}  
      to={`/learn/courses/${randomCourseName}`}>{randomCourseName}</NavLink>
      <br></br>
      <NavLink to={`/learn/courses/tests`}>tests</NavLink>
      <Outlet/>
    </div>
  );
}
function Bundles()
{
  return(
    <div>
      <h1>Bundle list</h1>
      <h4>Bundle card</h4>
    </div>
  );
}
function CourseId()
{ const Navigate=useNavigate()
  const {courseid}=useParams()
  return(
    <div>
      <h1>URL Paramas is:{courseid}</h1>
      <button onClick={()=>{
          Navigate("/dashboard",{state:courseid}); {/* we can take any info,id,string through state:"" using use location we can fetch */}
      }}  
      >Price</button>
      <Link to="/dashboard" state={"django"}>test link</Link> {/* we can use link as well */}
    </div>
  );
}
function Dashboard()
{
  const location=useLocation()
  return(
    <div>
      <h1>Info that I got here is {location.state}</h1> 
      
    </div>
  );
}
reportWebVitals();
 