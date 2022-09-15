function formatedDate(date) {
    return date.toLocaleDateString(`id-Id`, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
}
module.exports = formatedDate