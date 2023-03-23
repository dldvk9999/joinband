const list = [];
const partList = ["드럼", "일렉기타", "통기타", "건반", "보컬", "Etc"];
const songType = ["클래식", "발라드", "락", "CCM", "블루스", "재즈", "컨트리", "디스코", "트로트", "EDM", "Etc"];

// 랜덤한 모집 글 생성 (API 연동 시 삭제 예정)
function random(type: "instru" | "song") {
    const randomType = type === "instru" ? partList : songType;
    let result = [];
    for (let i = 0; i < randomType.length; i++) {
        if (Math.round(Math.random())) {
            result.push(<p key={"random-" + i}>{randomType[i]}</p>);
        }
    }
    return result;
}

for (let i = 0; i < 100; i++) {
    list.push({
        number: i + 1,
        title: "밴드원 모집 중_" + (i + 1),
        content: "밴드원 구인합니다_" + (i + 1),
        writer: "guest" + (i + 1),
        date: "2023.3.23",
        view: Math.floor(Math.random() * 100),
        instrument: random("instru"),
        songType: random("song"),
    });
}

export const MemberjoinList = list;
