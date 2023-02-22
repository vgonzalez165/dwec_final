// Comprobamos si el usuario tiene iniciada una sesión
checkLogged();

// ***********************************************************************
// Comportamiento de la página de inicio
// ***********************************************************************

const inputUser = document.getElementById('user');
const inputPass = document.getElementById('pass');

function checkError(e) {
    if (!e.target.value) {
        e.target.classList.add('error');
        e.target.placeholder = 'Campo obligatorio'
    } else {
        e.target.classList.remove('error')
        e.target.placeholder = '';
    }
}

inputUser.addEventListener( 'blur', e => checkError(e));
inputUser.addEventListener( 'focus', e => {
    e.target.classList.remove('error');
    e.target.placeholder = '';
});

inputPass.addEventListener( 'blur', e => checkError(e));
inputPass.addEventListener( 'focus', e => {
    e.target.classList.remove('error');
    e.target.placeholder = '';
});

// ***********************************************************************
// Botón de REGISTRO
// ***********************************************************************
document.getElementById('btn-reg').addEventListener( 'click', e => {
    e.preventDefault();
    fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: inputUser.value,
            pass: inputPass.value
        })
    })
    .then( response => {
        if (response.ok) {
            alert(`El usuario ${inputUser.value} se ha registrado correctamente.`);
        } else {
            alert(`Se ha producido un error al registrar el usuario`);
        }
    })
})

// ***********************************************************************
// Botón de LOGIN
// ***********************************************************************
document.getElementById('btn-login').addEventListener('click', e => {
    e.preventDefault();
    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: inputUser.value,
            pass: inputPass.value
        })
    })
    .then( response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('Error en las credenciales o al iniciar sesión');
        }
    })
    .then( data => {
        localStorage.setItem('id', data.id);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        checkLogged();
    })
})

// ***********************************************************************
// Botón de LOGOUT
// ***********************************************************************
document.getElementById('logout').addEventListener('click', e => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    checkLogged();
})

function checkLogged() {
    if (localStorage.getItem('token')) {
        document.getElementById('logged').classList.remove('hidden');
        document.getElementById('main-page').classList.remove('hidden');
        document.getElementById('modal').classList.add('hidden');
    } else {
        document.getElementById('logged').classList.add('hidden');
        document.getElementById('main-page').classList.add('hidden');
        document.getElementById('modal').classList.remove('hidden');
    }
}

