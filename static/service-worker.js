console.log("Bye")

self.addEventListener("push", function(event) {
    console.log(event.data.json());
})