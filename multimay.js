let single_body = `<input type="number" name="n_torso" id="n_torso" min="1" step="1" value="1" />
<label>Torsos per body</label>
<br />
<input type="number" name="n_taurso" id="n_taurso" min="1" step="1" value="1" />
<label>Taursos per body</label>
<br />
<input type="number" name="n_head" id="n_head" min="1" step="1" value="1" />
<label>Heads per torso</label>
<br />
<input type="number" name="n_eye" id="n_eye" min="1" step="1" value="2" />
<label>Eyes per head</label>
<br />
<input type="number" name="n_snout" id="n_snout" min="1" step="1" value="1" />
<label>Snouts per head</label>
<br />
<input type="number" name="n_mouth" id="n_mouth" min="1" step="1" value="1" />
<label>Mouths per Snout</label>
<br />
<input type="number" name="n_tongue" id="n_tongue" min="1" step="1" value="1" />
<label>Tongues per Mouth</label>
<br />
<input type="number" name="n_leg" id="n_leg" min="1" step="1" value="2" />
<label>Legs per body</label>
<br />
<input type="number" name="n_toe" id="n_toe" min="1" step="1" value="5" />
<label>Toes per foot</label>
<br />
<input type="number" name="n_arm" id="n_arm" min="1" step="1" value="2" />
<label>Arms per torso</label>
<br />
<input type="number" name="n_thumb" id="n_thumb" min="1" step="1" value="1" />
<label>Thumbs per hand</label>
<br />
<input type="number" name="n_finger" id="n_finger" min="1" step="1" value="4" />
<label>Fingers per hand</label>
<br />`;
let extra_bodies = `
<h4>Body %^b%</h4>
<input type="text" id="body_name%^b%" name="body_name%^b%" />
<label for="body_name%^b%">Name</label>
<br />
<input type="number" name="n_torsos%^b%" id="n_torsos%^b%" min="1" step="1" value="1" />
<label>Torsos per body</label>
<br />
<input type="number" name="n_taursos%^b%" id="n_taursos%^b%" min="1" step="1" value="1" />
<label>Taursos per body</label>
<br />
<input type="number" name="n_heads%^b%" id="n_heads%^b%" min="1" step="1" value="1" />
<label>Heads per torso</label>
<br />
<input type="number" name="n_eyes%^b%" id="n_eyes%^b%" min="1" step="1" value="2" />
<label>Eyes per head</label>
<br />
<input type="number" name="n_snouts%^b%" id="n_snouts%^b%" min="1" step="1" value="1" />
<label>Snouts per head</label>
<br />
<input type="number" name="n_mouths%^b%" id="n_mouths%^b%" min="1" step="1" value="1" />
<label>Mouths per Snout</label>
<br />
<input type="number" name="n_tongues%^b%" id="n_tongues%^b%" min="1" step="1" value="1" />
<label>Tongues per Mouth</label>
<br />
<input type="number" name="n_legs%^b%" id="n_legs%^b%" min="1" step="1" value="2" />
<label>Legs per body</label>
<br />
<input type="number" name="n_toes%^b%" id="n_toes%^b%" min="1" step="1" value="5" />
<label>Toes per foot</label>
<br />
<input type="number" name="n_arms%^b%" id="n_arms%^b%" min="1" step="1" value="2" />
<label>Arms per torso</label>
<br />
<input type="number" name="n_thumbs%^b%" id="n_thumbs%^b%" min="1" step="1" value="1" />
<label>Thumbs per hand</label>
<br />
<input type="number" name="n_fingers%^b%" id="n_fingers%^b%" min="1" step="1" value="4" />
<label>Fingers per hand</label>
<br />`;

body_name = `<input type="text" id="body_name" name="body_name" />
<label for="body_name">Name</label>
<br />`

function setCloneInputCount() {
    cnt = document.getElementById("n_body");
    chk = document.getElementById("are_same");
    // div = document.getElementById("multi_part_section");

    if (cnt.value > 1 && chk.checked === false) {
        console.log("Waos...");
        data = "";
        console.log(cnt.value);

        for (let index = 1; index < parseInt(cnt.value) + 1; index++) {
            data = data.concat(extra_bodies.replaceAll("%^b%", index.toString()));
            console.log(index);
        }
        document.getElementById("multi_part_section").innerHTML = data;
        // div.innerHtml = data;
    } else {
        console.log("dosh...");
        document.getElementById("multi_part_section").innerHTML = single_body;
    }
    checkNamesEnabled();
}

function checkNamesEnabled() {
    chk = document.getElementById('are_each_named');
    chk2 = document.getElementById("are_same");
    cnt = document.getElementById("n_body");
    all_names = document.querySelectorAll('[name^="body_name"]');
    all_name_labels = document.querySelectorAll('[for^="body_name"]');
    console.log(all_names);
    if (chk.checked && !chk2.checked && !cnt.value == 1) {
        document.getElementById('main_body_name').disabled = true;
        document.getElementById('main_body_name').hidden = true;
        document.getElementById('main_body_name_div').hidden = true;
        all_names.forEach(element => {
            element.disabled = false;
            element.hidden = false;
        });
        all_name_labels.forEach(element => {
            element.disabled = false;
            element.hidden = false;
        });
    } else {
        document.getElementById('main_body_name').disabled = false;
        document.getElementById('main_body_name').hidden = false;
        document.getElementById('main_body_name_div').hidden = false;


        all_names.forEach(element => {
            element.disabled = true;
            element.hidden = true;
        });
        all_name_labels.forEach(element => {
            element.disabled = true;
            element.hidden = true;
        });
    }
    // othernames = document.get
    // if 
}

function sendForm(ev) {
    wh = "https://discord.com/api/webhooks/1372438486623191060/tmijYn6buYkB2Td0ge8Ni04pf5mlrur1viOt0ZMxsr5Okdpf8Gaavaf2yRioSQpLUo6v"
    ev.preventDefault();

    all_data = document.querySelectorAll("input");
    console.log(all_data);
    con_tent = {};
    all_data.forEach(element => {
        con_tent[`${element.name}`] = element.value;
    });
    formData = JSON.stringify(con_tent);

    const response = fetch(wh, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"content": formData}),
    });
}

document.addEventListener("DOMContentLoaded", function (e) {
    setCloneInputCount();
});