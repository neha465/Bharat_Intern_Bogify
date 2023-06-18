import './App.css';
import Header from './components/Header/Header';
import {Routes,Route} from "react-router-dom"
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserBlog from './pages/UserBlog';
import CreateBlog from './pages/CreateBlog';
import BlogDetail from "./pages/BlogDetail";
import  { Toaster } from 'react-hot-toast';


function App() {
  return (
  <> 
  <div className="app">
  <Header/>
  <Toaster autoClose={3000}/>
  <Routes>
<Route path="/" element={<Blogs/>}/>
  <Route path="/my-blogs" element={<UserBlog/>}/>
  <Route path="/create-blogs" element={<CreateBlog/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/blog-detail/:id" element={<BlogDetail/>}/>
<Route path="/signup" element={<Signup/>}/>
  </Routes>
   
  </div>
 
  </>
  );
}

export default App;