let ipName = document.querySelector('#nameip'),
    ipPhone = document.querySelector('#cellip'),
    ipEmail = document.querySelector('#emailip'),
    ipSubmit = document.querySelector('[type="submit"]');

    

    function keepls1(){
    
        let loginCred = JSON.parse(localStorage.getItem("usuarios"))  || [],
            username = document.getElementById('email').value,
            password = document.getElementById('password').value;
        
           
            loginCred.push({
              usuario: username,
              contrasena: password
            })
        
            alert(username+"-"+ password);
            localStorage.setItem("usuarios", JSON.stringify(loginCred));
            if (username=='' || password==''){
                alert('Debe completar los campos con sus credenciales');
            }else{
                if (username!='' && password!='')
                setTimeout(function() {window.location = 'contacts.html' }); 
            }
        
        }

        function keepls(){
    
            let loginCred = JSON.parse(localStorage.getItem("usuarios"))  || [],
                username = document.getElementById('email').value,
                password = document.getElementById('correo').value;
            
               
                loginCred.push({
                  usuario: username,
                  contrasena: password
                })
            
                alert(username+"-"+ password);
                localStorage.setItem("usuarios", JSON.stringify(loginCred));
                if (username=='' || password==''){
                    alert('Debe completar los campos con sus credenciales');
                }else{
                    if (username!='' && password!='')
                    alert('Correo enviado');
                    setTimeout(function() {window.location = 'contacts.html' }); 
                }
            
            }



ipSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    let newContact = {
        id: Date.now(),
        name: ipName.value,
        phone: ipPhone.value,
        email: ipEmail.value
    };
    let newRow = createRow(newContact);
    let table = document.querySelector('.table');
    table.children[1].appendChild(newRow);

    ipName.value = '';
    ipPhone.value = '';
    ipEmail.value = '';

    saveContacts();
});

function createRow(contact) {
    let newRow = document.createElement('tr');
    newRow.innerHTML = `
            <td>${contact.id}</td>
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td><button class="delete" onclick="removeItem(this)">Eliminar</button></td>
        `;
    return newRow;
}

function removeItem(id) {

    let contacts = JSON.parse(localStorage.getItem('contacts'));
    let table = document.querySelector('.table');
    let tr = table.querySelectorAll('tr');
    let idToRemove = id.parentElement.parentElement.children[0].innerText;
    let index = contacts.findIndex(elem => elem.id == idToRemove);
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    id.parentElement.parentElement.remove();

}

function saveContacts() {
    let table = document.querySelector('.table');
    let tr = table.children[1].querySelectorAll('tr');
    let contacts = [];

    tr.forEach(elem => {
        let obj = {
            id: elem.children[0].innerText,
            name: elem.children[1].innerText,
            phone: elem.children[2].innerText,
            email: elem.children[3].innerText
        }

        contacts.push(obj);
    })
    
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function loadContacts() {

    let contacts = JSON.parse(localStorage.getItem('contacts'));
    let table = document.querySelector('.table');
    let tr = table.querySelectorAll('tr');


    let contact = {
        id: '',
        name: '',
        phone: '',
        email: ''
    }

    contacts.forEach(elem => {
        contact.id = elem.id;
        contact.name = elem.name;
        contact.phone = elem.phone;
        contact.email = elem.email;

        let newRow = createRow(contact);
        table.children[1].appendChild(newRow);
    })

}

window.document.addEventListener('DOMContentLoaded', loadContacts());