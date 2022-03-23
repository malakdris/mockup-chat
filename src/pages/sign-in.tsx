import {Form,Wrapper,UserIcon,ForgotPasswordSpn,Lock_Locked as LockLocked,Lock_Open as LockOpen,FormWrapper,SubmitButton,FormInput} from './styles/sign-in';
//import {FormDark,WrapperDark,UserIconDark,ForgotPasswordSpnDark,Lock_LockedDark as LockLockedDark,Lock_OpenDark as LockOpenDark,FormWrapperDark,SubmitButtonDark,FormInputDark} from './styles/sign-inDark';
import {useState} from 'react'
import { useWindowSize } from 'usehooks-ts'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import {auth} from '../auth'

const Signin = (props:any) => {

  const [isprivacy, change_privacy] = useState(true)
  const {width} = useWindowSize()
  const [logindata, change_data] = useState({
    username: "",
    password: ""
  })
  let navigate = useNavigate()
  const handleusername = (e:any) =>{
    const username:string = e.target.value
    change_data({username:username,password:logindata.password})
  }
  const handlepassword = (e:any) =>{
    const password:string = e.target.value
    change_data({username:logindata.username,password:password})
  }
  const APIRequestHandler = () =>{
    axios.post('http://localhost:8000/login',
    {
      username:logindata.username,
      password:logindata.password
    })
    .then(response => {
      if (response.data['code'] === 'success'){
        window.localStorage.setItem('token',response.data['token'])
        window.localStorage.setItem('user', logindata.username)
        console.log(window.localStorage.getItem('user'))
        auth.signin(logindata.username)
        navigate('/')
      } 
    })
    .catch(error => console.error(error))
  }
 
  if(auth.isAuthenticated) navigate('/Account')
  return (
    <Wrapper>
      <Form onSubmit={APIRequestHandler}>
        <FormWrapper>
          <h1 style={{marginTop: '150px',color:'#000913'}}>Sign in<UserIcon></UserIcon></h1>
          <FormInput placeholder="Username:" onChange={ e => handleusername(e)} name='username' type="text" ></FormInput>
          <FormInput placeholder="Password:" onChange={ e => handlepassword(e)} name='password' type={isprivacy?'password':'text'} style={{marginBottom:'24px'}}></FormInput>
          {isprivacy?<LockLocked onClick={()=>{change_privacy(isprivacy?false:true)}}></LockLocked>:undefined}
          {!isprivacy?<LockOpen  onClick={()=>{change_privacy(isprivacy?false:true)}}></LockOpen>:undefined}
          <br></br>
          <div style={{height:'0px',backgroundColor:'transparent',width:width<=768 ? '70%':'60%',left:width<=768?'15%':'20%',position:'absolute',border:'1px dashed #000913'}}></div>
          <br></br>
          <ForgotPasswordSpn to='/ForgotPassword'>Forgot Password?</ForgotPasswordSpn>
          {width<=768?<br></br>:undefined}
          <div style={{marginLeft:'25%'}}>
          <SubmitButton onClick={APIRequestHandler}>Sign in</SubmitButton>
          </div>
        </FormWrapper>
      </Form>
    </Wrapper>
  )}
export default Signin