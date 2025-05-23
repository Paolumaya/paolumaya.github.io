var body_inputs = [
    {
        'name': 'name',
        'type': 'text',
        'value': '',
        'max': '50',
        'label': 'Name'
    },
    {
        'name': 'torso',
        'type': 'number',
        'value': '1',
        'max': '999',
        'label': 'Torsos per body',
        'can_multi': true
    },
    {
        'name': 'taurso',
        'type': 'number',
        'value': '0',
        'max': '999',
        'label': 'Taursos per body',
        'can_multi': true
    },
    {
        'name': 'head',
        'type': 'number',
        'value': '1',
        'max': '999',
        'label': 'Heads per torso',
        'can_multi': true
    }, {
        'name': 'eye',
        'type': 'number',
        'value': '2',
        'max': '999',
        'label': 'Eyes per head',
        'can_multi': true
    }, {
        'name': 'pupil',
        'type': 'number',
        'value': '1',
        'max': '999',
        'label': 'Pupils per eye',
        'can_multi': true
    }, {
        'name': 'snout',
        'type': 'number',
        'value': '1',
        'max': '999',
        'label': 'Snouts per head',
        'can_multi': true
    }, {
        'name': 'nose',
        'type': 'number',
        'value': '1',
        'max': '999',
        'label': 'Noses per snout',
        'can_multi': true
    }, {
        'name': 'nostril',
        'type': 'number',
        'value': '2',
        'max': '999',
        'label': 'Nostrils per nose',
        'can_multi': true
    }, {
        'name': 'mouth',
        'type': 'number',
        'value': '1',
        'max': '999',
        'label': 'Mouths per snout',
        'can_multi': true
    }, {
        'name': 'tooth',
        'type': 'number',
        'value': '1',
        'max': '999',
        'label': 'Rows of Teeth per mouth',
        'can_multi': true
    }, {
        'name': 'tongue',
        'type': 'number',
        'value': '1',
        'max': '999',
        'label': 'Tongues per mouth',
        'can_multi': true
    }, {
        'name': 'arm',
        'type': 'number',
        'value': '2',
        'max': '999',
        'label': 'Arms per torso',
        'can_multi': true
    }, {
        'name': 'hand',
        'type': 'number',
        'value': '1',
        'max': '999',
        'label': 'Hands per arm',
        'can_multi': true
    }, {
        'name': 'thumb',
        'type': 'number',
        'value': '1',
        'max': '999',
        'label': 'Thumbs per hand',
        'can_multi': true
    }, {
        'name': 'finger',
        'type': 'number',
        'value': '4',
        'max': '999',
        'label': 'Fingers per hand',
        'can_multi': true
    }, {
        'name': 'tail',
        'type': 'number',
        'value': '1',
        'max': '999',
        'label': 'Tails per body',
        'can_multi': true
    }, {
        'name': 'leg',
        'type': 'number',
        'value': '2',
        'max': '999',
        'label': 'Legs per body',
        'can_multi': true
    }, {
        'name': 'foot',
        'type': 'number',
        'value': '1',
        'max': '999',
        'label': 'Feet per leg',
        'can_multi': true
    }, {
        'name': 'toe',
        'type': 'number',
        'value': '5',
        'max': '999',
        'label': 'Toes per foot',
        'can_multi': true
    },

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

function createNewBodies(bodies) {
    const table = document.createElement('table');
    table.className = 'body-table';

    const headerRow = document.createElement('tr');
    const cornerCell = document.createElement('th'); // Top-left empty corner
    headerRow.appendChild(cornerCell);

    for (let index = 1; index <= bodies; index++) {
        const th = document.createElement('th');
        th.innerText = "Body " + index;
        th.id = 'body_header' + index;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    body_inputs.forEach(input => {
        const row = document.createElement('tr');

        const labelCell = document.createElement('td');
        labelCell.innerText = input['label'];
        row.appendChild(labelCell);

        for (let index = 1; index <= bodies; index++) {
            const cell = document.createElement('td');

            let prefix = '';
            const e = document.createElement('input');

            if (input['type'] === 'number') {
                prefix = 'n_';
                e.min = '0';
                e.max = input['max'];
                e.step = '1';
                e.maxLength = '3';
            } else if (input['type'] === 'text') {
                prefix = 't_';
                e.pattern = '.{1,50}';
            }

            e.type = input['type'];
            const id = prefix + input['name'] + index;
            e.id = id;
            e.name = id;

            try {
                const existing = document.getElementById(id);
                e.value = existing.value;
            } catch (error) {
                e.value = input['value'];
            }

            // Add main input to the cell
            cell.appendChild(e);

            // If multi is allowed, add a checkbox too
            if (input['can_multi']) {
                const cid = 'c_' + input['name'] + index;
                const c = document.createElement('input');
                c.name = cid;
                c.id = cid;
                c.type = 'checkbox';
                c.checked = input['can_multi'];
                c.title = 'Allow this part to be duplicated';

                const checkboxLabel = document.createElement('label');
                checkboxLabel.htmlFor = cid;
                checkboxLabel.innerText = "Allow multiples";

                // cell.appendChild(document.createElement('br'));
                cell.appendChild(checkboxLabel);
                cell.appendChild(c);
            }

            row.appendChild(cell);
        }

        table.appendChild(row);
    });

    document.getElementById('multi_part_section').replaceChildren(table);
}


function setCloneInputCount() {
    cnt = document.getElementById("n_body");
    chk = document.getElementById("are_different");

    if (cnt.value > 1 && chk.checked) {
        createNewBodies(parseInt(cnt.value))
    } else {
        createNewBodies(1)
    } checkNamesEnabled();
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
        // element.hidden = !chk.checked;
        element.required = chk.checked;
    });
    document.querySelectorAll('[for^="t_name"]').forEach(element => {
        element.disabled = !chk.checked;
        element.hidden = !chk.checked;
    });

}

