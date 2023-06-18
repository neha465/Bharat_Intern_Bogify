import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';

const CreateBlog = () => {
  const [inputs,setInputs] = useState({title:"",description:"",image:""})
  const Id =  localStorage.getItem("userId")
  const navigate =useNavigate()

  const handleChange = (e) => {
    setInputs({...inputs,[e.target.name]: e.target.value
    });
  };
  
  
  const handleSubmit =async(e)=>{
    e.preventDefault();
    try {
      // API Call  with fetch headers
      const response = await fetch(
        "http://localhost:3001/api/v1/blog/create-blog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem("token")
          },
          body: JSON.stringify({
            title:inputs.title,
            description:inputs.description,
            image:inputs.image,
            user:Id
          }),
        });
      
      const data = await response.json();
      if(data?.success){
        toast.success("Blog Created")
        navigate("/my-blogs")
       }
       else if(data.success !== true){
         toast.error(data.message)
       }
    } catch (error) {
      console.log(error);
    }
  }

  return (
   <>
     <div className="card mx-auto mt-5" style={{width:'80%'}}>
  <div className="card-body">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title" style={{fontWeight:"bold"}}>Title</label>
        <input type="text" className="form-control" id="title" placeholder="Enter title" name="title" value={inputs.title} onChange={handleChange}/>
      </div>
      <div className="form-group" style={{marginTop:"10px"}}>
        <label htmlFor="descriptionTextarea" style={{fontWeight:"bold"}}>Description</label>
        <textarea className="form-control" id="description" name="description" rows="6" placeholder="Enter description" value={inputs.description} onChange={handleChange}></textarea>
      </div>
      <div className="form-group" style={{marginTop:"10px"}}>
        <label htmlFor="imageInput" style={{fontWeight:"bold"}}>Image</label>
        <input type="text" className="form-control" id="image" name="image" value={inputs.image} onChange={handleChange}/>
      </div>
      <button type="submit" className="btn btn-primary mt-3">Submit</button>
    </form>
  </div>
</div>

   </>
  )
}

export default CreateBlog