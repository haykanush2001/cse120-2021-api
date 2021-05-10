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
function updateBookData(e) {
  e.preventDefault();
  var updatedBook = {};
  updatedBook.id = document.getElementById("_id").value;
  updatedBook.fullname = document.getElementById("fullname").value;
  updatedBook.title = document.getElementById("title").value;
  updatedBook.author = document.getElementById("author").value;
  updatedBook.covertype = document.getElementById("covertype").value;
  updatedBook.numberofpages = document.getElementById("numberofpages").value;
  updatedBook.price = document.getElementById("price").value;
  updatedBook.currency = document.getElementById("currency").value;
  updatedBook.language = document.getElementById("language").value;
  updatedBook.olanguage = document.getElementById("olanguage").value;
  updatedBook.edition = document.getElementById("edition").value;
  updatedBook.dimensions = document.getElementById("dimensions").value;
  updatedBook.publisher = document.getElementById("publisher").value;
  updatedBook.pdate = document.getElementById("pdate").value;
  updatedBook.origpdate = document.getElementById("origpdate").value;
  updatedBook.genre = document.getElementById("genre").value;
  updatedBook.agerestriction = document.getElementById("agerestriction").value;
    
    console.log(myfavbook);

      $.ajax({
      type: 'POST',
      url: "https://cse120-2021-api-haykanush.herokuapp.com/data/update",
      data: updatedBook,
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
function updateHobbyData(e) {
  e.preventDefault();
  var updatedHobby = {};
  updatedHobby.id = document.getElementById("_id").value;
  updatedHobby.fullname = document.getElementById("fullname").value;
  updatedHobby.favsinger = document.getElementById("favsinger").value;
  updatedHobby.whyhersongs = document.getElementById("whyhersongs").value;
  updatedHobby.singingstyle = document.getElementById("singingstyle").value;
  updatedHobby.favsong = document.getElementById("favsong").value;
  updatedHobby.singingway = document.getElementById("singingway").value;
  updatedHobby.singaduet = document.getElementById("singaduet").value;
  updatedHobby.training = document.getElementById("training").value;
  updatedHobby.audience = document.getElementById("audience").value;
  updatedHobby.oneword = document.getElementById("oneword").value;
  updatedHobby.aspect = document.getElementById("aspect").value;
  

       $.ajax({
      type: 'POST',
      url: "https://cse120-2021-api-haykanush.herokuapp.com/data/update",
      data: updatedHobby,
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
    if (elem["owner"] == "Haykanush Papoyan") {
          var button2 = document.createElement("button");
          button2.innerHTML = "Edit";
          button2.className = "editButton";
          button2.id = "edit_"+ elem["_id"];
          button2.addEventListener("click", function(e){
          editData(e, e.target.id);
          }, false);
          item.appendChild(button2);
        }

        if (elem["owner"] == "Haykanush Papoyan" || (elem["fullname"] && elem["fullname"].indexOf("Haykanush Papoyan") > -1)) {
          var button = document.createElement("button");
          button.innerHTML = "Delete";
          button.id = elem["_id"];
          button.addEventListener("click", function(e){
          deleteData(e.target.id);
          }, false);
          item.appendChild(button);
         }
         document.getElementById(containerDivName).appendChild(item);
     
    })


    document.querySelectorAll("#" + containerDivName +" div.item").forEach(div => {
      div.addEventListener("click", function(e){
        if (this.style.height == "auto") {
          this.style.height = "30px";
        } else {
          this.style.height = "auto";
        }
      })        
    })
}

var loadedData = [];

function editData(e, id){
  e.stopImmediatePropagation();
 var tmp = id.split("edit_");
 var item_id = tmp[1];
 console.log(item_id);

loadedData.forEach(item => {
    if (item._id == item_id && item["owner"] == "Haykanush Papoyan") {
        console.log(item); 
        localStorage = window.localStorage;
        localStorage.setItem('editItem', JSON.stringify(item));
        if (item["project"] == "Singing") {
          document.location  = "edit_hobby.html"; 
        } else {
          document.location  = "edit_book.html"; 
        }
    }
  })
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