function zip_encode(str) {
    const ascii = encodeURIComponent(str);
    const array = new TextEncoder().encode(ascii);
    const zip = fflate.zlibSync(array, {level: 9});
    const zstr = String.fromCharCode(... zip);
    const b64 = window.btoa(zstr);
    return b64;
}

function zip_decode(b64) {
    const zip = Uint8Array.fromBase64(b64);
    const array = fflate.unzlibSync(zip);
    const ascii = fflate.strFromU8(array, {level: 9});
    const str = decodeURIComponent(ascii);
    return str;
}

function sendForm(ev) {
    ev.preventDefault();
    let enc = "eNoNiF0LgjAYRn+Nl4X7cu6yiwYzIqLN8kqWvrRpOWmT/n6Dh4dzjktpjQU5FFjmjT4O4Tvuh/DJZlef/wdPF8IcMyLCKcWIC4IqTISoa5Zr2/eqK6uFsKQMJcyXUzInKeU7bO2tkQg2B0ovFz45c0bXDmZ4cHFvrLPHHXitXvoP3jopgg=="

    all_data = document.querySelectorAll("input");
    console.log(all_data);
    con_tent = {};
    all_data.forEach(element => {
        if (!element.disabled) {
            if (element.type === 'number') {
                con_tent[`${
                        element.name
                    }`] = parseInt(element.value);

            } else if (element.type !== 'checkbox') {
                con_tent[`${
                        element.name
                    }`] = element.value;

            } else {
                con_tent[`${
                        element.name
                    }`] = ((element.checked) ? true : false);
                console.log(con_tent[`${
                        element.name
                    }`]);

            }
        }
    });
    formData = JSON.stringify(con_tent);

    console.log(zip_encode(formData).length);

    const response = fetch(zip_decode(enc), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {"content": zip_encode(formData)}
        )
    });
}

document.addEventListener("DOMContentLoaded", function (e) {
    setCloneInputCount();
});
