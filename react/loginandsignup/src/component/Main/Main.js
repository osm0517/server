import React, {useEffect, useState}from "react";
import { useParams } from "react-router-dom";
import "./Main.css";

function Main({match}) {
    const {type} = useParams();
    const [values, setValues] = useState([]);
    const [image, setImage] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            await fetch(`http://localhost:5000/view/${type}`, {
                method : "GET"
            }).then(res => res.json())
            .then(res => {setValues(res)
            console.log(res)})//test를 위해서 console 추가한거임
            .then(res => console.log(values))
            .catch(err => console.log("err => " + err));
        }
        loadData();
    }, [])
//먼저 기존에 있는 fetch로 옷 정보를 받고
//그 이후에 then 혹은 await을 이용해서 이미지를 받기
//받은 이미지를 useState를 이용해서 저장

    const imageRender = values.map((value, index) => {
        return(
            <div className="clothes-div" key={value.id}>
                <div className="text-div clothes-name">{value.id} </div>
                <img className="text-div clothes-image" src={`http://localhost:5000/image/${value.id}.jpeg`}></img>
                <div className="text-div" >{index} </div>
            </div>  
        )
    })

    return (
        <div className="main-div">
            <div className="text-div title">{ type } </div>
            { imageRender }
        </div>
    )
}

export default Main;