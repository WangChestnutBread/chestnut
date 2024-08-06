let token
    = 'eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImxvZ2luSWQiOiJkdWxpMTIzIiwicm9sZSI6IlJPTEVfQURNSU4iLCJpYXQiOjE3MjI5MDYwMjksImV4cCI6MTcyMjk5MjQyOX0.TUdmAJVThoF2s6l6XB9FQ5r2gGLmGyU0rcv1GaNvQz4'
let userId = 'duli123'
let userNickname = ''

const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8081/open-chatting',
    connectHeaders: {
        access: token,
        nickname: ''
    }
});

stompClient.onConnect = (frame) => { //connect되었을 때
    setConnected(true);
    console.log('Connected: ' + frame);
    //Upon a successful connection, the client subscribes to the /topic/greetings destination, where the server will publish greeting messages.
    stompClient.subscribe('/topic/chat-room', (broadcast) => {
        let body = JSON.parse(broadcast.body);
        userNickname = body.nickname;
        showChatting(body.nickname, body.content, body.sendAt, body.loginId);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
}

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
    alert("소켓 연결 실패");
    disconnect();
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

function showChatting(nickname, content, sendAt, loginId) {
    var $row = $("<tr>")
        .append($("<td>").text(loginId))
        .append($("<td>").text(nickname))
        .append($("<td>").text(content))
        .append($("<td>").text(sendAt));

    if (loginId === userId) {
        $row.css('background-color', 'skyblue');
    }

    $("#greetings").append($row);
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
            'content': $("#content").val()
        }),
        headers: {
            access: token,
            nickname: userNickname
        },
    });
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $("#connect").click(() => connect());
    $("#disconnect").click(() => disconnect());
    $("#send").click(() => send());
})


