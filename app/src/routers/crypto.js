const crypto = require('crypto');

const createSalt = () => {
    //crypto 모듈에서 제공하는 randombytes 함수를 사용함
    //현재는 단방향 암호화 => 복호화가 불가능 한 암호화를 진행할거임
    //그럴 때에 해킹에 위험에서 벗어나기 위해서 salt와 키스트레칭 방식을 사용
    return new Promise((resolve, reject)=> {
        const salt = crypto.randomBytes(256, (err, buf)=>{
            if(err) {
                console.log(err);
                reject(err);
            }
            resolve(buf.toString('base64'));
        })
    })
}
const encryption = {
    incode : (inputPwd) => {
        return new Promise( async (resolve, reject) => {
            const salt = await createSalt();
            crypto.pbkdf2(inputPwd, salt, 13672, 64, "sha512", (err, key) => {
                if(err) reject(err);
                resolve({pwd : key.toString("base64"), salt});
            })
        })
        
    },

    loginIncode : (inputPwd, salt) => {
        return new Promise( async (resolve, reject) => {
            crypto.pbkdf2(inputPwd, salt, 13672, 64, "sha512", (err, key) => {
                if(err) reject(err);
                resolve({hashPwd : key.toString("base64")});
            })
        })
    }
}

module.exports = {
    encryption,
    createSalt
};