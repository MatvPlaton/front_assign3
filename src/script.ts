const email: string = 'm.platonov@innopolis.university';

const params: URLSearchParams = new URLSearchParams();
params.append('email', email);

async function get_id(): Promise<string> {
    let response: Response = await fetch('https://fwd.innopolis.university/api/hw2?' + params.toString());
    return await response.text();
}

interface Data {
    alt: string;
    img: string;
    safe_title: string;
    year: string;
    month: string;
    day: string;
}

function load(data: Data): void {
    const dateElement: HTMLElement | null = document.getElementById('date');
    const imgElement: HTMLImageElement | null = document.getElementById('image') as HTMLImageElement;
    const title: HTMLElement | null = document.getElementById('title');

    if (imgElement) {
        imgElement.alt = data['alt'];
        imgElement.src = data['img'];
        imgElement.title = data['safe_title'];
    }

    if (title) {
        title.textContent = "Title: " + data['safe_title'];
    }

    let year: number = parseInt(data['year'], 10);
    let month: number = parseInt(data['month'], 10) - 1;
    let day: number = parseInt(data['day'], 10);
    const Date1: Date = new Date(year, month, day);

    if (dateElement) {
        dateElement.textContent = "Date: " + Date1.toLocaleDateString();
    }
}

async function get_data(res: string): Promise<void> {
    let url: string = 'https://fwd.innopolis.university/api/comic?id=' + res;
    let response: Response = await fetch(url);
    let data: Data = await response.json();
    load(data);
}

async function init(): Promise<void> {
    let id: string = await get_id();
    await get_data(id);
}

init();