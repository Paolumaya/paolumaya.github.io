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
    { 'name': 't_name', 'type': 'text', 'value': '', 'max': '50', 'label': 'Name' },

    { 'name': 'n_torso', 'type': 'number', 'value': '1', 'max': '123456789', 'label': '# of Torsos' },
    { 'name': 'n_taurso', 'type': 'number', 'value': '0', 'max': '123456789', 'label': '# of Taursos' },
    { 'name': 'n_head', 'type': 'number', 'value': '1', 'max': '123456789', 'label': '# of Heads' },
    { 'name': 'n_eye', 'type': 'number', 'value': '2', 'max': '123456789', 'label': '# of Eyes' },
    { 'name': 'n_snout', 'type': 'number', 'value': '1', 'max': '123456789', 'label': '# of Snouts' },
    { 'name': 'n_mouth', 'type': 'number', 'value': '1', 'max': '123456789', 'label': '# of Mouths' },
    { 'name': 'n_tongue', 'type': 'number', 'value': '1', 'max': '123456789', 'label': '# of Tongues' },
    { 'name': 'n_leg', 'type': 'number', 'value': '2', 'max': '123456789', 'label': '# of Legs' },
    { 'name': 'n_arm', 'type': 'number', 'value': '2', 'max': '123456789', 'label': '# of Arms' },
    { 'name': 'n_toe', 'type': 'number', 'value': '5', 'max': '123456789', 'label': '# of Toes PER FOOT' },
    { 'name': 'n_thumb', 'type': 'number', 'value': '1', 'max': '123456789', 'label': '# of Thumbs PER HAND' },
    { 'name': 'n_finger', 'type': 'number', 'value': '4', 'max': '123456789', 'label': '# of Fingers PER HAND' },
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

        chk = document.getElementById("are_same");
        if (chk.checked) {
            var header = document.createElement("h4");
            header.innerText = "Body " + index.toString();
            header.setAttribute('id', 'body_header' + index.toString())
            tree.appendChild(header);
        }


        body_inputs.forEach(input => {
            e = document.createElement('input');
            e.setAttribute('name', input['name'] + index.toString());
            e.setAttribute('id', input['name'] + index.toString());
            e.setAttribute('type', input['type']);
            e.setAttribute('value', input['value']);
            e.setAttribute('value', '123456789');
            if (input['type'] === 'number') {
                e.setAttribute('min', '0');
                e.setAttribute('max', '123456789');
                e.setAttribute('step', '1');
            }
            l = document.createElement('label');
            l.setAttribute('for', input['name'] + index.toString());
            l.innerText = input['label'];

            tree.appendChild(e);
            tree.appendChild(l);
            // console.log(tree);
            tree.appendChild(document.createElement('br'));
        });
    }
    document.getElementById('multi_part_section').replaceChildren(tree);
}

function setCloneInputCount() {
    cnt = document.getElementById("n_body");
    chk = document.getElementById("are_same");

    if (cnt.value > 1 && chk.checked) {
        createNewBodies(parseInt(cnt.value))
    } else {
        createNewBodies(1)
    }
    checkNamesEnabled();
}

function checkNamesEnabled() {
    chk = document.getElementById('are_each_named');
    chk2 = document.getElementById("are_same");
    cnt = document.getElementById("n_body");

    document.getElementById('main_body_name').disabled = chk.checked;

    document.querySelectorAll('[name^="t_name"]').forEach(element => {
        element.disabled = !chk.checked;
        element.hidden = !chk.checked;
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
            con_tent[`${element.name}`] = element.value;
        }
    });
    formData = JSON.stringify(con_tent);


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