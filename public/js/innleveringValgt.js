window.addEventListener("load", async function () {
    let id = localStorage.getItem("id");

    let utstyr = await fetch("/get/" + id);
    utstyr = await utstyr.json();

    let date = new Date();
    
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    date = date.toISOString();

    let html = document.createElement("div");

    html.innerHTML = `
    <div class="listItem"><p>${utstyr.name}</p></div>
    <div class="listItem"><p>${utstyr.id}</p></div>
    <div class="listItem"><p>${day + "." + month + "." + year}</p></div>
    <div class="listItem"><p>${utstyr.ansvarlig}</p></div>
    <div class="listItem"><p>${utstyr.låntaker}</p></div>`;

    html.classList.add("listDiv");

    document.getElementById("allEquipment").appendChild(html);

    let placeOn = document.createElement("div");
    placeOn.innerHTML = `
    <div class="listItem"><p>${utstyr.hylle}</p></div>
    <div class="listItem"><p>${utstyr.rad}</p></div>`;

    placeOn.classList.add("listDiv");

    document.getElementById("placeOn").appendChild(placeOn);

    document.getElementById("yesBtn").addEventListener("click", async function () {
        localStorage.removeItem("id");
        await fetch("/modify/" + id + "/utleid/false");
        await fetch("/modify/" + id + "/utlånsdato/ ");
        await fetch("/modify/" + id + "/ansvarlig/ ");
        await fetch("/modify/" + id + "/låntaker/ ");

        localStorage.setItem("ferdigTilbake", "innlevering");
        localStorage.setItem("ferdigText", "Utstyret er innlevert.");
        window.location.replace("/ferdig.html");
    });

    document.getElementById("noBtn").addEventListener("click", async function () {
        localStorage.removeItem("id");
        window.location.replace("/innlevering.html");
    });
});
