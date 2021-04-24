function dateTimeToString(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    let hours = date.getHours();
    let mins = date.getMinutes();
    if (hours < 10) hours = "0" + hours;
    if (mins < 10) mins = "0" + mins;
    return year + "-" + month + "-" + day + " " + hours + ":" + mins + ":00";
}
const trPath = '/html/body/div/div[2]/div[2]/div[3]/table/tbody/tr';

const trs = $x(trPath);
const arr = [];
for (let i = 0; i < trs.length; i++) {
    const tr = trs[i];
    const tds = tr.children;
    const date = tds[0].children[0].innerHTML;
    const startTime = tds[1].children[0].innerHTML;
    const endTime = tds[2].children[0].innerHTML;
    if (endTime !== "") {
        const obj = {};
        let startDate = new Date(date + " " + startTime);
        // 加班时间不能早于18:30
        const normalStartDate = new Date(date + " 18:30");
        startDate.setHours(startDate.getHours() + 10);
        if (startDate < normalStartDate) {
            startDate = normalStartDate;
        }
        const endDate = new Date(date + " " + endTime);
        if (endDate > startDate) {
            obj.startDate = dateTimeToString(startDate);
            obj.endDate = dateTimeToString(endDate);
            arr.push(obj);
        }

    }
}
console.log(JSON.stringify(arr));
