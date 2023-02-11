//Inputs Variables
const name_input = document.querySelector("#name");
const lastName_input = document.querySelector("#last-name");
const age_input = document.querySelector("#age");
const gender_input = document.querySelector("#gender");


//Buttons Variables
const buttonAdd = document.querySelector("#add-button");
const add_submit = document.querySelector("#add_submit");
const buttondel = document.getElementById("delete-all");


const form = document.querySelector('form');
const content_div = document.getElementById("content");
const content_table = document.getElementById("data-table")

//DOM
document.addEventListener('DOMContentLoaded', () => {
     
    //localStorage
    const data = JSON.parse( localStorage.getItem("data") );

    if (data === null) {
        const parrafo = document.createElement("p");
        const text_parrafo = document.createTextNode("No hay elementos para mostrar.")

        parrafo.appendChild(text_parrafo);

        content_div.append(parrafo);
    } else {
        render(data)
    }

    //Funtion Add
    buttonAdd.addEventListener('click', (e) => {
        e.preventDefault();
        const  data = JSON.parse( localStorage.getItem(" data") ) || [];

        const name = name_input.value;
        const lastName = lastName_input.value;
        const age = age_input.value;
        const gender = gender_input.value;
        
        // JSON
        const person = { 
            name,
            "name": name,
            "lastName": lastName,
            "age": age,
            "gender": gender
        }

        data.push(person);

        localStorage.setItem('data', JSON.stringify( data));

        content_div.innerHTML = ''; 

        // Reder Div
        render( data)
    })

    buttondel.addEventListener('click', () => {
        localStorage.setItem(" data", JSON.stringify([]));
        content_div.innerHTML = ''; 

        // Delete all Data 
        const par = document.createElement("p");
        const text_par = document.createTextNode("No hay elementos para mostrar.")

        par.appendChild(text_par);

        content_div.append(par);
    })
})

function render(data) {
    for(let i = 0; i < data.length; i++) {

            // Create div element
            const div_person = document.createElement("div");
            const person_title = document.createTextNode(`${data[i].name}-${data[i].lastName}`);

            // create button delete
            const button_delete = document.createElement("button");
            const text_button_delete = document.createTextNode("Eliminar");
            button_delete.appendChild(text_button_delete);

            // add section
            const button_update = document.createElement('button');
            const text_button_update = document.createTextNode('Actualizar');
            button_update.appendChild(text_button_update);

            button_delete.onclick = () => {
                deleteLocalStorage(i, data)
            }

            button_update.onclick = () => {
                name_input.value = celulares[i].name;
                lastName_input.value = celulares[i].lastName;
                age_input.value = celulares[i].age;
                gender_input.value = celulares[i].gender;
                buttonAdd.disabled = true;

                // agregamos el boton guardar en el formulario ...
                const button_save = document.createElement('button');
                const text_button_save = document.createTextNode('Guardar');

                button_save.appendChild(text_button_save);

                button_save.id = i;

                button_save.onclick = (e) => {
                    e.preventDefault()
                    // actualizar informacion ..
                    const person = {
                        "name":name_input.value,
                        "lastNam":lastName_input.value, 
                        "age":age_input.value,
                        "gender":gender_input.value,
                    }

                    data.splice(i, 1, person); // actualizacion ...

                    localStorage.setItem('data', JSON.stringify(data));

                    content_div.innerHTML = "";
                    render(data);

                    button_save.hidden = true;
                    add_button.disabled = false;
                }

                form.appendChild(button_save);
            }

            // Agregar textos y buton ...
            div_person.appendChild(person_title);
            div_person.appendChild(button_update);
            div_person.appendChild(button_delete);

            content_div.appendChild(div_person);

        // Tabla contenido ...
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input value="${data[i].name}" id="name-${i}" /></td>
            <td><input value="${data[i].lastNam}" id="lastname-${i}"/></td>
            <td><input value="${data[i].age}" id="age-${i}" /></td>
            <td><input value="${data[i].gender}" id="gender-${i}"/></td>
            <td>
                <button onclick="saveTable(${i})">Guardar</button>
                <button>Eliminar</button>
            </td>
        `;
        document.querySelector("tbody").appendChild(row);
    }
}

function deleteLocalStorage(i, data) {
    data.splice(i, 1);

    localStorage.setItem('data', JSON.stringify(data));

    content_div.innerHTML = '';

    render(data)
}

function saveTable(i) {
    const input_table_name = document.querySelector(`#name-${i}`);
    const input_table_lastname = document.querySelector(`#lastname-${i}`);
    const input_table_age = document.querySelector(`#age-${i}`);
    const input_table_gender = document.querySelector(`#gender-${i}`);


    const data = JSON.parse(localStorage.getItem("data")) || [];

    data.splice(i, 1, {
        "name": input_table_name.value,
        "lastname": input_table_lastname.value,
        "age": input_table_age.value,
        "gender": input_table_gender.value
    })

    localStorage.setItem("data", JSON.stringify(data));


    content_div.innerHTML = '';
    document.querySelector("tbody").innerHTML = ''
    render(data);

}