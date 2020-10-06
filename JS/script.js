document.querySelector("#txt-search").addEventListener("keyup", () => {
    let str = (document.querySelector("#txt-search").value)
    switch (str.substring(0, 1)) {
        case 4:
            Floor4(str);
            break;
        case 5:
            Floor5(str);
            break;
        case 6:
            Floor6(str);
            break;
        case A:
            Annexet(srt);
            break;
        default:
            break;
    }
})

function Floor4(str) {
    //leta efter sal som matchar str.
}