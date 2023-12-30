self.addEventListener("install", e => {
    console.log("instalando service worker");
})



self.addEventListener("activate", () => console.log("service worker activo"))


self.addEventListener("fetch", (e) => {
    console.log("service worker captando peticion")
})

self.addEventListener("message", (e) => {
    console.log(`recibiendo msj: ${e.data.msj}`);
    e.currentTarget.clients.matchAll({ includeUncontrolled: true, type: "all" }).then(clients => {
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].focused) {
                clients[i].postMessage({
                    msj: e.data.msj,
                    focus: true,
                    username: e.data.username
                })
            } else {
                clients[i].postMessage({
                    msj: e.data.msj,
                    focus: false,
                    username: e.data.username
                })
            }
        }
    })
})
