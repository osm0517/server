import React,{useState} from "react";
import './Login.css'

function Login() {
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");

    const login = (req, res) => {
        fetch("http://localhost:5000/test", {
            method : "POST"
        }).then( res=> res.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
    }

    return(
        <div className="login">
            <input placeholder='id' className='id-div'
            onChange={ (e)=> {
                setId(e.target.value);
            }}/><br/>
            <input placeholder='pwd' className='pwd-div'
            onChange={ (e)=> {
                setPwd(e.target.value);
            }}/>
            <div className='button' 
            onClick={ login }>로그인</div>
            <div className='button'>회원가입</div>
        </div>
    )
}

export default Login;