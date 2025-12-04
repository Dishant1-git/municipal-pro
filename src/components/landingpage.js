import AOS from 'aos';
import { useEffect } from 'react';
export const Index = () => {

    useEffect(() => {
        AOS.init({
            duration: 800, // Animation duration
            easing: 'ease-in-out', // Easing type
            once: true // Whether animation should happen only once
        });
    })


    return (
        <>
            <div class="rts-banner-area banner-style-one bg_image">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="banner-one-inner text-start">
                                <p class="pre-title">
                                    <span>Welcome!</span> Start Growing Your Business Today
                                </p>
                                <h1 class="title rts-text-anime-style-1">
                                    Innovative <span>Solutions,</span> Tailored for Your Success
                                </h1>
                                <p class="disc banner-para">
                                    Porttitor ornare fermentum aliquam pharetra facilisis gravida risus suscipit <br/> Dui
                                        feugiat
                                        fusce conubia ridiculus tristique parturient
                                </p>
                                <a href="#" class="rts-btn btn-primary color-h-black">Get Consultant</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="shape-iamge-area">
                    <img src="assets/images/banner/shape/04.png" alt="" class="one" />
                    <img src="assets/images/banner/shape/circle.svg" alt="" class="two" />
                </div>
            </div>




            <div class="rts-about-area rts-section-gap">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-5">
                    <div class="about-content-left-one">
                        <div class="title-style-one left">
                            <span class="pre">About Business</span>
                            <h2 class="title rts-text-anime-style-1">Smart and effective <br/>
                                business agency.
                            </h2>
                        </div>
                        <p class="disc">
                            we believe in the power of collaboration and personalized solutions. By understanding our
                            clients' unique needs and goals, we tailor our approach to deliver strategic insights,
                            creative solutions.
                        </p>
                        <div class="call-and-sign-area">
                            <div class="call-area">
                                <div class="icon">
                                    <i class="fa-sharp fa-regular fa-phone-volume"></i>
                                </div>
                                <div class="information">
                                    <span>Call us anytime</span>
                                    <a href="#">
                                        <h6 class="title">+256 56778.5678</h6>
                                    </a>
                                </div>
                            </div>
                            <div class="sign-area">
                                <img src="assets/images/about/sign.svg" alt=""/>
                            </div>
                        </div>
                        <a href="#" class="rts-btn btn-primary">About Us</a>
                    </div>
                </div>
                <div class="col-lg-7 pl--70">
                    <div class="thumbnail-about-and-progress-1">

                        <div class="thumbnail-about-1">
                            <img src="assets/images/about/04.webp" alt="about"/>
                        </div>
                        <div class="progress-circle-main-wrapper">

                            <div class="progress-area-wrapper images-r">
                                <div class="single-progress-circle">
                                    <svg class="radial-progress" data-countervalue="80" viewbox="0 0 80 80">
                                        <circle class="bar-static" cx="40" cy="40" r="35"></circle>
                                        <circle class="bar--animated" cx="40" cy="40" r="35" ></circle>
                                        <text class="countervalue start" x="50%" y="55%" transform="matrix(0, 1, -1, 0, 80, 0)">80</text>
                                    </svg>
                                </div>
                                <h5 class="title">Business Progress</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

 <div class="rts-latest-service-area rts-section-gapBottom">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="title-style-one center">
                        <span class="pre">Our Latest Services</span>
                        <h2 class="title rts-text-anime-style-1">Service We Provide
                        </h2>
                    </div>
                </div>
                <div class="col-lg-12 mt--50">
                    <section class="main-wrapper-sticky">
                        <div class="sticky-statement">
                            <div class="left-side">
                                <div class="icon">
                                    <img src="assets/images/service/07.svg" alt="service"/>
                                </div>
                                <h5 class="title">Business Solution</h5>
                            </div>
                            <div class="right">
                                <p class="disc">
                                    comprehensive set of strategies, tools, technologies, and processes challenges,
                                    optimize operations, and drive business growth.
                                </p>
                                <a href="#" class="arrow">
                                    <i class="fa-regular fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                        <div class="sticky-statement">
                            <div class="left-side">
                                <div class="icon">
                                    <img src="assets/images/service/04.svg" alt="service"/>
                                </div>
                                <h5 class="title">Creative Ideas</h5>
                            </div>
                            <div class="right">
                                <p class="disc">
                                    comprehensive set of strategies, tools, technologies, and processes challenges,
                                    optimize operations, and drive business growth.
                                </p>
                                <a href="#" class="arrow">
                                    <i class="fa-regular fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                        <div class="sticky-statement">
                            <div class="left-side">
                                <div class="icon">
                                    <img src="assets/images/service/05.svg" alt="service"/>
                                </div>
                                <h5 class="title">Market Research</h5>
                            </div>
                            <div class="right">
                                <p class="disc">
                                    comprehensive set of strategies, tools, technologies, and processes challenges,
                                    optimize operations, and drive business growth.
                                </p>
                                <a href="#" class="arrow">
                                    <i class="fa-regular fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                        <div class="sticky-statement">
                            <div class="left-side">
                                <div class="icon">
                                    <img src="assets/images/service/06.svg" alt="service"/>
                                </div>
                                <h5 class="title">Technology Solution</h5>
                            </div>
                            <div class="right">
                                <p class="disc">
                                    comprehensive set of strategies, tools, technologies, and processes challenges,
                                    optimize operations, and drive business growth.
                                </p>
                                <a href="#" class="arrow">
                                    <i class="fa-regular fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>


        </>
    )
}