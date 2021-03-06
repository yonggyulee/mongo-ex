const { MongoClient } = require('mongodb'); // 최근 방식
// const MongoClient = require('mongodb').MongoClient; // 이전 방식

// mongodb://{서버IP}:{port}/{데이터베이스 이름}

// 클라이언트 생성
const url = "mongodb://192.168.1.133/mydb";
const client = new MongoClient(url, { useUnifiedTopology: true });

// 문서 한 개 가져오기
function testFindOne(){
    client.connect().then(client => {
        const db = client.db("mydb");

        db.collection("friends").findOne().then(result => {
            console.log(result);
        });
    })
}
//testFindOne();

// db.collection.find();
// SQL: SELECT * FROM table;
function testFind(){
    
    client.connect().then(client => {
        const db = client.db("mydb");

        // 데이터가 많다.
        // db.collection("friends").find((err, cursor) =>{
        //     if(err){
        //         console.log(err);
        //     } else {
        //         cursor.forEach(item => {
        //             console.log(item)
        //         });
        //     }
        // });
        // 데이터가 많지 않을 때는 toArray -> Promise 지원
        db.collection("friends").find()
            .skip(2)        // 2개 건너뛰기
            .limit(2)       // 2개 가져오기
            .sort({name: 1})    // 1: 오름차순, -1: 내림차순
            .toArray()
            .then(result => {
            for( let i = 0; i < result.length; i++){
                console.log(result[i]);
            }
        }).catch(err => {
            console.error(err);
        });
    });

    
}

//testFind();

// 조건절
// SELECT * FROM table WHERE column...;
function testFindByName(name){
    client.connect().then(client => {
        const db = client.db("mydb");

        db.collection("friends").find({
            name: name
        }).toArray().then(result => {
            for( let i = 0; i < result.length; i++){
                console.log(result[i]);
            }
        }).catch(err => {
            console.error(err);
        });
    })
}

// testFindByName("고길환"); 

// 비교 연산자 : $gt(>), $gte(>=), $lt(<), $lte(<=). $ne(!=)
// 논리 연산자 : $and, $or, $not
function testFindByCondition(projection, condition){
    client.connect().then(client => {
        const db = client.db("mydb");

        db.collection("friends").find(
            condition,  //조건
            projection
        ).toArray().then(result => {
            for( let i = 0; i < result.length; i++){
                // console.log(result[i].name,
                //     result[i].age,
                //     result[i].species);
                console.log(result[1]);
            }
        }).catch(err => {
            console.error(err);
        });
    })
}
// projection 객체 : 1이면 표시, 0이면 표시하지 않음.
const pj = {name: 1, age: 1, species: 1};
let cd = {$and: [{age : {$gte: 20 }}, {age : {$lte: 50}} ] };
cd = {$or : [ {age : { $lt: 20}}, {age : { $gt: 50}} ]};

// testFindByCondition(pj, cd);


