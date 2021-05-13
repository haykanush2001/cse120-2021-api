var requiredFields = [ "fullname", "favsinger", "whyhersongs", "singingstyle", "favsong", "singingway", "singaduet", "training", "audience", "oneword", "aspect"
]
var myhobby = {
  "owner": "Haykanush Papoyan",
  "project": "Singing",
  "fullname" : "",
  "favsinger" : "",
  "whyhersongs" : "",
  "singingstyle" : "",
  "favsong" : "",
  "singingway" : "",
  "singaduet" : "",
  "training" : "",
  "oneword" : "",
  "aspect" : "",
  "othersingingway" : "",
  "audience" : "",
}
function handleFullnameChange() {
  myhobby.fullname=document.getElementById ("fullname").value;
}
function handleTitleChange() {
  myhobby.title=document.getElementById ("title").value;
}
function handleFavsingerChange() {
  myhobby.favsinger=document.getElementById ("favsinger").value;
}

function handleWhyhersongsChange() {
  myhobby.whyhersongs=document.getElementById ("whyhersongs").value;
}
function handleCheckboxChange(e) {
  var value = e.target.value;
  if (e.target.checked == true) {
    myhobby.singingstyle = myhobby.singingstyle + "," + value;
  }
}
function handleFavsongChange() {
  myhobby.favsong=document.getElementById ("favsong").value;
}

function handleSingingwaychange(e) {
  myhobby.singingway=e.target.value;
  if (myhobby.singingway!="other") {
    myhobby.othersingingway = "";
    document.getElementById("othersingingway"). style.display= "none";
  }
  else{
    document.getElementById("othersingingway"). style.display="block";
  }
}
function handleSingingvalue() {
  if (myhobby.singingway =="other") {
    myhobby.othersingingway = document.getElementById("othersingingway"). value;
    document.getElementById("othersingingway"). style.display="block";
  }  
}
function handleSingaduetChange() {
  myhobby.singaduet=document.getElementById ("singaduet").value;
} 
function handletrainingChange() {
  myhobby.training=document.getElementById ("training").value;
} 
function handleAudienceChange() {
  myhobby.audience=document.getElementById ("audience").value;
}
function handleOnewordChange() {
  myhobby.oneword=document.getElementById ("oneword").value;
} 
function handleAspectChange() {
  myhobby.aspect=document.getElementById ("aspect").value;
}
function validateFormData() {
  var isFormValid = true;
  var keys = Object.keys(myhobby);
  keys.forEach(key => {
      if (requiredFields.indexOf(key) > -1 && myhobby[key] == "") { console.log(key, " is a required field, please add a value") 
      if(document.getElementById(key)) {
        document.getElementById(key).style.backgroundColor = "red"; 
        isFormValid = false;
      }
    }   
  })
  return isFormValid;
}
function showTheHobbyData(e){
  e.preventDefault();
  if(validateFormData() == false) {
    return;
  } else {
    console.log(myhobby);
    $.ajax({
      type: 'POST',
      url: "https://cse120-2021-api-haykanush.herokuapp.com/data",
      data: myhobby,
      cache: false,
      dataType : 'json',
      success: function (data) {
        console.log("success");
      },
      error: function (xhr) {
        console.error("Error in post", xhr);
      },
      complete: function () {
        console.log("Complete");  
      }
    });
  }
}

function updateHobby(){
  var tmp = {
   "id" : document.getElementById("_id").innerHTML,
   "fullname" : document.getElementById("fullname").value,
   "favsinger" : document.getElementById("favsinger").value,
   "whyhersongs" : document.getElementById("whyhersongs").value,
   "singingstyle" : document.getElementById("singingstyle").value,
   "favsong" : document.getElementById("favsong").value,
   "singingway" : document.getElementById("singingway").value,
   "singaduet" : document.getElementById("singaduet").value,
   "training" : document.getElementById("training").value,
   "audience" : document.getElementById("audience").value,
   "oneword" : document.getElementById("oneword").value,
   "aspect" : document.getElementById("aspect").value,
   
   
   }
   
   $.ajax({
        type: 'POST',
        url: "https://cse120-2021-api-haykanush.herokuapp.com/data/update",
        data: tmp,
        cache: false,
        dataType : 'json',
        success: function (data) {
            console.log("success");
        },
        error: function (xhr) {
            console.error("Error in post", xhr);
        },
        complete: function () {
            console.log("Complete");  
        }
    });
}

