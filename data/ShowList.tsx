const list = [];

for (let i = 0; i < 150; i++) {
    list.push({
        number: i + 1,
        title: "test" + (i + 1) + " of ShowList",
        content: "/show/show" + (Math.floor(Math.random() * 7) + 1) + ".webp",
        writer: "guest" + (i + 1),
        date: "2023.4.2",
        view: Math.floor(Math.random() * 100),
    });
}

export const ShowList = list;
