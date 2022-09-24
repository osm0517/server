import React, {useEffect}from "react";
import { useParams } from "react-router-dom";
import "./Main.css";

function Main({match}) {
    const {type} = useParams();
    const values = [];
    useEffect(() => {
        fetch(`http://localhost:5000/view/${type}`, {
            method : "GET"
        }).then(res => res.json())
        .then(res => res.map(value => values.push(value)))
        .then(res => console.log(values))
        .catch(err => console.log("err => " + err));
    }, [])

    const imageRender = values.map(value => {
        return(
            <div className="clothes-div">
                <div className="text-div clothes-name">{value.id} </div>
                <div className="text-div clothes-image">{value.image} </div>
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