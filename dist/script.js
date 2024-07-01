const email = 'm.platonov@innopolis.university';
const params = new URLSearchParams();
params.append('email', email);
async function get_id() {
    let response = await fetch('https://fwd.innopolis.university/api/hw2?' + params.toString());
    return await response.text();
}
function load(data) {
    const dateElement = document.getElementById('date');
    const imgElement = document.getElementById('image');
    const title = document.getElementById('title');
    if (imgElement) {
        imgElement.alt = data['alt'];
        imgElement.src = data['img'];
        imgElement.title = data['safe_title'];
    }
    if (title) {
        title.textContent = "Title: " + data['safe_title'];
    }
    let year = parseInt(data['year'], 10);
    let month = parseInt(data['month'], 10) - 1;
    let day = parseInt(data['day'], 10);
    const Date1 = new Date(year, month, day);
    if (dateElement) {
        dateElement.textContent = "Date: " + Date1.toLocaleDateString();
    }
}
async function get_data(res) {
    let url = 'https://fwd.innopolis.university/api/comic?id=' + res;
    let response = await fetch(url);
    let data = await response.json();
    load(data);
}
async function init() {
    let id = await get_id();
    await get_data(id);
}
init();
