const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8081/open-chatting'
});

stompClient.onConnect = (frame) => { //connect되었을 때
    setConnected(true);
    console.log('Connected: ' + frame);
    //Upon a successful connection, the client subscribes to the /topic/greetings destination, where the server will publish greeting messages.
    stompClient.subscribe('/topic/chat-room', (broadcast) => {
        let body = JSON.parse(broadcast.body);
        showChatting(body.nickname, body.content, body.sendAt);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
}

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
}



function setConnected(connected) {
    $("#connect").prop("disabled", connected); //connect되었을 때는 connect 버튼 비활성화
    $("#disconnect").prop("disabled", !connected); //disconnect되었을 때는 disconnect 버튼 비활성화
    if (connected) {
        $("#conversation").show(); //connect되었을 때는 대화창 보이기
    } else {
        $("#conversation").hide(); //disconnect되었을 때는 대화창 숨기기
    }
    $("#greetings").html(""); //greetings 내용을 공백으로 바꿈
}

function showChatting(name, content, sendAt) {
    $("#greetings").append("<tr><td>"+name+"</td><td>"+content+"</td><td>"+sendAt+"</td></tr>") //문자 받을 때 표에 메세지 내용 추가
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

//이게 메인임
//The sendName() function retrieves the name entered by the user and uses the STOMP client to send it to the /app/hello destination
function send() {
    stompClient.publish({
        destination: "/app/chat-center",
        body: JSON.stringify({
            'loginId': $("#loginId").val(),
            'nickname': $("#nickname").val(),
            'content': $("#content").val()
        })
    });
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $("#connect").click(() => connect());
    $("#disconnect").click(() => disconnect());
    $("#send").click(() => send());
})


