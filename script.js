let username = prompt("cual es tu nombre: ");

addEventListener("DOMContentLoaded", () => {
    const containerMsj = document.getElementById("container-msj");
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register("./sw.js")

    }
    navigator.serviceWorker.addEventListener("message", (e) => {
        if (e.data.focus) {
            containerMsj.innerHTML += `
                <div class="w-full focus">
                    <p class=" p-4 rounded-md text-white bg-slate-900 w-max flex flex-col items-center gap-2"><span>${e.data.username}</span><span>${e.data.msj}</span></p>
                </div>
            `
        } else {
            containerMsj.innerHTML += `
                <div class="w-full no-focus">
                    <p class=" p-4 rounded-md text-white bg-slate-900 w-max flex flex-col items-center gap-2"><span>${e.data.username}</span><span>${e.data.msj}</span></p>
                </div>
            `
        }
        containerMsj.scrollTop = containerMsj.scrollHeight;
    })
})



function sendMessage(msj) {
    navigator.serviceWorker.ready.then(res => {
        res.active.postMessage({ msj, username })
    })
}

// const btnSendMsj = document.getElementById("btn-send-msj");
const inputMsj = document.getElementById("input-msj")


document.getElementById("form-msj").addEventListener("submit", (e) => {
    e.preventDefault();
    let msj = inputMsj.value;
    if (msj !== "" && username !== null) {
        sendMessage(msj);
    } else {
        username = prompt("dime tu nombre: ")
        if (msj !== null) {
            sendMessage(msj);
        }
    }
})

