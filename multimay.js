let single_body = ``;
let extra_bodies = ``;


function setCloneInputCount() {
    cnt = document.getElementById("num_body");
    chk = document.getElementById("are_same");
    div = document.getElementById("multi_part_section");

    if (cnt.value > 1 && chk.checked === false) {
        console.log("Waos...");
        div.innerHtml = extra_bodies * cnt.value;
    } else {
        console.log("dosh...");
        div.innerHtml = single_body;
    }
}

function toggleNames() {

}