import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const Postcom=()=>{

    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [phone,setphone]=useState("")
    const [problem,setproblem]=useState("")
    const [adress,setadress]=useState("")
    const [msg,setmsg]=useState("")
    const [pic,setpic]=useState("")
    const [id,setid]=useState("")

    const navigate=useNavigate()
    const{LoggedIn}=useSelector((state)=>{
return state.userslice
})

    useEffect(()=>{
        if(LoggedIn){
            const udata=JSON.parse(sessionStorage.getItem("info"))
        setid(udata.id)
        }
        
     
    },[])
    
    useEffect(()=>{
        if(!LoggedIn){
           
navigate("/login")
        }
    },[])

const submitt= async(e)=>{
    e.preventDefault()
    const formdata= new FormData()
    formdata.append("name",name)
    formdata.append("email",email)
    formdata.append("phone",phone)
    formdata.append("problem",problem)
    formdata.append("adress",adress)
    formdata.append("msg",msg)
    formdata.append("pic",pic)
    formdata.append("id",id)

const result= await fetch("http://localhost:9000/api/complaint",
   { method:"post",
    body:formdata

   }
)

if(result.ok){
    const res=await result.json()
    if(res.statuscode===1){
        alert("You filled a Complaint Successfully")
    }
    else if(res.statuscode===2){
        alert("upload an image of site")
    }
    else{
        alert("error occured")
    }
    
}
    

}
    return(
    <>

<div class="rts-breadcrumb-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="title-area-left center">
                        <span class="bg-title">Contact</span>
                        <h1 class="title rts-text-anime-style-1">
                            Contact Us
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="shape-area">
            <img src="assets/images/about/shape/01.png" alt="shape" class="one"/>
            <img src="assets/images/about/shape/02.png" alt="shape" class="two"/>
            <img src="assets/images/about/shape/03.png" alt="shape" class="three"/>
        </div>
    </div>


    
    <div class="rts-contact-area-in-page" data-animation="fadeInUp" data-delay="0.2">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <div class="contact-info-area-wrapper-p new">
                        <div class="single-contact-info">
                            <div class="icon">
                                <i class="fa-solid fa-phone-flip"></i>
                            </div>
                            <div class="info-wrapper">
                                <span>Call Us 24/7</span>
                                <a href="#">(+256) 2145.2156</a>
                            </div>
                        </div>
                        <div class="single-contact-info">
                            <div class="icon">
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                            <div class="info-wrapper">
                                <span>Work with us</span>
                                <a href="#">info@Invena.com</a>
                            </div>
                        </div>
                        <div class="single-contact-info">
                            <div class="icon">
                                <i class="fa-solid fa-location-dot"></i>
                            </div>
                            <div class="info-wrapper">
                                <span>Our Location</span>
                                <a href="#">125 Town, United State</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="contact-form-p new">
                        <form     onSubmit={submitt}>
                            <h4 class="title">Complaint  Detail</h4>
                            <input name="name" id="name" type="text" placeholder="Your Name" onChange={(e)=>setname(e.target.value)}/>
                            <input type="email" name="email" id="email" placeholder="Johndoe@gmail.com" onChange={(e)=>setemail(e.target.value)}/>
                            <input type="Number" id="email" placeholder="0987654321" onChange={(e)=>setphone(e.target.value)}/>
                            <input type="text" id="" placeholder="Problem" onChange={(e)=>setproblem(e.target.value)}/>
                            <textarea name="message" id="message" placeholder="Address" onChange={(e)=>setadress(e.target.value)}></textarea>
                             <textarea name="message" id="message" placeholder="Message" onChange={(e)=>setmsg(e.target.value)}></textarea>
                            <input type="file" name="complaint" onChange={(e)=>setpic(e.target.files[0])}/>

                            <button class="rts-btn btn-primary" type="submit">Post Complaint</button>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    </>)
}