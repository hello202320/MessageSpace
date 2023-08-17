import { FaGoogle } from 'react-icons/fa';

function Login({login}){
    return(
        <div className="login-container">
        <div className="login-content">
            <div className='login-center'>
                <h1>Welcome!</h1>
                <span className='file'><p>Start chatting today! Login to Enter 👇</p></span>
                <button className='login-button'onClick={login}>
                   <span className='login-h-center'>
                    <span className="icon"><FaGoogle/></span>
                    Login with Google</span> 
                </button>
            </div>
            
        </div>
    </div>
    )
}

export default Login