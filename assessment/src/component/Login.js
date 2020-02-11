import React,{ useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../context/auth';


const LOGIN_MUTATION = gql`
    mutation login(
        $email:String!,
        $password: String!
        ){
        loginUser(
            user:{
            email:$email,
            password:$password
            }
        ){
            accessToken message status
        }
    }
`;


function Login(props){

    const context = useContext(AuthContext);
    const [errors, setErrors] = useState(false);
    const [values,setValues] = useState({
       email: '',
       password: ''
   });

   const onChange = (e)=>{
        //e.preventDefault();
        setValues({...values,[e.target.name]: e.target.value});
   }

   const [loginUser, {loading}] = useMutation(LOGIN_MUTATION,{
    update(_,result){
        const userData =  result.data.loginUser;
        context.login(userData);
    },
    onError(err){
        console.log(err);
       setErrors(true);
    },
    variables:values
}) 
   const onSubmit = (e)=>{
       e.preventDefault();
       loginUser();
   }
   
  

        return(
                      <main>
                        <div className="container">
                            <div className="space-50"></div>
                            <div className="white form-wrapper">
                            
                        <br />
                        <div className="row">
                            <div className="col s12 m6 offset-m3">
                                <h5 className="title-color">Hey, Welcome back.</h5>
                                <p>Plug in your account detail below so we can open the gate for you!</p>
                                <p className={errors ? 'red center white-text':'hide'} style={{width:'auto', padding:'10px 0'}}>
                               {errors ? 'Invalid credentials':''
                               }
                               </p>
                                <form onSubmit={onSubmit}>
                                    <div className="row center">
                                        <div className="col s12 input-field">
                                            <input type="email" name="email" value={values.email} onChange={onChange} id="email" autoComplete="off" required/>
                                        <label htmlFor="email">Email Address</label>
                                        </div>
                                    
                                        <div className="col s12 input-field">
                                            <input type="password" name="password" value={values.password} onChange={onChange} id="password" autoComplete="off" required/>
                                        <label htmlFor="password">Password</label>
                                        </div>
                                        <div className="col s12">
                                        <button className={loading ? 'btn btn-primary disabled':'btn btn-primary'}>Login</button>
                                            </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        </div>
                    </div>
                </main>
                
        )
    
}

export default Login;
