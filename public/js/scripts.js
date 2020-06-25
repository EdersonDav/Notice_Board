document.addEventListener("DOMContentLoaded", () => {
  loadingNotices();
});

function loadingNotices() {
  fetch("http://localhost:5000/api/all")
    .then((res) => {
      return res.json();
    })
    .then((resp) => {
      let notices = resp;
      let allNotes = "";
      notices.forEach((notice) => {
        let itemNotice = `
        <div class="card" id=${notice.id}>
          <h5 class="carTitle">${notice.title}</h5>
          <p class="carDescription">${notice.description}</p>
        </div>
      `;
        allNotes += itemNotice;
      });
      document.getElementById("notices").innerHTML = allNotes;
    });
}

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
      document.querySelector("#title").value = "";
      document.querySelector("#description").value = "";
      loadingNotices();
    });
  } else {
    alert("Your title and description cannot empty");
  }
}
