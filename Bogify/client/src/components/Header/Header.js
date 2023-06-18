import React from 'react'
import "./header.css"
import { Link ,useNavigate} from "react-router-dom";

const Header = () => {
  const navigate=useNavigate()
  //toggle functionality
 
  const hamburger =()=> {
    const navBar= document.querySelector(".nav-bar");
    navBar.classList.toggle("active")
}

const handleLogout =()=>{
  localStorage.removeItem("token")
  localStorage.removeItem("userId")
  navigate("/login")
}
  return (
    <>
         <header>
    <div className="logo"><i className="fa-sharp fa-solid fa-pen-nib"></i> Blogify</div>
    <div className="hamburger" onClick={hamburger}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
    <nav className="nav-bar">
 
    
    {!localStorage.getItem("token") && !localStorage.getItem("userId")?  <ul> 
    <li>
          <Link to="/">Blogs</Link>
        </li> 
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
            <Link to="/signup">Signup</Link>
        </li>
      </ul>:<ul>
      <li>
          <Link to="/">Blogs</Link>
        </li> 
      <li>
          <Link to="/my-blogs">My blogs</Link>
        </li>
        <li>
          <Link to="/create-blogs">Create Blog</Link>
        </li>
        <li onClick={handleLogout}>
          <Link to="/">Logout</Link>
        </li>
        </ul>}
     
    </nav>
</header>

    </>
  )
}

export default Header