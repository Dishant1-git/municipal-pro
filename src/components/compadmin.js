import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Compadmin=()=>{

    const [allcomp,setallcomp]=useState([ ])


    useEffect(()=>{
        get()
       
    },[])

const get=async()=>{
    const token = localStorage.getItem("token");
    const result= await fetch("http://localhost:9000/api/allcomp",{
        method:"get",
        headers:{
            "Authorization": token
        }
    })

    if(result.ok){
        const res=await result.json()
        if(res.statuscode===1){
          
            setallcomp(res.compdata)
        }
    }
}




    return(
        <>

        <div class="rts-breadcrumb-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="title-area-left center mt-dec-blog-bread">
                        <span class="bg-title">Latest Post</span>
                        <h1 class="title rts-text-anime-style-1">
                           All Complaints
                        </h1>
                        <p class="disc">
                            With a team of experienced professionals and a passion for innovation, we combine
                            cutting-edge strategies
                        </p>
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
 


    <div class="rts-blog-list-area rts-section-gapBottom mt-dec-blog-list">
        <div class="container">
            <div class="row g-5">
                


                {
                    allcomp.map((a,index)=>
                        <Link to={`/detail?id=${a._id}`}>
                    <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                 
                    <div class="blog-single-post-listing" data-animation="fadeInUp" data-delay="0.2">
                        <div class="thumbnail">
                            <img src={`uploads/${a.Pic}`} alt="Business-Blog"/>
                        </div>
                        <div class="blog-listing-content">
                            <div class="user-info">
                              
                                <div class="single">
                                    <i class="far fa-user-circle"></i>
                                    <span>{a.Name}</span>
                                </div>
                               
                                <div class="single">
                                    <i class="far fa-clock"></i>
                                    <span>{a.AddOn}</span>
                                </div>
                               
                               
                               
                            </div>
                            <h4 class="blog-title" >
                                <h3 class="title animated fadeIn">{a.Problem}</h3>
                            </h4>
                            <p class="disc">
                               {a.Detail}
                            </p>
                            <button class="rts-btn btn-primary" >Read Details</button>
                        </div>
                    </div>
                   
                </div>
                </Link>
                    )
                }
                
               
            </div>
        </div>
    </div>
        </>
    )
}