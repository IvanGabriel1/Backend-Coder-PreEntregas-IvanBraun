const socket = io();

console.log("socket.js cargado");

const buttons = document.querySelectorAll(".change-availability");

console.log("Botones encontrados:", buttons.length);

buttons.forEach(button => {

    button.addEventListener("click", () => {

        console.log("Click en cambiar disponibilidad");

        const service = {
            _id: button.dataset.id,
            name: button.dataset.name,
            description: button.dataset.description,
            duration: Number(button.dataset.duration),
            price: Number(button.dataset.price),
            category: button.dataset.category,
            available: button.dataset.available === "true"
        };

        service.available = !service.available;

        console.log("Servicio enviado:", service);

        socket.emit("change-availability", service);
    });

});


socket.on("service-updated", (service) => {

    console.log("Servicio actualizado recibido:", service);

    const article = document.getElementById(`service-${service._id}`);

    if (!article) return;

    const availability = article.querySelector(".availability");

    availability.textContent = service.available;

    const button = article.querySelector(".change-availability");

    button.dataset.available = service.available;
});