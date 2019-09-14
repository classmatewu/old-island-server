// // 一、普通的trycatch异常处理

// function fn1() {
//     try {
//         fn2();
//     } catch (error) {
//         throw error
//     }
// }

// function fn2() {
//     try {
//         fn3();
//     } catch (error) {
//         throw error
//     }
// }

// function fn3() {
//     try {
//         console.log(1/0);
//     } catch (error) {
//         throw error
//     }
//     return "success"
// }

// console.log(fn3());  // Infinity   success


// 二、利用promise、async、await处理异步异常

function fn1() {
    try {
        fn2();
    } catch (error) {
        throw error
    }
}

async function fn2() {
    try {
        await fn3();
    } catch (error) {
        console.log("error");
    }
}

function fn3() {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            const r = Math.random();
            if(r < 0.5) {
                reject("error");
            }
        })
    })
}

fn2();