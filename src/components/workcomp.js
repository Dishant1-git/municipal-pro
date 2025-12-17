import { set } from "mongoose"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export const Compwoker = () => {
    const [status, setstatus] = useState("")
    const [name, setname] = useState("")
    const [addon, setaddon] = useState("")
    const [pro, setpro] = useState("")
    const [dtl, setdtl] = useState("")
    const [adrs, setadrs] = useState("")
    const [pic, setpic] = useState("")
    const [message, setmessage] = useState("")


    const [params] = useSearchParams()

    const idd = params.get("id")

    useEffect(() => {

        show()
       
    }, [idd])


    const show = async () => {
        const result = await fetch(`http://localhost:9000/api/detail/${idd}`, {
            method: "Get"
        })
        if (result.ok) {
            const res = await result.json()
            if (res.statuscode === 1) {
           
                setname(res.comp.Name)
                setpro(res.comp.Problem)
                setdtl(res.comp.Detail)
                setadrs(res.comp.Adress)
                setpic(res.comp.Pic)
                setaddon(res.comp.AddOn)
              


            }
        }
    }

   
    const Assign = async(e) => {
        e.preventDefault()
      const data={status,message}
const up= await fetch(`http://localhost:9000/api/compupworker/${idd}`,
    {method:"Put",
    body:JSON.stringify(data),
    headers:{
        "content-type":"application/json;charset=UTF-8"
    }
})
if(up.ok){
    const result= await up.json()
    if(result.statuscode===1){
        alert("job "+status)
    }
    else{
        alert("error occured while assigning")
    }
}

      
      
    }
    return (
        <>


            <div class="blog-details-banner-large-image">

            </div>


            <div class="blog-details-area-main-wrapper pt--80">
                <div class="container-blog-details">
                    <div class="row">

                      
                                <div class="col-lg-12">
                                    <div class="blog-details-area-inner-content">
                                        <div class="blog-details-top-wrapper">
                                            <div class="single">
                                                <i class="fa-regular fa-circle-user"></i>
                                                <span>{name}</span>
                                            </div>
                                            <div class="single">
                                                <i class="fa-regular fa-clock"></i>
                                                <span>{addon}</span>
                                            </div>

                                        </div>
                                        <h2 class="title">{pro}</h2>


                                        <div class="rts-quote-area text-center">
                                            <h5 class="title">{dtl}</h5>


                                        </div>
                                        <p class="disc">
                                            <h5>Location:</h5>
                                           {adrs}
                                        </p>
                                        <div class="thumbnail-large">
                                            <img src={`uploads/${pic}`} alt="blog" />
                                        </div>



                                        <div class="replay-area-details">
                                            <h4 class="title">Leave a Reply</h4>
                                            <form onSubmit={Assign} >
                                                <div class="row g-4">
                                                    <div class="col-lg-6">
                                                        Update Status   <select onChange={(e) => setstatus(e.target.value)}>
                                                            <option value={"null"}>Select Status</option>
                                                          
                                                                    <option value={"completed"}>completed</option>
                                                                    <option value={"camceled"}>cancel</option>
                                                            
                                                        </select>
                                                    </div>

                                                    <div class="col-12">
                                                        Additional Message
                                                        <textarea onChange={(e)=>setmessage(e.target.value)}></textarea>
                                                    </div>
                                                </div>
                                                <button class="btn-primary rts-btn mt--50">Submit Message</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}