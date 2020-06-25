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
          <div class="carDescription">${notice.description}</div>
        </div>
      `;
        allNotes += itemNotice;
      });
      document.getElementById("notices").innerHTML = allNotes;
    });
}