function displayData(existingData) {
  document.getElementById("existingData").innerHTML = "<ul>";
  for (var i = 0; i < existingData.length; i++) {
    currentBook = existingData[i];
    document.getElementById("existingData").innerHTML += "<li><i>" + currentBook.fullname + "</li> : <b>" + currentBook.title + "</b></li>";
  }
  document.getElementById("existingData").innerHTML += "</ul>"
}
function displayData(data) {
  document.getElementById("dataContainer").innerHTML = "";
  data.forEach(elem => {
      var item = document.createElement("div");
      item.id = "div" + elem["_id"];
      item.className = "item";
      if (Object.keys(elem).length == 1) {
        var span = document.createElement("span");
        span.innerHTML = "<i>Empty Element with autogenerated ID: </i>" + elem["_id"];
        item.appendChild(span);
      }
      Object.keys(elem).forEach(key => {
          if (key != "_id") {
            var span = document.createElement("span");

              var b = document.createElement("b");
              b.innerHTML = key + ": ";
              span.appendChild(b);
            
              span.className = "item";
              if (elem[key]) {
              span.innerHTML += elem[key];
              } else {
                  var span1 = document.createElement("span");
                  span1.className = "undefined";
                  span1.innerHTML = "---";
                  span.appendChild(span1)
              }
              item.appendChild(span);
          
              var br = document.createElement("br");
              item.appendChild(br);
          }
      })
      var button = document.createElement("button");
      button.innerHTML = "Delete";
      button.id = elem["_id"];
      button.addEventListener("click", function(e){
        deleteData(e.target.id);
      }, false);
      item.appendChild(button);
      document.getElementById("dataContainer").appendChild(item);
    })
}


var loadedData = [];

