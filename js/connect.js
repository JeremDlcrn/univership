// récupération de l'id de l'article
const mes = location.search.split('message=')[1];
if (mes === 'expired') showError("Votre session à expiré, veuillez vous reconnectez");
if (mes === 'connect') showError("Veuillez vous connecter pour accéder à l'administration");


document.querySelector('#send').addEventListener('click', ()=>{
    const mail = document.querySelector('#mail').value;
    const pass = document.querySelector('#password').value;

    document.querySelector('#mail').value = "";
    document.querySelector('#password').value = "";

    fetch(`https://univership.herokuapp.com/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            mail: mail,
            password: pass
        })
    })
    .then(r => r.json())
    .then(res => {
        if (res.error !== undefined) {
            if (res.error === 'wrong mail') showError("Mauvaise adresse mail");
            if (res.error === 'wrong password') showError("Mauvais mot de passe");
        } else {
            localStorage.setItem('token', res.token);
            localStorage.setItem('name', res.name);
            window.location.href = "/admin/list-article.html"
        }
    })
});

function showError(text) {
    document.querySelector('#error').textContent = '';
    document.querySelector('.error').style.display = 'block';
    document.querySelector('#error').textContent = text;
}