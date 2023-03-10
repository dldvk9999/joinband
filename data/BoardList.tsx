const list = [];

for (let i = 0; i < 150; i++) {
    list.push({
        number: i + 1,
        title: "test" + (i + 1),
        content: "This is content of test" + (i + 1),
        writer: "guest" + (i + 1),
        date: "2023.3.10",
        view: Math.floor(Math.random() * 100),
    });
}

export const BoardList = list;