function loadEditItem() {
  localStorage = window.localStorage;
  editItem = JSON.parse(localStorage.getItem("editItem"));
  console.log(editItem);
  document.getElementById("_id").innerHTML = editItem["_id"];
  document.getElementById("title").value = editItem["title"];
  document.getElementById("fullname").value = editItem["fullname"];   
  document.getElementById("author").value = editItem["author"];   
  document.getElementById("covertype").value = editItem["covertype"];
  document.getElementById("numberofpages").value = editItem["numberofpages"];
  document.getElementById("price").value = editItem["price"];
  document.getElementById("currency").value = editItem["currency"];
  document.getElementById("language").value = editItem["language"];
  document.getElementById("olanguage").value = editItem["olanguage"];
  document.getElementById("edition").value = editItem["edition"];
  document.getElementById("dimensions").value = editItem["dimensions"];
  document.getElementById("publisher").value = editItem["publisher"];
  document.getElementById("pdate").value = editItem["pdate"];
  document.getElementById("origpdate").value = editItem["origpdate"];
  document.getElementById("agerestriction").value = editItem["agerestriction"];
  document.getElementById("genre").value = editItem["genre"];
}  
function loadHobbyEditItem() {
  localStorage = window.localStorage;
  editItem = JSON.parse(localStorage.getItem("editItem"));
  console.log(editItem);
  document.getElementById("_id").innerHTML = editItem["_id"];
  document.getElementById("fullname").value = editItem["fullname"];
  document.getElementById("favsinger").value = editItem["favsinger"];   
  document.getElementById("whyhersongs").value = editItem["whyhersongs"];   
  document.getElementById("singingstyle").value = editItem["singingstyle"];
  document.getElementById("favsong").value = editItem["favsong"];
  document.getElementById("singingway").value = editItem["singingway"];
  document.getElementById("singaduet").value = editItem["singaduet"];
  document.getElementById("training").value = editItem["training"];
  document.getElementById("audience").value = editItem["audience"];
  document.getElementById("oneword").value = editItem["oneword"];
  document.getElementById("aspect").value = editItem["aspect"];
  
} 
function editData(id) {
  var tmp = id.split("edit_");
  var item_id = tmp[1];

  loadedData.forEach(item => {
    if (item._id == item_id) {
      console.log(item); 
      localStorage = window.localStorage;
      localStorage.setItem('editItem', JSON.stringify(item));
      if (item.project == "Singing") {
              document.location  = "hobby.html";
            } else {
              document.location  = "book.html"; 
            }
        }
    })
}
function deleteData(id) {

  var r = confirm("Are you sure you want to delete the item with the following ID? " + id);
  if (r == false) {
    return;
  }

  var tmp = {
    "id": id
  } 
  $.ajax({
    type: 'POST',
    url: "https://cse120-2021-api-haykanush.herokuapp.com/data/delete",
    data: tmp,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("success");
      document.getElementById("div" + id).style.display = "none";
    },
    error: function (xhr) {
      console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");  
    }
  });
}  
function saveData() {
    var tmp = {
        "test": "Data"
    }

    $.ajax({
      type: 'POST',
      url: "https://cse120-2021-api-haykanush.herokuapp.com/data",
      data: tmp,
      cache: false,
      dataType : 'json',
      success: function (data) {
        console.log("success");
      },
      error: function (xhr) {
        console.error("Error in post", xhr);
      },
      complete: function () {
        console.log("Complete");  
      }
    });
}
function saveBookData() {
  var myfavbook = {
    "test": "Data"
  }

    $.ajax({
        type: 'POST',
        url: "https://cse120-2021-api-haykanush.herokuapp.com/data",
        data: myfavbook,
        cache: false,
        dataType : 'json',
        success: function (data) {
          console.log("success");
        },
        error: function (xhr) {
            console.error("Error in post", xhr);
        },
        complete: function () {
            console.log("Complete");  
        }
    });

}
function loadExistingData() {
  myBookData = [];
  mySingingData = [];
  $.ajax({
    type : "GET",
    url : "https://cse120-2021-api-haykanush.herokuapp.com/data",
    dataType : "json",
    success : function(data) {
      loadedData = data.data;
    console.log("success", data);
    data.data.forEach(elem => {
        if (elem["project"] == "Book") {
           myBookData.push(elem);
        } else {
          mySingingData.push(elem);
        }
      })
      displayData(myBookData, "bookDataContainer");
      displayData(mySingingData, "singingDataContainer");
    },
    error : function(data) {
      console.log("Error")
    }
  });
}
function displayData(data, containerDivName) {
  document.getElementById(containerDivName).innerHTML = "";
  data.forEach(elem => {
    var item = document.createElement("div");
    item.id = "div" + elem["_id"];
    item.className = "item";
    if (Object.keys(elem).length == 1) {
      var span = document.createElement("span");
      span.innerHTML = "<i>Empty Element with autogenerated ID: </i>" + elem["_id"];
      item.appendChild(span);
    }
    Object.keys(elem).forEach(key => {
      if (key != "_id") {
        var span = document.createElement("span");

        var b = document.createElement("b");
        b.innerHTML = key + ": ";
        span.appendChild(b);
        
        span.className = "item";
        if (elem[key]) {
          span.innerHTML += elem[key];
        } else {
          var span1 = document.createElement("span");
          span1.className = "undefined";
          span1.innerHTML = "---";
          span.appendChild(span1)
        }
        item.appendChild(span);

          var br = document.createElement("br");
          item.appendChild(br);
        }
    })
    var edit_button = document.createElement("button");
    edit_button.innerHTML = "Edit";
    edit_button.id = "edit_" + elem["_id"];
    edit_button.className = "edit";
    edit_button.addEventListener("click", function(e){
      editData(e.target.id);
    }, false);
    item.appendChild(edit_button);

    var button = document.createElement("button");
    button.innerHTML = "Delete";
    button.id = elem["_id"];
    button.addEventListener("click", function(e){
      deleteData(e.target.id);
    }, false);
    item.appendChild(button);
    document.getElementById(containerDivName).appendChild(item);
  })
}















var myfavbook = {
  "owner": "Haykanush Papoyan",
  "project": "Book",
  "fullname": "",
  "author": "",
  "covertype": "",
  "othercovervalue": "",
  "othercovertype": "",
  "numberofpages": "",
  "price": "",
  "currency": "",
  "language": "",
  "otherlanguage": "",
  "olanguage": "",
  "otherolanguage": "",
  "edition": "",
  "dimensions": "",
  "publisher": "",
  "pdate": "",
  "origpdate": "",
  "genre": "",
  "agerestriction": "",
}

function handleFullnameChange() {
  myfavbook.fullname= document.getElementById("fullname"). value;
}
function handleAuthorChange() {
  myfavbook.author= document.getElementById("author"). value;
}
function handleColourChange() {
  myfavbook.colour= document.getElementById("colour"). value;
}

