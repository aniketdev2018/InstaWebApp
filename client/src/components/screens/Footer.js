import React from "react";
import ReactDOM from 'react-dom';
import { SocialIcon } from 'react-social-icons';
//ReactDOM.render(<SocialIcon url="http://twitter.com/jaketrent" />, document.body);
//const mdbreact = require('mdbreact'); const { Button, Collapse } = mdbreact;

const Footer = () => {
  return (
    <div >
    <footer class="page-footer" >
          <div class="container" >
            <div class="row" >
              <div class="col 16 s18" style={{margin:"0px 200px 0px 200px"}}>
                <p class="white-text text-lighten-4">For any queries please mail us at 
                 <a class="black-text text-darken-4" href="mailto:devaniket12345@gmail.com"><strong> devaniket12345@gmail.com</strong></a>
                 
                 </p>
             
                <h5 class="white-text">Contact Us</h5>
                
           

                <i> <SocialIcon url="http://instagram.com/im_aniket_ch" /> </i>

               <i> <SocialIcon url="https://www.youtube.com/channel/UCCYZdArRuSj3-Tro9I3JL9g" /></i>
               <i> <SocialIcon url="http://github.com/aniketdev2018" /> </i>
              <i>  <SocialIcon url="http://facebook.com/aniket3552" /> </i>
              
                 

                
              </div>
            </div>
          </div>
          <div class="footer-copyright"  >
            <div class="container" >
              <p style={{margin:"0px 200px 0px 200px", color:"#000000"}}>
             © 2020, Aniket.
         </p>
            </div>
          </div>
        </footer>
        </div>
            
  );
}

export default Footer;


