import { Link } from "react-router-dom"

export const Admin=()=>{
    return(
        <>
        <header class="header-one header--sticky">
        <div class="header-top-area-wrapper">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="header-top-one-wrapper">
                            <div class="left">
                                <div class="mail">
                                    <a href="mailto:webmaster@example.com"><i class="fal fa-envelope"></i>
                                        support@admin.com</a>
                                </div>
                                <div class="working-time">
                                    <p><i class="fal fa-clock"></i> Working: 8.00am - 5.00pm</p>
                                </div>
                            </div>
                            <div class="right">
                                <ul class="top-nav">
                                    <li><a href="blog-list.html">Company news</a></li>
                                    <li><a href="faq.html">Faq</a></li>
                                    <li><a href="contact.html">Contact</a></li>
                                </ul>
                                <ul class="social-wrapper-one">
                                    <li><a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#" aria-label="twitter"><i class="fab fa-twitter"></i></a></li>
                                    <li><a href="#" aria-label="instagram"><i class="fab fa-instagram"></i></a></li>
                                    <li><a class="mr--0" href="#" aria-label="linkedin"><i class="fab fa-linkedin-in"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-main">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="header-main-one-wrapper">
                            <div class="thumbnail">
                                <a href="index.html">
                                    <img src="assets/images/logo/01.svg" alt="finbiz-logo"/>
                                </a>
                            </div>
                            <div class="main-header">
                                <div class="nav-area">
                                    <ul class="">
                                        <li class="main-nav ">
                                            <a href="">Home</a>
                                           
                                        </li>

                                        <li class="main-nav has-dropdown mega-menu">
                                            <a href="#">List</a>
                                            <div class="rts-mega-menu">
                                                <div class="wrapper">
                                                    <div class="container">
                                                        <div class="row g-0">
                                                            <div class="col-lg-3">
                                                                <ul class="mega-menu-item with-list parent-nav">
                                                                    <li><Link><i class="fa-sharp fa-regular fa-chevron-right"></i>User List</Link></li>
                                                                     <li><Link><i class="fa-sharp fa-regular fa-chevron-right"></i>Wroker List</Link></li>
                                                                    
                                                                </ul>
                                                            </div>
                                                          
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="main-nav has-dropdown mega-menu">
                                            <a href="#">Works</a>
                                            <div class="rts-mega-menu service-mega-menu-style">
                                                <div class="wrapper">
                                                    <div class="container">
                                                        <div class="row g-5">
                                                            <div class="col-lg-4">
                                                                <ul class="mega-menu-item parent-nav">
                                                                    <li>
                                                                        <Link>
                                                                            <div class="single-service-menu">
                                                                                <div class="icon">
                                                                                    <img src="assets/images/service/04.svg" alt="service"/>
                                                                                </div>
                                                                                <div class="info">
                                                                                    <h5 class="title">All Works</h5>
                                                                                    <p class="details">
                                                                                        Once planning is complete, site preparation begins.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <a href="service-details-2.html">
                                                                            <div class="single-service-menu">
                                                                                <div class="icon">
                                                                                    <img src="assets/images/service/05.svg" alt="service"/>
                                                                                </div>
                                                                                <div class="info">
                                                                                    <h5 class="title">Completed</h5>
                                                                                    <p class="details">
                                                                                        Quis nulla blandit vulputate morbi adipiscing sem vestibulum.
                                                                                        Nulla turpis...
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="service-details-3.html">
                                                                            <div class="single-service-menu">
                                                                                <div class="icon">
                                                                                    <img src="assets/images/service/06.svg" alt="service"/>
                                                                                </div>
                                                                                <div class="info">
                                                                                    <h5 class="title">Pending</h5>
                                                                                    <p class="details">
                                                                                        Elever Architecture is a New-York-based studio on modern...
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div class="col-lg-4">
                                                                <ul class="mega-menu-item parent-nav">
                                                                    <li>
                                                                        <a href="service-details-4.html">
                                                                            <div class="single-service-menu">
                                                                                <div class="icon">
                                                                                    <img src="assets/images/service/07.svg" alt="service"/>
                                                                                </div>
                                                                                <div class="info">
                                                                                    <h5 class="title">Assigned /Not Starded</h5>
                                                                                    <p class="details">
                                                                                        We provide best IT solutions for any type of business.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="service-details-5.html">
                                                                            <div class="single-service-menu">
                                                                                <div class="icon">
                                                                                    <img src="assets/images/service/12.svg" alt="service"/>
                                                                                </div>
                                                                                <div class="info">
                                                                                    <h5 class="title">Not Assigned</h5>
                                                                                    <p class="details">
                                                                                        We provide best IT solutions for any type of business as.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="contact.html" class="free-consultation">
                                                                            <div class="single-service-menu">
                                                                                <div class="info">
                                                                                    <h5 class="title">Canceled </h5>
                                                                                    <p class="details">
                                                                                        From preconstruction to virtual design and construction.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div class="col-lg-4">
                                                                <div class="menu-thumb pl--20">
                                                                    <img src="assets/images/banner/24.webp" alt=""/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="main-nav has-dropdown mega-menu">
                                            <a href="#">Project</a>
                                            <div class="rts-mega-menu">
                                                <div class="wrapper">
                                                    <div class="container">
                                                        <div class="row g-0">
                                                            <div class="col-lg-3">
                                                                <ul class="mega-menu-item with-list parent-nav">
                                                                    <li class="hega-menu-head-wrapper">
                                                                        <p class="hega-menu-head"><i class="fa-regular fa-folder-open"></i>
                                                                            Types</p>
                                                                    </li>
                                                                    <li><a href="project.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>Project</a>
                                                                    </li>
                                                                    <li><a href="project-slider.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>Project
                                                                            Slider</a></li>
                                                                    <li><a href="project-slider-2.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>Project
                                                                            Slider 2</a></li>
                                                                    <li><a href="project-card-slider.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>Project
                                                                            Card Slider</a></li>
                                                                    <li><a href="project-bg-dark.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>Project
                                                                            Bg Dark</a></li>
                                                                </ul>
                                                            </div>
                                                            <div class="col-lg-3">
                                                                <ul class="mega-menu-item with-list parent-nav">
                                                                    <li class="hega-menu-head-wrapper">
                                                                        <p class="hega-menu-head"><i class="fa-regular fa-folder-open"></i>
                                                                            Grid Style</p>
                                                                    </li>
                                                                    <li><a href="project-grid.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>Project
                                                                            Grid</a></li>
                                                                    <li><a href="project-grid-col-2.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>Project
                                                                            Grid Col 2</a></li>
                                                                    <li><a href="project-slider-grid.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>Grid Slider</a></li>
                                                                    <li><a href="project-slider-overflow.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>Project Overflow</a>
                                                                    </li>
                                                                    <li><a href="project-grid-col-3.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>Project Grid Col 3</a>
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                            <div class="col-lg-3">
                                                                <ul class="mega-menu-item with-list parent-nav">
                                                                    <li class="hega-menu-head-wrapper">
                                                                        <p class="hega-menu-head"><i class="fa-regular fa-folder-open"></i>Hover
                                                                            Type
                                                                        </p>
                                                                    </li>
                                                                    <li><a href="project-bg-dark.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>Project
                                                                            Hide Content</a></li>


                                                                    <li><a href="project-slider-2.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>Project
                                                                            Hide
                                                                            Content wide</a>
                                                                    </li>
                                                                    <li><a href="project-grid.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>Project
                                                                            Card Hover</a>
                                                                    </li>
                                                                    <li><a href="project-slider-2.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>Project
                                                                            Slider Image
                                                                            Zoom</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div class="col-lg-3">
                                                                <ul class="mega-menu-item with-list parent-nav">
                                                                    <li class="hega-menu-head-wrapper">
                                                                        <p class="hega-menu-head"><i class="fa-regular fa-folder-open"></i>
                                                                            Single</p>
                                                                    </li>
                                                                    <li><a href="project-details.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>Project
                                                                            Detials</a>
                                                                    </li>
                                                                    <li><a href="project-details-2.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>Project
                                                                            Detials
                                                                            Video</a>
                                                                    </li>
                                                                    <li><a href="project-details-3.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>Project
                                                                            Detials
                                                                            Slider</a>
                                                                    </li>
                                                                    <li><a href="project-details-large-image.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>
                                                                            Large Image</a>
                                                                    </li>
                                                                    <li><a href="project-details-gallery.html"><i class="fa-sharp fa-regular fa-chevron-right"></i>
                                                                            Project Gallery</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="main-nav has-dropdown project-a-after">
                                            <a href="#">Login</a>
                                            <ul class="submenu parent-nav">
                                                <li>  <Link to="/signup">Signup</Link></li>
                                                <li><Link to="/Login">Loginp</Link></li>
                                                <li><a >Logout</a></li>
                                                
                                            </ul>
                                        </li>
                                        <li class="main-nav has-dropdown project-a-after">
                                            <a href="#">Contact</a>
                                            <ul class="submenu parent-nav">
                                                <li><a href="contact.html">Contact</a></li>
                                                <li><a href="contact-2.html">Contact 2</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>


                                <div class="loader-wrapper">
                                    <div class="loader">
                                    </div>
                                    <div class="loader-section section-left"></div>
                                    <div class="loader-section section-right"></div>
                                </div>
                                <div class="button-area">
                                    <button class="search" id="search" aria-label="Search"><i class="far fa-search"></i></button>
                                    <a href="contact.html" class="rts-btn btn-primary ml--20 ml_sm--5 header-one-btn quote-btn">Get
                                        Quote</a>
                                    <button id="menu-btn" aria-label="Menu" class="menu-btn menu ml--20 ml_sm--5">
                                        <img class="menu-light" src="assets/images/icons/01.svg" alt="Menu-icon"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div id="side-bar" class="side-bar header-two">
        <button class="close-icon-menu" title="Close menu"><i class="far fa-times"></i></button>
       
        <div class="rts-sidebar-menu-desktop">
            <a class="logo-1" href="index.html"><img class="logo" src="assets/images/logo/01.svg" alt="finbiz_logo"/></a>
            <div class="body d-none d-xl-block">
                <p class="disc">
                    We must explain to you how all seds this mistakens idea denouncing pleasures and praising account.
                    All seds this mistakens idea denouncing pleasures.
                </p>
                <div class="get-in-touch">
                   
                    <div class="h6 title">Get In Touch</div>
                    
                    <div class="wrapper">
                       
                        <div class="single">
                            <i class="fas fa-phone-alt"></i>
                            <a href="#">+8801234566789</a>
                        </div>
                        
                        <div class="single">
                            <i class="fas fa-envelope"></i>
                            <a href="#">example@gmail.com</a>
                        </div>
                        
                        <div class="single">
                            <i class="fas fa-globe"></i>
                            <a href="#">www.webexample.com</a>
                        </div>
                        
                        <div class="single">
                            <i class="fas fa-map-marker-alt"></i>
                            <a href="#">13/A, New Pro State, NYC</a>
                        </div>
                       
                    </div>
                    <div class="social-wrapper-two menu">
                        <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" aria-label="twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" aria-label="instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" aria-label="instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </div>
        </div>
       
        <div class="mobile-menu d-block d-xl-none">
            <nav class="nav-main mainmenu-nav mt--30">
                <ul class="mainmenu metismenu" id="mobile-menu-active">
                    <li class="has-droupdown">
                        <a href="#" class="main" aria-expanded="false">Demos</a>
                        <ul class="submenu mm-collapse" style={{height:" 0px;"}}>
                            <li><a href="index.html">Business One</a></li>
                            <li><a href="index-two.html">Business Two</a></li>
                            <li><a href="index-three.html">Business Three</a></li>
                            <li><a href="index-four.html">Business Four</a></li>
                            <li><a href="index-five.html">Finance Demo</a></li>
                            <li><a href="index-six.html">Marketing agency</a></li>
                            <li><a href="index-seven.html">Business agency</a></li>
                            <li><a href="index-eight.html">Business Management</a></li>
                            <li><a href="index-nine.html">Insurance Home</a></li>
                            <li><a href="index-ten.html">Business Website</a></li>
                            <li><a href="index-eleven.html">Business Parallax</a></li>
                            <li><a href="index-twelve.html">Business Video</a></li>
                            <li><a href="index-thirteen.html">Accountent One</a></li>
                            <li><a href="index-fourteen.html">Accountent Two</a></li>
                            <li><a href="index-fifteen.html">HR Website</a></li>
                            <li><a href="index-sixteen.html">Business Coach</a></li>
                            <li><a href="index-seventeen.html">SEO Website</a></li>
                            <li><a href="index-eighteen.html">Technology Demo</a></li>
                            <li><a href="index-nineteen.html">Business Investment</a></li>
                        </ul>
                    </li>
                    <li class="has-droupdown">
                        <a href="#" class="main" aria-expanded="false">Onepage</a>
                        <ul class="submenu mm-collapse" style={{height:" 0px;"}}>
                            <li><a href="onepage-one.html">Business One</a></li>
                            <li><a href="onepage-two.html">Business Two</a></li>
                            <li><a href="onepage-three.html">Business Three</a></li>
                            <li><a href="onepage-four.html">Business Four</a></li>
                            <li><a href="onepage-five.html">Finance Demo</a></li>
                            <li><a href="onepage-six.html">Marketing agency</a></li>
                            <li><a href="onepage-seven.html">Business agency</a></li>
                            <li><a href="onepage-eight.html">Business Management</a></li>
                            <li><a href="onepage-nine.html">Insurance Home</a></li>
                            <li><a href="onepage-ten.html">Business Website</a></li>
                            <li><a href="onepage-eleven.html">Business Parallax</a></li>
                            <li><a href="onepage-twelve.html">Business Video</a></li>
                            <li><a href="onepage-thirteen.html">Accountent One</a></li>
                            <li><a href="onepage-fourteen.html">Accountent Two</a></li>
                            <li><a href="onepage-fifteen.html">HR Website</a></li>
                            <li><a href="onepage-sixteen.html">Business Coach</a></li>
                            <li><a href="onepage-eighteen.html">Technology Demo</a></li>
                            <li><a href="onepage-nineteen.html">Business Investment</a></li>
                        </ul>
                    </li>
                    <li class="has-droupdown">
                        <a href="#" class="main" aria-expanded="false">Pages</a>
                        <ul class="submenu mm-collapse" style={{height:" 0px;"}}>
                            <li><a href="about.html">About
                                    Company</a></li>
                            <li><a href="service.html">Service</a></li>
                            <li><a href="service-details.html">Service
                                    Details</a>
                            </li>
                            <li><a href="service-details-2.html">Service
                                    Details 2</a>
                            </li>
                            <li><a href="project.html">Project</a>
                            </li>
                            <li><a href="team.html">Team</a>
                            </li>
                            <li><a href="team-details.html">Team
                                    Details</a>
                            </li>
                            <li><a href="pricing.html">Pricing</a>
                            </li>
                            <li><a href="appoinment.html">Appoinment</a>
                            </li>
                            <li><a href="history.html">Our
                                    History</a>
                            </li>
                            <li><a href="blog-list.html">Blog
                                    List</a>
                            </li>
                            <li><a href="blog-grid.html">Blog
                                    List</a>
                            </li>
                            <li><a href="blog-details.html">Blog
                                    Details</a>
                            </li>
                            <li><a href="blog-details-2.html">Blog
                                    Details 02</a>
                            </li>
                            <li><a href="faq.html">Faq's</a></li>
                            <li><a href="career.html">Career</a>
                            </li>
                            <li><a href="our-mission.html">Our
                                    Mission</a>
                            </li>
                            <li><a href="partners.html">Partners</a>
                            </li>
                        </ul>
                    </li>
                    <li class="has-droupdown">
                        <a href="#" class="main" aria-expanded="false">Services</a>
                        <ul class="submenu mm-collapse" style={{height: "0px;"}}>
                            <li><a class="mobile-menu-link" href="service.html">Service</a></li>
                            <li><a class="mobile-menu-link" href="service-details.html">Service Details</a></li>
                            <li><a class="mobile-menu-link" href="service-details-2.html">Service Details 2</a></li>
                            <li><a class="mobile-menu-link" href="service-details-3.html">Service Details 3</a></li>
                            <li><a class="mobile-menu-link" href="service-details-4.html">Service Details 4</a></li>
                            <li><a class="mobile-menu-link" href="service-details-5.html">Service Details 5</a></li>

                        </ul>
                    </li>
                    <li class="has-droupdown">
                        <a href="#" class="main" aria-expanded="false">Projects</a>
                        <ul class="submenu mm-collapse">
                            <li><a href="project.html">Project</a>
                            </li>
                            <li><a href="project-slider.html">Project
                                    Slider</a></li>
                            <li><a href="project-slider-2.html">Project
                                    Slider 2</a></li>
                            <li><a href="project-card-slider.html">Project
                                    Card Slider</a></li>
                            <li><a href="project-bg-dark.html">Project
                                    Bg Dark</a></li>
                            <li><a href="project-grid.html">Project
                                    Grid</a></li>
                            <li><a href="project-grid-col-2.html">Project
                                    Grid Col 2</a></li>
                            <li><a href="project-slider-grid.html">Grid Slider</a></li>
                            <li><a href="project-slider-overflow.html">Project Overflow</a>
                            </li>
                            <li><a href="project-grid-col-3.html">Project Grid Col 3</a>
                            </li>
                            <li><a href="project-bg-dark.html">Project
                                    Hide Content</a></li>


                            <li><a href="project-slider-2.html">Project
                                    Hide
                                    Content wide</a>
                            </li>
                            <li><a href="project-grid.html">Project
                                    Card Hover</a>
                            </li>
                            <li><a href="project-slider-2.html">Project
                                    Slider Image
                                    Zoom</a>
                            </li>
                        </ul>
                    </li>
                    <li class="has-droupdown">
                        <a href="#" class="main" aria-expanded="false">Shop Pages</a>
                        <ul class="submenu mm-collapse">
                            <li><a href="shop.html">Shop</a>
                            </li>
                            <li><a href="shop-single.html">Shop
                                    Details</a>
                            </li>
                            <li><a href="account.html">Account</a>
                            </li>
                        </ul>
                    </li>
                    <li class="has-droupdown">
                        <a href="#" class="main" aria-expanded="false">Blog</a>
                        <ul class="submenu mm-collapse">
                            <li><a href="blog-grid.html">Blog Grid</a></li>
                            <li><a href="blog-list.html">Blog List</a></li>
                            <li><a href="blog-details.html">Blog Details</a></li>
                            <li><a href="blog-details-2.html">Blog Details 2</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="contact.html" class="main" aria-expanded="false">Contact Us</a>
                    </li>
                </ul>
            </nav>

            <div class="social-wrapper-one">
                <ul>
                    <li>
                        <a href="#" aria-label="Facebook">
                            <i class="fa-brands fa-facebook-f"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" aria-label="twitter">
                            <i class="fa-brands fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" aria-label="youtube">
                            <i class="fa-brands fa-youtube"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" aria-label="linkedin">
                            <i class="fa-brands fa-linkedin-in"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
      
    </div>
        </>
    )
}