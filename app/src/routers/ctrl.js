const mysql = require('mysql');
const conn = {  // mysql 접속 설정
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'kt1079616',
    database: 'test220901'
};

let connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect();

const process = {
    login : (req, res) => {
        const request = req.body;
        let sql = `select pwd from member where id = ${request.id}`
        connection.query(sql, (err, results, fields) => {
            let answer = {};
            if (err) {
                answer.success = false;
                answer.msg = "일치하는 아이디가 없습니다.";
                console.log(err);
            }else{
                if(request.pwd && results[0].pwd === request.pwd)answer.success = true;
                else if(!request.pwd){
                    answer.success = false;
                    answer.msg = "비밀번호를 입력해주세요";
                }
                else{
                    answer.success = false;
                    answer.msg = "비밀번호가 일치하지 않습니다.";
                }
            }
            res.send(answer);
        });
        
    },

    signup : (req, res) => {
        const request = req.body;
        let sql = `insert into member (id, pwd) values (${request.id}, ${request.pwd})`
        connection.query(sql, (err, results, fields) => {
            let answer = {};
            if (err) {
                answer.success = false;
                answer.msg = err;
                console.log(err);
            }else{
                answer.success = true;
                answer.msg = results;
                console.log(results);
            }
            res.send(answer);
        });
        // console.log(req.body);
    }
}

module.exports = {
    process,

}