function handleCovertypechange(e){ 
  myfavbook.covertype=e.target.value;
  if(myfavbook.covertype!="other") {
    myfavbook.othercovervalue="";
    document.getElementById("othercovertype").style.display="none";
  } 
  else{
    document.getElementById("othercovertype").style.display="block";
  }
}
function handleCovermaterialchange() {
  if (myfavbook.covertype == "other") {
    myfavbook.othercovervalue = document.getElementById("othercovertype").value;
    document.getElementById("othercovertype").style.display="block";
  }
}
function handlenumberofpagesChange() {
  myfavbook.numberofpages= document.getElementById("numberofpages"). value;
}
function handlepriceChange() {
  myfavbook.price= document.getElementById("price"). value;
}
function handlecurrencyChange() {
  myfavbook.currency= document.getElementById("currency"). value;
}

function handleLanguageChange(e){ 
  myfavbook.language=e.target.value;
  if(myfavbook.language!="other") {
    myfavbook.otherlanguage="";
    document.getElementById("otherlanguage").style.display="none";
  } 
  else{
    document.getElementById("otherlanguage").style.display="block";
  }
}
function handleLanguagevalue() {
  if (myfavbook.language == "other") {
    myfavbook.otherlanguage=document.getElementById("otherlanguage").value;
    document.getElementById("otherlanguage").style.display="block";
  }
}

function handleOLanguageChange(e){ 
  myfavbook.olanguage=e.target.value;
  if(myfavbook.olanguage!="other") {
    myfavbook.otherolanguage="";
    document.getElementById("otherolanguage").style.display="none";
  } 
  else{
    document.getElementById("otherolanguage").style.display="block";
  }
}
function handleOLanguagevalue() {
  if (myfavbook.olanguage == "other") {
    myfavbook.otherolanguage=document.getElementById("otherolanguage").value;
    document.getElementById("otherolanguage").style.display="block";
  }
}
function handleeditionChange() {
  myfavbook.edition= document.getElementById("edition"). value;
}
function handledimensionsChange() {
  myfavbook.dimensions= document.getElementById("dimensions"). value;
}
function handlepublisherChange() {
  myfavbook.publisher= document.getElementById("publisher"). value;
}
function handlepdateChange() {
  myfavbook.pdate= document.getElementById("pdate"). value;
}
function handleorigpdateChange() {
  myfavbook.origpdate= document.getElementById("origpdate"). value;
}
function handlegenreChange() {
  myfavbook.genre= document.getElementById("genre"). value;
}
function handleagerestrictionChange() {
  myfavbook.agerestriction= document.getElementById("agerestriction"). value;
}

function showTheBookData(e){
  e.preventDefault();
  console.log(myfavbook);
  $.ajax({
    type: 'POST',
    url: "https://cse120-2021-api-haykanush.herokuapp.com/data",
    data: myfavbook,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("success");
    },
    error: function (xhr) {
      console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");  
    }
  });
}
function updateBook(){
  var tmp = {
   "id" : document.getElementById("_id").innerHTML,
   "fullname" : document.getElementById("fullname").value,
   "title": document.getElementById("title").value,
   "author": document.getElementById("author").value,
   "covertype": document.getElementById("covertype").value,
   "numberofpages": document.getElementById("numberofpages").value,
   "price": document.getElementById("price").value,
   "currency": document.getElementById("currency").value,
   "language": document.getElementById("language").value,
   "olanguage": document.getElementById("olanguage").value,
   "edition": document.getElementById("edition").value,
   "dimensions": document.getElementById("dimensions").value,
   "publisher": document.getElementById("publisher").value,
   "pdate": document.getElementById("pdate").value,
   "origpdate": document.getElementById("origpdate").value,
   "genre": document.getElementById("genre").value,
   "agerestriction": document.getElementById("agerestriction").value,
  
   }

  $.ajax({
        type: 'POST',
        url: "https://cse120-2021-api-haykanush.herokuapp.com/data/update",
        data: tmp,
        cache: false,
        dataType : 'json',
        success: function (data) {
          console.log("success");
        },
        error: function (xhr) {
          console.error("Error in post", xhr);
        },
        complete: function () {
          console.log("Complete");  
        }
      });
}
