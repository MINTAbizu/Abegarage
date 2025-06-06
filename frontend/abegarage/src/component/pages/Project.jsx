import React from 'react'
import project6 from '../../assets/assets/template_assets/images/resource/project-6.jpg'
import About from '../../component/pages/About'

function Project() {
  return (
    <div>
        <section class="projects-section style-two">
        <div class="auto-container">
            <div class="sec-title style-two">
                <h2>Featured Projects</h2>
                <div class="text">Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate <br/> strategy foster collaborative thinking to further.</div>
            </div>
            <div class="row">
                <div class="col-lg-3 project-block-one">
                    <div class="inner-box">
                        <div class="image"><img src={project6} alt=""/></div>
                        <h4><a href="project-details.html">Engine Repairing</a></h4>
                    </div>
                </div>
                <div class="col-lg-3 project-block-one">
                    <div class="inner-box">
                        <div class="image"><img src={project6} alt=""/></div>
                        <h4><a href="project-details.html">Body Painting</a></h4>
                    </div>
                </div>
                <div class="col-lg-3 project-block-one">
                    <div class="inner-box">
                        <div class="image"><img src={project6} alt=""/></div>
                        <h4><a href="project-details.html">Tyre Break Fix</a></h4>
                    </div>
                </div>
                <div class="col-lg-3 project-block-one">
                    <div class="inner-box">
                        <div class="image"><img src={project6} alt=""/></div>
                        <h4><a href="project-details.html">Engine Repairing</a></h4>
                    </div>
                </div>
                <div class="col-lg-3 project-block-one">
                    <div class="inner-box">
                      <div class="image"><img src={project6} alt=""/></div>
                         <h4><a href="project-details.html">Engine Repairing</a></h4>
                    </div>
                </div>
                <div class="col-lg-3 project-block-one">
                    <div class="inner-box">
                        <div class="image"><img src={project6} alt=""/></div>
                        <h4><a href="project-details.html">Body Painting</a></h4>
                    </div>
                </div>
                 <div class="col-lg-3 project-block-one">
                    <div class="inner-box">
                        <div class="image"><img src={project6} alt=""/></div>
                        <h4><a href="project-details.html">Body Painting</a></h4>
                    </div>
                </div>
                 <div class="col-lg-3 project-block-one">
                    <div class="inner-box">
                        <div class="image"><img src={project6} alt=""/></div>
                        <h4><a href="project-details.html">Body Painting</a></h4>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <About/>
      
    </div>
  )
}

export default Project
