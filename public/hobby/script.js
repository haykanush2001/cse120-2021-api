var requiredFields = [
  "fullname", "favsinger", "whyhersongs", "favsong", "singingway", "singaduet", "training", "oneword", "aspect"
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
function displayData(existingData) {
  document.getElementById("existingData").innerHTML = "<ul>";
  for (var i = 0; i < existingData.length; i++) {
    currentBook = existingData[i];
    document.getElementById("existingData").innerHTML += "<li><i>" + currentHobby.fullname + "</li> : <b>" + currentHobby.title + "</b></li>";
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
var loadedData = [];

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
              document.location  = "edit_hobby.html";
            } else {
              document.location  = "edit_book.html"; 
            }
        }
    })
}
