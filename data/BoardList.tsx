const list = [];
let commentId = 1;

function commentRandom() {
    let commentList = [];
    for (let i = 0; i < Math.round(Math.random() * 10); i++) {
        const TIME_ZONE = 9 * 60 * 60 * 1000;
        const date = new Date();

        commentList.push({
            commentId: commentId++,
            userId: 1,
            time: new Date(date.getTime() + TIME_ZONE).toISOString().replace("T", " ").slice(0, -5).toString(),
            user: "Admin",
            data: "This is comment Test" + (commentId - 1),
        });
    }
    return commentList;
}

for (let i = 0; i < 150; i++) {
    list.push({
        number: i + 1,
        title: "test" + (i + 1),
        content: "This is content of test" + (i + 1),
        writer: "guest" + (i + 1),
        date: "2023.3.10",
        view: Math.floor(Math.random() * 100),
        comment: commentRandom(),
    });
}

export const BoardList = list;
