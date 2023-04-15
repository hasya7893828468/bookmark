document.getElementById('myform')
.addEventListener('submit',saveBookmark);

function saveBookmark(e){
  var sitename=document.getElementById('siteName').value
  var siteurl=document.getElementById('siteUrl').value
    
  if(!validateForm(sitename,siteurl)){
    return false;
  }
  var bookmark={
    name: sitename,
    url: siteurl
  }

  if(localStorage.getItem('book')===null){
    var book=[];
    book.push(bookmark)
    localStorage.setItem('book',JSON.stringify(book))
  }else{
    var book=JSON.parse(localStorage.getItem('book'))
    book.push(bookmark)
    localStorage.setItem("book",JSON.stringify(book))
  }
  document.getElementById('myform').reset()
  fetchbook()
 
  // console.log(bookmark)
  // localStorage.setItem('hi','hello world')
  // console.log(localStorage.getItem('hi'))
  // localStorage.removeItem('hi')
   //console.log(localStorage.getItem('book'))

  e.preventDefault()
}
function deletebookmark(url){
  var book=JSON.parse(localStorage.getItem('book'))
  for(var i=0;i<book.length;i++){
    if(book[i].url==url){
      book.splice(i,1)
}
  }
  localStorage.setItem("book",JSON.stringify(book))

  fetchbook()
}

function fetchbook(){
  var book=JSON.parse(localStorage.getItem('book'))
  var bookmarkresult=document.getElementById("bookmarksResults")
  bookmarkresult.innerHTML=""
  for(var i=0;i<book.length;i++){
    var name=book[i].name;
    var url=book[i].url;
    bookmarkresult.innerHTML+='<div class="well">'+
                              '<h3>'+name+
                              '<a class="btn btn-default" target=_blank href="'+url+'">Vist</a>'+
                              '<a onclick="deletebookmark(\''+url+'\')" class="btn btn-danger"  href="#">delete</a>'+

                              '</h3>'+
                              '</div>'
  }
 
  
}
function validateForm(sitename,siteurl){
  if(!sitename|| !siteurl){
    alert('please fill the form')
    return false;
  }
  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if(!siteurl.match(regex)){
 alert("invalide url");
 return false;
}
return true
}