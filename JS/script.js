let dropListDiv = document.querySelector("#searchAlts");
function AddDropDiv(roomNr, nameStr, floor) {
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
            document.querySelector(".mapImg").parentElement.remove();
        }
        let ele = document.createElement("div");
        let img = document.createElement("img");
        img.src = "IMG/Planlösning" + floor + ".png";
        img.className = "mapImg";
        ele.appendChild(img);
        document.querySelector("#contentContainer").appendChild(ele);
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
                        AddDropDiv(ele.room, ele.name, ele.floor);
                        count++;
                    }
                    else if (str == ":all") {
                        AddDropDiv(ele.room, ele.name, ele.floor);
                        count++;
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