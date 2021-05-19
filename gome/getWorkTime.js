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

const workDays = ["2021-04-25"];
const holidays = ["2021-05-03"]

function isWeekend(date) {
    if (workDays.includes(date)) return false;
    if (holidays.includes(date)) return true;
    const dt = new Date(date);
    return dt.getDay() === 0 || dt.getDay() === 6;
}

const trPath = '/html/body/div/div[2]/div[2]/div[3]/table/tbody/tr';

const trs = $x(trPath);
const arr = [];
let total = 0;
let days = 0;
for (let i = 0; i < trs.length; i++) {
    const tr = trs[i];
    const tds = tr.children;
    const date = tds[0].children[0].innerHTML;
    const startTime = tds[1].children[0].innerHTML;
    const endTime = tds[2].children[0].innerHTML;
    if (endTime !== "") {
        const obj = {};
        let startDate = new Date(date + " " + startTime);
        const endDate = new Date(date + " " + endTime);
        total += (endDate - startDate) / (1000 * 60 * 60);
        // 周末加班
        if (isWeekend(date)) {
            obj.isWeekend = true;
        } else {
            // 平时加班时间不能早于18:30
            days++;
            const normalStartDate = new Date(date + " 18:30");
            startDate.setHours(startDate.getHours() + 10);
            if (startDate < normalStartDate) {
                startDate = normalStartDate;
            }
        }
        const diff = endDate.getTime() - startDate.getTime();
        if (diff >= 60 * 60 * 1000) {
            obj.startDate = dateTimeToString(startDate);
            obj.endDate = dateTimeToString(endDate);
            arr.push(obj);
        }
    }
}
// alert(total.toFixed(2) + ' ' + days + ' ---  ' + (total - days * 12).toFixed(2));
alert((total - days * 12).toFixed(2));
alert(JSON.stringify(arr));
