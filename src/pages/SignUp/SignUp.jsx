/**Dependencies */
import { useFormik } from "formik";
import React,{useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import readCookie from "../../constants/CookieFunctions/readCookie";

/***Style */
import RegisterStyle from "../../styles/RegisterStyle/RegisterStyle.module.css";

/**Validation */
import RegisterValidation from "../../constants/Validations/registerValidation";

/**Services */
import api from '../../services/api';

/**Context */
import {useAuth} from '../../context/authContext';


import {toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()  

function SignUp() {
  const {login} = useAuth();

  let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: RegisterValidation,
        onSubmit: async (values) => {
          try {
          const response = await  api.Register({
              username: values.email,
              email: values.email,
              password: values.password,
            });
            if( response.status!==200){
              const notify = () => {
               
                  toast.error(response.data.message[0].messages[0].message,
                 {
                     style:{backgroundColor:' #FFE5E5',color:'#F77474'},
                  
                  autoClose: 3000,
                  draggable: false,
                  newestOnTop: true,
                  position: "top-right",
                  closeButton: false,
                  progressBar: false,
                  pauseOnHover: false,
                  hideProgressBar: true,
                  closeOnClick: true,
                  theme: "colored"
                 }
                      );
              }
              notify();
          }
          else{
            login(response.data);
            console.log(response)
            navigate('/');
          }
            
            
          } 
          catch (error) {
            console.log(error);
          }
          
        },
      });
      
    



      useEffect(() => {
        const token = readCookie("access-token");
        if(token){
            navigate('/');
        }
        
      }, [])
    
    
     
    

  return (
    <div className={RegisterStyle.Container}>
        <div className={RegisterStyle.ImageLeft}></div> 
        
      <div className={RegisterStyle.FormContainer}>
      <div className={RegisterStyle.Icon}>
           
           </div>
        <div className={RegisterStyle.Header}>
            <div className={RegisterStyle.UyeOlHeaderText}>Üye Ol</div>
            <div className={RegisterStyle.TextUnderHeader}>Fırsatlardan yararlanmak için üye ol!</div>
        </div>
        <div className={RegisterStyle.Form}>
            <form onSubmit={formik.handleSubmit}>
                <div className={RegisterStyle.FormElements}>
                    <div className={RegisterStyle.Email}>
                        <label className={RegisterStyle.Label} htmlFor="email">Email</label>
                        <input className={RegisterStyle.Input} 
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        type="email" name="email"  placeholder="Email@example.com" />
                    </div>
                    <div className={RegisterStyle.Password}>
                        <label className={RegisterStyle.Label} htmlFor="password">Şifre</label>
                        <input className={RegisterStyle.Input}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        type="password" name="password" placeholder="•••••" />
                    </div>
                    <div className={RegisterStyle.RegisterButton}>
                        <button className={RegisterStyle.Button} type="submit">Üye Ol</button>
                    </div>
                </div>
            </form>

        </div>
        <div className={RegisterStyle.Footer}>
            <span className={RegisterStyle.FooterTextHesabınVarmi}>Hesabın var mı?</span>
            <Link to={"/signin"} style={{textDecoration:'none'}}>
            <span className={RegisterStyle.FooterTextGirisYap}>Giriş Yap</span>
            </Link>
        </div>
   
      </div>
    </div>
  );
}

export default SignUp;
