import { CityList } from "./CityList";

const list = [];
const cities = Object.keys(CityList);
const roomNames = [
    "어반블루 합주실",
    "오렌지 합주실",
    "잼 합주실",
    "봄스튜디오 합주실",
    "별나무 합주실",
    "홍대 합주실",
    "그라운드 합주실",
    "노바 합주실",
    "그루브 합주실",
    "코이 합주실",
];

for (let i = 0; i < 100; i++) {
    const city: string = cities[Math.floor(Math.random() * cities.length)];
    list.push({
        id: i + 1,
        name: roomNames[Math.floor(Math.random() * roomNames.length)],
        place1: city,
        place2: CityList[city][Math.floor(Math.random() * CityList[city].length)],
        price: Math.round(Math.random() * 10) * 1000 + 10000,
        data: "넓고 깨끗하고 악기 대여도 가능합니다~",
        link: "about:link",
    });
}

export const BandRoomList = list;
