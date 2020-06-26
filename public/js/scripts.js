document.addEventListener("DOMContentLoaded", () => {
  loadingNotices();
});

//div form create new Notice
let btnNewNotice = document.getElementById("createNewNotice");

//Get all Notices
function loadingNotices() {
  fetch("http://192.168.15.5:5000/api/all")
    .then((res) => {
      return res.json();
    })
    .then((resp) => {
      let notices = resp;
      let allNotes = "";
      notices.forEach((notice) => {
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
              <br />
              <button class="btnSet">Update</button>
            </div>
          </div>
          <h5 class="carTitle">${notice.title}</h5>
          <p class="carDescription">${notice.description}</p>
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
    fetch("http://192.168.15.5:5000/api/new", options).then((resp) => {
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
  fetch("http://192.168.15.5:5000/api/delete", options).then((resp) => {
    console.log(resp);
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

//Show Setings
function setings(sId) {
  console.log(sId);

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
