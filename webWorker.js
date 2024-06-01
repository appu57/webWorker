//multiple calculation or api call can block the main thread execution which can user experience slow so we can use web worker
//Web Workers are a simple means for web content to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface. 
//In addition, they can make network requests using the fetch() or XMLHttpRequest APIs. Once created, a worker can send messages to the 
//JavaScript code that created it by posting messages to an event handler specified by that code (and vice versa).

//Whenever the application starts the main animation , interfaces will be executing in main thread , when we use worker the execution written within worker
//runs in background and do not affect the main thread so the animation , user experience will not be affected therefor while user tries using the application 
//in background we can make an huge calculation or api call to the backend



//Normal function or api calls with no worker
const onClickWhenExecutingInMainThread = () =>{
    let sum =0;
    for(let i=0;i<1_000_000_000;i++)
    {
        sum+=i;
    }
    console.log("Sum" + sum);
}


const worker = new Worker("worker.js");
worker.onmessage=(event)=> {
    console.log(`Sum ${event.data}`);
}

const onClick = () =>{
    worker.postMessage("start"); 
}
document.addEventListener("click",()=>{  //so when we call worker.postmessage , onmessage within worker file is called .In worker there is a function assigned to onmessage which is called when we call postmessage , and then after processing it calls postMessage(response) which in turn calls worker.onmessage=(event) in main file . 
    
//Similarly like websocket , from client to send an event we use connection.send(event) to send event to server and server using socket.onmessage recieves message . Socket sends message to client using socket.send and client receives using connection.onmessage
    onClick();
})
//The above function uses worker function to run calculation in background and will not allow us to run the calculation in main thread , if we run it can block main thread . But we can still run calculation in main Thread and without blocking , by using GENERATOR FUNCTION