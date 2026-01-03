import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const Usercomp = () => {

    const [id, setid] = useState("")
    const [allcom, setallcomp] = useState([])
    const navigate=useNavigate()


     const{LoggedIn}=useSelector((state)=>{
return state.userslice
})

    useEffect(() => {

        if(LoggedIn){
  const user = JSON.parse(sessionStorage.getItem("info"))

        setid(user.id)
        }
      
        // if(LoggedIn){
        //    show() 
        //    alert(id)
        // }
        // else{
        //     navigate("/login")
        // }
    
    },[])

    useEffect(()=>{
        if(!LoggedIn){
             navigate("/login")
        }else{
         show()  
        }
    },[LoggedIn&&id])
  


    const show = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:9000/api/compget/${id}`, {
            method: "Get",
            headers: {
                "Authorization": token
            }
        })
        if (res.ok) {
            const data = await res.json()
 
            if (data.statuscode === 1) {
                setallcomp(data.compdata)
             
            
            }
        }
    }

    return (
        <>

            <div class="rts-breadcrumb-area">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="title-area-left center">
                                <span class="bg-title">Latest Post</span>
                                <h1 class="title rts-text-anime-style-1">
                                    Latest Posts
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
                    <img src="assets/images/about/shape/01.png" alt="shape" class="one" />
                    <img src="assets/images/about/shape/02.png" alt="shape" class="two" />
                    <img src="assets/images/about/shape/03.png" alt="shape" class="three" />
                </div>
            </div>



            <div class="rts-blog-list-area rts-section-gapBottom">
                <div class="container">
                    <div class="row g-5">

                        <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                            <div class="row g-5">
{
    allcom.length>0?<>
     {
                                    allcom.map((a,index) =>
                                        <div key={index} class="col-lg-6 col-md-6 col-sm-12" data-animation="fadeInUp" data-delay="0.1">
                                            <div class="single-blog-area-one column-reverse">
                                                <p>{a.Status}</p>
                                                <a href="#">
                                                    <h4 class="title">{a.Problem}</h4>
                                                </a>
                                                <div class="bottom-details">
                                                    <a href="#" class="thumbnail">
                                                        <img src={`uploads/${a.Pic}`} alt="blog-area" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
    </>:<><h3>You did not Filled any complaint yet</h3></>
}
                               


                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}