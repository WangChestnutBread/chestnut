import React, {useState} from "react";
function BackButton(){
    return(
        <div>
            <button style={{width: 50, height: 50, left: 135, top: 60,padding: 0,border: '1px black solid',  position: 'absolute', borderRadius: 100 }}><img src="/icons/MemberBackButton.svg" alt="Backto"/></button>
        </div>
    );
}
export default BackButton;