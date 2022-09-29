import React, {useState, useEffect} from "react";
import $ from 'jquery';

function Signup() {
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const [exam, setExam] = useState("");
    const [name, setName] = useState("");

    //pwd와 exam이 일치하는지 확인하기 위함
    //동일하지 않으면 exam을 빨간 박스로 만들고 일치하지 않는다고 표시.
    useEffect(() => {
        if(pwd != exam){
            $('.button').css('background-color', 'red');
        }else{
            $('.button').css('background-color', 'black');
        }
    }, [pwd, exam])

    const signup = () => {
        fetch("http://localhost:5000/signup", {
            method : "POST",
            body : {
                id : id,
                pwd : pwd,
                name : name,
            }
        }).then( res=> res.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
    }

    //글자수를 측정해서 미달되면 false를 반환해서 조건이 넘어가지 않게 함
    const stateCheck = (value, cut) => {
        if(value.length > cut) return false;
        return true;
    }

    //함수로 한번에 확인하게 하기
    const signupProcess = () => {
        if(stateCheck(id, 6) && stateCheck(pwd, 8) && stateCheck(name, 2)) signup();
        else{
            alert("3개 중에 하나가 안됐으니까 다시 확인해봐 하지만 마지막에는 바꿔야한다!:)")
        }
    }

    const identify = () => {
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
                setExam(e.target.value);
            }}/><br/>
            <input placeholder='name' className='pwd-div'
            onChange={ (e)=> {
                setName(e.target.value);
            }}/>
            <div onClick={signupProcess}className='button'>회원가입</div>
        </div>
    )
}

export default Signup;