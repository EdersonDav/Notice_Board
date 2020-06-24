module.exports = {
  notices: [
    {
      id: generateId(),
      title: "First Notice test",
      description: "First description test",
    },
  ],

  getNotices() {
    return this.notices;
  },

  createNotices(title, description) {
    let id = generateId();
    this.notices.push({
      id,
      title,
      description,
    });
  },

  deleteNotice(id) {
    let indexNotice = this.notices.findIndex((i) => i.id == id);
    this.notices.splice(indexNotice, 1);
  },

  updateNotice(id, title, description) {
    let indexNotice = this.notices.findIndex((i) => i.id == id);
    this.notices[indexNotice].title = title;
    this.notices[indexNotice].description = description;
  },
};

function generateId() {
  return Math.random().toString(36).replace(".", "");
}
