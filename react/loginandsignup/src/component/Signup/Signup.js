import React, {useState} from "react";

function Signup() {
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");

    const login = (req, res) => {
        fetch("http://localhost:5000/test", {
            method : "POST"
        }).then( res=> res.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
    }

    const identify = (req, res) => {
        fetch(`http://localhost:5000/identify/${id}`, {
            method : "GET"
        }).then( res=> res.json())
        .then(res => {
            if(res.success) alert("가능한 아이디입니다.");
            else{
                alert("이미 있는 아이디입니다.")
            }
        })
        .catch(err => console.log(err));
    }
    return(
        <div>
            <div className="login">
            <input placeholder='id' className='id-div'
            onChange={ (e)=> {
                setId(e.target.value);
            }}/>
            <div onClick={identify}> 중복 확인 </div><br/>
            <input placeholder='pwd' className='pwd-div'
            onChange={ (e)=> {
                setPwd(e.target.value);
            }}/><br/>
            <input placeholder='pwd 확인' className='pwd-div'
            onChange={ (e)=> {
                setPwd(e.target.value);
            }}/><br/>
            <input placeholder='name' className='pwd-div'
            onChange={ (e)=> {
                setPwd(e.target.value);
            }}/>
            <div className='button' 
            onClick={ login }>로그인</div>
            <div className='button'>회원가입</div>
        </div>
        </div>
    )
}

export default Signup;