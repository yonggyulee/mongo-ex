// 외부 모듈 불러오기
const Ticker = require("./modules/ticker");

let second = 0;
// Ticker 인스턴스


// 이벤트 리스너 부착
process.on("tick", () => {
    // tick 이벤트를 받으면 리스터를 수행(콜백)
    second++;
    console.log(second, "초가 지났습니다.");

    if(second > 10){
        ticker.emit("stop")     // ticker 객체에 stop 이벤트 전송
    }

});

let ticker = new Ticker(process);

ticker.start(); // ticker 구동