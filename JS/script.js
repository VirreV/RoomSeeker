let dropListDiv = document.querySelector("#searchAlts");
function AddDropDiv(roomNr, nameStr, floor, xp, yp) {
    let d = document.createElement("div");
    d.className = "searchAltsDiv";
    let room = document.createElement("div");
    room.innerHTML = roomNr;
    room.classList.add("room");
    room.classList.add(floor);
    room.id = roomNr;
    let name = document.createElement("div");
    name.innerHTML = nameStr;
    name.className = "name";
    d.appendChild(room);
    d.appendChild(name);
    d.addEventListener("click", () => {
        console.log(d.querySelector(".room").id);
        let mapEle = !!document.querySelector(".mapImg");
        if (mapEle) {
            document.querySelector("#mapContainer").parentElement.remove();
        }
        let cont = document.createElement("div");
        let ele = document.createElement("div");
        let img = document.createElement("img");
        ele.id = "mapContainer";
        img.src = "IMG/Planlösning" + floor + ".png";
        img.className = "mapImg";
        let dot = document.createElement("div");
        if(xp != null){
            dot.className = "dot";
            dot.style.top = yp*100 + "%";
            dot.style.left = xp*100 + "%";
        }
        let showRoomDiv = document.createElement("div");
        showRoomDiv.innerHTML = "Room: " + roomNr;
        if(nameStr != ""){
            showRoomDiv.innerHTML += "/" + nameStr;
        }
        showRoomDiv.className = "roomName";
        cont.appendChild(showRoomDiv);
        ele.appendChild(img);
        ele.appendChild(dot);
        cont.appendChild(ele);
        document.querySelector("#contentContainer").appendChild(cont);
        window.scrollTo(0,document.body.scrollHeight);
    });
    dropListDiv.appendChild(d);
    console.log(roomNr, nameStr, floor);
    let refDiv = document.querySelector("#searchAlts");
}

let SubmitFunc = function (event) {
    event.preventDefault();
    console.log("hej");
};

let roomSearch = document.querySelector("#form-search");
roomSearch.addEventListener("submit", SubmitFunc, true);

fetch('DATA/data.json').then(response => response.json()).then(data => {
    document.querySelector("#txt-search").addEventListener("keyup", () => {
        let str = (document.querySelector("#txt-search").value);
        dropListDiv.innerHTML = "";
        let count = 0;
        data.forEach(element => {
            element.forEach(ele => {
                if(str.length > 0){
                    if (ele.room.substring(0, str.length).toLowerCase() == str.toLowerCase() || ele.name.substring(0, str.length).toLowerCase() == str.toLowerCase()) {
                        AddDropDiv(ele.room, ele.name, ele.floor, ele.x, ele.y);
                        count++;
                    }
                    else if (str == ":all") {
                        AddDropDiv(ele.room, ele.name, ele.floor, ele.x, ele.y);
                        count++;
                    }
                    else if(str.substring(0, 6).toLowerCase() == "floor:"){
                        switch(str.substring(7,8).toLowerCase()){
                            case "4":
                                if(ele.floor == "4"){
                                    AddDropDiv(ele.room, ele.name, ele.floor, ele.x, ele.y);
                                    count++;
                                }
                                break;
                            case "5":
                                if(ele.floor == "5"){
                                    AddDropDiv(ele.room, ele.name, ele.floor, ele.x, ele.y);
                                    count++;
                                }
                                break;
                            case "6":
                                if(ele.floor == "6"){
                                    AddDropDiv(ele.room, ele.name, ele.floor, ele.x, ele.y);
                                    count++;
                                }
                                break;
                            case "0":
                                if(ele.floor == "0"){
                                    AddDropDiv(ele.room, ele.name, ele.floor, ele.x, ele.y);
                                    count++;
                                }
                                break;
                            case "a":
                                if(ele.floor.toLowerCase() == "a"){
                                    AddDropDiv(ele.room, ele.name, ele.floor, ele.x, ele.y);
                                    count++;
                                }
                                break;
                        }
                    }
                }
            });
        });
        if (count == 0) {
            document.querySelector("#searchAlts").classList.remove("dropActive");
        } else if (!document.querySelector("#searchAlts").classList.contains("dropActive")) {
            document.querySelector("#searchAlts").classList.add("dropActive");
        }
        console.log(document.querySelector("#searchAlts").childElementCount);
    })
});