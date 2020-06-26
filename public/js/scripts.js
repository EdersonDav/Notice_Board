document.addEventListener("DOMContentLoaded", () => {
  loadingNotices();
});

//div form create new Notice
let btnNewNotice = document.getElementById("createNewNotice");

//Get all Notices
function loadingNotices() {
  fetch("http://localhost:5000/api/all")
    .then((res) => {
      return res.json();
    })
    .then((resp) => {
      let notices = resp;
      let allNotes = "";
      notices.forEach((notice) => {
        //All HTML Notice
        let itemNotice = `
        <div class="card" id=${notice.id}>
          <div class="setings">
            <button 
              onclick="setings('${notice.id + "s"}')" 
              class="dotdotdot">
              . . .
            </button>
            <div id=${notice.id + "s"} class="containerSetings">
              <button onclick="deleteNotice('${notice.id}')" 
              class="btnSet">Delete</button>
              <button 
              onclick="showOrHideEditNotice(
                '${notice.id}','${notice.description}'
                )" 
              class="btnSet">Edit</button>
            </div>
          </div>
          <h5 class="carTitle">${notice.title}</h5>
          <p class="carDescription">${notice.description}</p>
        </div>
        <div id=${notice.id + "e"} class="hide editeNotice">
          <input
            type="text"
            placeholder="New Title"
            id="${notice.id + "title"}"
            class="inputTitle"
            maxlength="50"
            value="${notice.title}"
          />
          <textarea
            placeholder="New Description"
            id="${notice.id + "description"}"
            class="inputDescription"
            rows="10"
            value="${notice.description}"
          ></textarea>
          <br />
          <button 
          class="btnSaveCancel" 
          onclick="showOrHideEditNotice(
            '${notice.id}','${notice.description}'
            )" >
            Cancel
          </button>
          <button 
          class="btnSaveCancel" 
          onclick="editNotice('${notice.id}')">Edit</button>
        </div>
      `;
        allNotes += itemNotice;
      });
      document.getElementById("notices").innerHTML = allNotes;
    });
}

//Create New Notice
function newPost() {
  let title = document.querySelector("#title").value;
  let description = document.querySelector("#description").value;
  let notice = { title, description };
  const options = {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(notice),
  };
  if (title != "" && description != "") {
    fetch("http://localhost:5000/api/new", options).then((resp) => {
      console.log(resp);
      showOrHideNewNotice();
      loadingNotices();
    });
  } else {
    alert("Your title and description cannot empty");
  }
}

//Delete Notice
function deleteNotice(id) {
  let noticeid = { id };
  const options = {
    method: "DELETE",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(noticeid),
  };
  fetch("http://localhost:5000/api/delete", options).then((resp) => {
    console.log(resp);
    loadingNotices();
  });
}

//Edit Notice
function editNotice(id) {
  let title = document.getElementById(id + "title").value;
  let description = document.getElementById(id + "description").value;
  let noticeEdit = { id, title, description };
  const options = {
    method: "PUT",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(noticeEdit),
  };
  fetch("http://localhost:5000/api/update", options).then((resp) => {
    console.log(resp);
    showOrHideEditNotice(id, "");
    loadingNotices();
  });
}

//Show form create notice
function showOrHideNewNotice() {
  if (btnNewNotice.classList.contains("hide")) {
    btnNewNotice.classList.remove("hide");
    btnNewNotice.classList.add("show");
  } else {
    btnNewNotice.classList.remove("show");
    btnNewNotice.classList.add("hide");
    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";
  }
}

//Show form edit notice
function showOrHideEditNotice(idNotice, txtDescription) {
  let idEditeNotice = idNotice + "e";
  let idDescriptionNotice = idNotice + "description";
  let divEditNotice = document.getElementById(idEditeNotice);
  let txtAreaEditNotice = document.getElementById(idDescriptionNotice);
  if (divEditNotice.classList.contains("hide")) {
    divEditNotice.classList.remove("hide");
    divEditNotice.classList.add("show");
    txtAreaEditNotice.value = txtDescription;
  } else {
    divEditNotice.classList.remove("show");
    divEditNotice.classList.add("hide");
  }
}

//Show Setings
function setings(sId) {
  //div container setings
  let containerSetings = document.getElementById(sId);

  if (!containerSetings.classList.contains("containerSetingsAnimateDown")) {
    containerSetings.classList.add("containerSetingsAnimateDown");
    containerSetings.classList.remove("containerSetingsAnimateUp");
    containerSetings.style.visibility = "initial";
  } else {
    containerSetings.classList.add("containerSetingsAnimateUp");
    containerSetings.classList.remove("containerSetingsAnimateDown");
  }
}
