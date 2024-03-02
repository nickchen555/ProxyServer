async function sleep(delay) {   
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

//const sleep = (delay) => {
//    return new Promise(resolve => {
//        setTimeout(resolve, delay); 
//    });
//};

//const sleep = ms => new Promise(res => setTimeout(res, ms));