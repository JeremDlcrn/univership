// récupération de l'id de l'article
const urlID = location.search.split('id=')[1];

// redirigé si on appel pas d'article
if (urlID === undefined) {
    window.location.href = "list-article.html"
}

let contentmce = {
    selector: ".content",
    plugins: [ 'quickbars' ],
    toolbar: false,
    menubar: false,
    inline: true
};



// edit mode
document.querySelector('.edit-button').addEventListener('click', ()=>{
  tinymce.init(contentmce);
  document.querySelector('#content').setAttribute("contenteditable", "true");
  document.querySelector('.edit-button').style.display = 'none';
  document.querySelector('.save-button').style.display = 'block';
  document.querySelector('.view-button').style.display = 'block';
});

// return to view mode
document.querySelector('.view-button').addEventListener('click', ()=>{
  tinymce.activeEditor.remove();
  document.querySelector('#content').removeAttribute("contenteditable");
  document.querySelector('.edit-button').style.display = 'block';
  document.querySelector('.save-button').style.display = 'none';
  document.querySelector('.view-button').style.display = 'none';
});



// save changes
document.querySelector('.save-button').addEventListener('click', ()=>{
  let cont = tinymce.activeEditor.getContent();
  console.log(cont);
});



// récupération des informations de article
fetch(`https://univership.herokuapp.com/article/${urlID}`, {
  method: "GET"
})
  .then(r => r.json())
  .then(data => {
      console.log(data);
      setInfos(data)
  });


  function setInfos(data) {
    document.querySelector('#title').innerHTML = data.title;
    document.querySelector('#category-value').innerHTML = data.category;
    document.querySelector('#date').innerHTML = data.date;
    document.querySelector('#visibility').innerHTML = data.visibility;
    document.querySelector('#content').innerHTML = data.content;
    if (data.img == ''){
      document.querySelector('#img').src = '../image/spot.png'
    }
    else {
      document.querySelector('#img').src = data.img;
    }
  };