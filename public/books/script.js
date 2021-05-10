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
function loadExistingData() {
  var existingData = [];
  $.ajax({
    type : "GET",
    url : "https://cse120-2021-api-haykanush.herokuapp.com/data",
    dataType : "json",
    success : function(data) {
      console.log("success", data);
      existingData = data;
      displayData(existingData.data);
    },
    error : function(data) {
        console.log("Error")
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
function deleteData(id) {

    var r = confirm("Are you sure you want to delete the item with the following ID? " + id);
    if (r == true) {
      
    } else {
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

function loadExistingData() {
    $.ajax({
        type : "GET",
        url : "https://cse120-2021-api-haykanush.herokuapp.com/data",
        dataType : "json",
        success : function(data) {
          console.log("success", data);
            displayData(data.data);
        },
        error : function(data) {
            console.log("Error")
        }
    });
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
          span1.innerHTML = "N/A";
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
