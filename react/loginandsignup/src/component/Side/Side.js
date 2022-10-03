import React from "react";
import './Side.css';

function Side(){
    //사이드에 표시를 할 랭킹 리스트
    const rankList = ["구매순", "신제품", "후기순", "좋아요순", "할인율순"]

    const sideRender = rankList.map(v => {
        return(
            <div id='a' key={v}>
              <p className='side-rank-title'>{v}</p>
              <div className='side-rank-text'>
                <p>1.1등</p>
                <p>2.2등</p>
                <p>3.3등</p>
              </div>
            </div>
        )
    })
    return(
        <div className='main-side'>
            {sideRender}
        </div>
    )
}

export default Side;