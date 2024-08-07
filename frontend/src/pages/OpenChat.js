import React, { useEffect, useState, useCallback } from 'react';
import './OpenChat.css';
import * as StompJs from '@stomp/stompjs';
import $ from 'jquery';
import useAuthStore from '../stores/authStore';


const OpenChat = () => {
    //변수 선언
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userNickname, setUserNickname] = useState('');
    const [inputMessage, setInputMessage] = useState('');

    const token = useAuthStore((state) => state.accessToken);
    const userId = useAuthStore((state) => state.userId);
    const logo = '/image/open-chatting-logo.png';
    const sendButton = '/image/open-chat-send-button-img.png';

    const connect = useCallback(() => {
        if (stompClient) {
            stompClient.activate();
        }
    }, [stompClient]);

    useEffect(() => {
        //컴포넌트가 마운트될 때 실행되는 함수들
        const client = new StompJs.Client({
            brokerURL: 'wss://i11d107.p.ssafy.io/chestnutApi/open-chatting',
            connectHeaders: {
                access: token,
                nickname: ''
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = (frame) => {
            setConnected(true);
            console.log('Connected: ' + frame);

            client.subscribe('/topic/chat-room', (broadcast) => {
                let body = JSON.parse(broadcast.body);
                setUserNickname(body.nickname);
                showChatting(body.nickname, body.content, body.sendAt, body.loginId);
            });
        };

        client.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
        };

        client.onStompError = (frame) => {
            console.error('STOMP Error:', frame);
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
            alert("소켓 연결 실패");
            disconnect();
        };

        setStompClient(client);

        return () => {
            //컴포넌트가 언마운트되거나 다음 효과 실행 전 정리 작업
            if (client) {
                client.deactivate();
            }
        };
    }, []);

    useEffect(() => {
        const chatArea = document.querySelector('.chat-area');
        chatArea.scrollTop = chatArea.scrollHeight;
    }, [messages])

    useEffect(() => {
        if (stompClient) {
            connect();
        }
    }, [stompClient, connect]);


    //일반 함수 선언
    

    const disconnect = () => {
        if (stompClient) {
            stompClient.deactivate();
            setConnected(false);
            console.log("Disconnected");
        }
    };

    const send = (e) => {
        e.preventDefault();
        if (inputMessage.trim() !== '') {
            stompClient.publish({
                destination: "/app/chat-center",
                body: JSON.stringify({
                    'content': $("#content").val()
                }),
                headers: {
                    access: token,
                    nickname: userNickname
                },
            });
            setInputMessage('');
        }
        
    };

    const showChatting = (nickname, content, sendAt, loginId) => {
        const newMessage = {nickname, 
            content, 
            sendAt, 
            loginId,
            isMine: loginId === userId    
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return (
        //html 문서 작성
        <div id="open-chatting-room" className="open-chat-container">
            <div className="header">
                <img src={logo} className='header-logo' onClick={connect}/>
            </div>
            <div className='chat-area'>
                <div className='warning-message'>
                    <p>상대를 비방하거나 상처를 주는 언행은 삼가해주세요.</p>
                    <p>매너있는 채팅 문화를 만들어갑시다.</p>
                </div>
                {messages.map((message, index) => (
                    message.isMine ? (
                        <div key={index} className='my-area'>
                            <div className='my-nickname'>{message.nickname}</div>
                            <div className='my-balloon'>{message.content}</div>
                        </div>
                    ) : (
                        <div className='friend-area'>
                            <div className='friend-nickname'>{message.nickname}</div>
                            <div className='friend-balloon'>{message.content}</div>
                        </div>
                    )
                ))}
            </div>
            <div className='text-input-area'>
                <form className='text-send-form' onSubmit={send}>
                    <input 
                        id="content" 
                        type='text' 
                        className='send-input' 
                        value={inputMessage} 
                        onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <button type='submit' className="send-button">
                        <img id="send" src={sendButton} className='send-button-img'></img>
                    </button>
                </form>
            </div>
        </div>
    );

};

export default OpenChat;