// TODO
// ADD STATE MEMORY
// ADD TAILS


const body_state = [
    { 'name': 't_name', 'value': '', },
    { 'name': 'n_torso', 'value': '', },
    { 'name': 'n_taurso', 'value': '', },
    { 'name': 'n_head', 'value': '', },
    { 'name': 'n_eye', 'value': '', },
    { 'name': 'n_snout', 'value': '', },
    { 'name': 'n_mouth', 'value': '', },
    { 'name': 'n_tongue', 'value': '', },
    { 'name': 'n_leg', 'value': '', },
    { 'name': 'n_arm', 'value': '', },
    { 'name': 'n_toe', 'value': '', },
    { 'name': 'n_thumb', 'value': '', },
    { 'name': 'n_finger', 'value': '', },
];

var body_inputs = [
    { 'name': 'name', 'type': 'text', 'value': '', 'max': '50', 'label': 'Name' },

    { 'name': 'torso', 'type': 'number', 'value': '1', 'max': '999', 'label': 'Torsos per body', 'can_multi': true, },
    { 'name': 'taurso', 'type': 'number', 'value': '0', 'max': '999', 'label': 'Taursos per body', 'can_multi': true, },

    { 'name': 'head', 'type': 'number', 'value': '1', 'max': '999', 'label': 'Heads per torso', 'can_multi': true, },
    { 'name': 'eye', 'type': 'number', 'value': '2', 'max': '999', 'label': 'Eyes per head', 'can_multi': true, },
    { 'name': 'pupil', 'type': 'number', 'value': '1', 'max': '999', 'label': 'Pupils per eye', 'can_multi': true, },
    { 'name': 'snout', 'type': 'number', 'value': '1', 'max': '999', 'label': 'Snouts per head', 'can_multi': true, },
    { 'name': 'nose', 'type': 'number', 'value': '1', 'max': '999', 'label': 'Noses per snout', 'can_multi': true, },
    { 'name': 'nostril', 'type': 'number', 'value': '2', 'max': '999', 'label': 'Nostrils per nose', 'can_multi': true, },
    { 'name': 'mouth', 'type': 'number', 'value': '1', 'max': '999', 'label': 'Mouths per snout', 'can_multi': true, },
    { 'name': 'tooth', 'type': 'number', 'value': '1', 'max': '999', 'label': 'Rows of Teeth per mouth', 'can_multi': true, },
    { 'name': 'tongue', 'type': 'number', 'value': '1', 'max': '999', 'label': 'Tongues per mouth', 'can_multi': true, },

    { 'name': 'arm', 'type': 'number', 'value': '2', 'max': '999', 'label': 'Arms per torso', 'can_multi': true, },
    { 'name': 'hand', 'type': 'number', 'value': '1', 'max': '999', 'label': 'Hands per arm', 'can_multi': true, },
    { 'name': 'thumb', 'type': 'number', 'value': '1', 'max': '999', 'label': 'Thumbs per hand', 'can_multi': true, },
    { 'name': 'finger', 'type': 'number', 'value': '4', 'max': '999', 'label': 'Fingers per hand', 'can_multi': true, },

    { 'name': 'tail', 'type': 'number', 'value': '1', 'max': '999', 'label': 'Tails per body', 'can_multi': true, },
    { 'name': 'leg', 'type': 'number', 'value': '2', 'max': '999', 'label': 'Legs per body', 'can_multi': true, },
    { 'name': 'foot', 'type': 'number', 'value': '1', 'max': '999', 'label': 'Feet per leg', 'can_multi': true, },
    { 'name': 'toe', 'type': 'number', 'value': '5', 'max': '999', 'label': 'Toes per foot', 'can_multi': true, },

]

function loadData() {
    try {
        return localStorage.getItem('multi_body')
    } catch (error) {
        return null
    }
};

function saveData(data) {
    x = JSON.stringify(data)
    localStorage.setItem('multi_body', x)
}

