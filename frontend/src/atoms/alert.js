import React, {useEffect} from "react";
import Swal from "sweetalert2";
import './alert.css'

function CustomAlert (props) {
    useEffect(() => {
        Swal.fire({

            html: `
                    <div class="swal2-custom-html">
                        <div class="custom-icon" style="display: inline-flex;">!</div>
                        <span class="custom-alert-content">${props.content}</span>
                    </div>
                `,
                
            confirmButtonText: "확인",
            customClass: {
                popup: 'custom-alert-popup',
                title: 'custom-alert-title',
                icon: 'custom-icon',
                content: 'custom-alert-content',
                confirmButton: 'custom-alert-button'
            },
            buttonsStyling: false, // 기본 스타일을 사용하지 않도록 설정
        });
    }, []);
    return null;
}

export default CustomAlert;