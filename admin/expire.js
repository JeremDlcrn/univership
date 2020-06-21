fetch(`https://univership.herokuapp.com/expired`, {
     method: 'GET',
     headers: { 
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
})
.then(r => r.json())
.then((data)=>{
    if (data.status == 'token expired') { window.location.href = '../connexion.html?message=expired';  localStorage.removeItem('token'); localStorage.removeItem('name') };
    if (data.status == 'token not found') window.location.href = '../connexion.html?message=connect'
    else if (data.status !== 'valid' && data.status == 'token not found' && data.status == 'token expired') window.location.href = '../connexion.html';
})