function createNewBodies(bodies) { // var must be an int or shit will go bad
    var tree = document.createDocumentFragment();
    for (let index = 1; index < bodies + 1; index++) {

        chk = document.getElementById("are_different");
        if (chk.checked) {
            var header = document.createElement("h4");
            header.innerText = "Body " + index.toString();
            header.setAttribute('id', 'body_header' + index.toString())
            tree.appendChild(header);
        }

        body_inputs.forEach(input => {
            e = document.createElement('input');
            e.setAttribute('type', input['type']);
            e.setAttribute('value', input['value']);
            if (input['type'] === 'number') {
                prefix = 'n_';
                e.setAttribute('min', '0');
                e.setAttribute('max', input['max']);
                e.setAttribute('step', '1');

            } else if (input['type'] === 'text') {
                prefix = 't_'
                l = document.createElement('label');
                l.setAttribute('for', 't_' + input['name'] + index.toString());
                l.innerText = input['label'];
            };

            e.setAttribute('id', prefix + input['name'] + index.toString());
            e.setAttribute('name', prefix + input['name'] + index.toString());

            l = document.createElement('label');
            l.innerText = input['label'];
            l.setAttribute('for', prefix + input['name'] + index.toString());


            if (input['can_multi']) {
                c = document.createElement('input');
                c.setAttribute('name', 'c_' + input['name'] + index.toString());
                c.setAttribute('id', 'c_' + input['name'] + index.toString());
                c.setAttribute('type', 'checkbox');
                c.setAttribute('checked', input['can_multi']);
                c.setAttribute('title', 'Enable/Disable');
                l2 = document.createElement('label');
                l2.setAttribute('for', 'c_' + input['name'] + index.toString())
                l2.innerText = "Enable/Disable multi for this part:"
                tree.appendChild(l2)
                tree.appendChild(c);
            }
            tree.appendChild(e);
            tree.appendChild(l);
            tree.appendChild(document.createElement('br'));
        });
    }
    document.getElementById('multi_part_section').replaceChildren(tree);
}

function setCloneInputCount() {
    cnt = document.getElementById("n_body");
    chk = document.getElementById("are_different");

    if (cnt.value > 1 && chk.checked) {
        createNewBodies(parseInt(cnt.value))
    } else {
        createNewBodies(1)
    }
    checkNamesEnabled();
}

function checkNamesEnabled() {
    chk = document.getElementById('are_each_named');
    chk2 = document.getElementById("are_different");
    cnt = document.getElementById("n_body");

    document.getElementById('main_body_name').disabled = chk.checked;
    document.getElementById('main_body_name').required = !chk.checked;
    document.querySelector('[for="main_body_name"]').disabled = chk.checked;
    document.querySelector('[for="main_body_name"]').disabled = !chk.checked

    document.querySelectorAll('[name^="t_name"]').forEach(element => {
        element.disabled = !chk.checked;
        element.hidden = !chk.checked;
        element.required = chk.checked;
    });
    document.querySelectorAll('[for^="t_name"]').forEach(element => {
        element.disabled = !chk.checked;
        element.hidden = !chk.checked;
    });

}

function zip_encode(str) {
    const ascii = encodeURIComponent(str)
    const array = new TextEncoder().encode(ascii)
    const zip = fflate.zlibSync(array, { level: 9 })
    return window.btoa(String.fromCharCode(...zip))
}

function sendForm(ev) {
    wh = "https://discord.com/api/webhooks/1372438486623191060/tmijYn6buYkB2Td0ge8Ni04pf5mlrur1viOt0ZMxsr5Okdpf8Gaavaf2yRioSQpLUo6v"
    ev.preventDefault();

    all_data = document.querySelectorAll("input");
    console.log(all_data);
    con_tent = {};
    all_data.forEach(element => {
        if (!element.disabled) {
            if (element.type === 'number') {
                con_tent[`${element.name}`] = parseInt(element.value);

            } else if (element.type !== 'checkbox') {
                con_tent[`${element.name}`] = element.value;

            } else {
                con_tent[`${element.name}`] = ((element.checked) ? true : false);
                console.log(con_tent[`${element.name}`] );
                
            }
        }
    });
    formData = JSON.stringify(con_tent);

    console.log(zip_encode(formData).length);

    const response = fetch(wh, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "content": zip_encode(formData) }),
    });
}

document.addEventListener("DOMContentLoaded", function (e) {
    setCloneInputCount();
});