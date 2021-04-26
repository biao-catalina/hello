function findByXpath(xpath) {
    return document.evaluate(
        xpath,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    )
}

function getFirst(xpath) {
    return findByXpath(xpath).snapshotItem(0);
}


function filterArr(arr, lastApplyDay) {
    if (lastApplyDay === null || lastApplyDay === undefined || lastApplyDay === '') {
        return arr;
    }
    lastApplyDay += " 23:59:59";
    return arr.filter(item => item.startDate > lastApplyDay);
}

// 先点开第一个加班类型
function addZero(num) {
    if (num < 10) {
        return '0' + num;
    }
    return num;
}

// 设置值
let str = prompt("时间JSON");
if (str === null) {
    str = '[]';
}
const lastApplyDay = prompt("最后提报日期", "2021-04-22");

let arr = JSON.parse(str);
arr = filterArr(arr, lastApplyDay);

const normalX = '//*[@id="tree"]/li[3]/div';

const weekendX = '//*[@id="tree"]/li[1]/div';

// 添加加班类型
function addTypeByIndex(index, obj) {
    let areaXPath = '//*[@id="userbillForm"]/div[2]/div/div/table[3]/tbody/tr[' + (index + 2) + ']/td[2]/textarea';
    getFirst(areaXPath).click();
    if (obj.isWeekend) {
        getFirst(weekendX).click();
    } else {
        getFirst(normalX).click();
    }
}

// 添加加班事由
function addReason(index) {
    let areaXPath = '//*[@id="userbillForm"]/div[2]/div/div/table[3]/tbody/tr[' + (index + 2) + ']/td[5]/textarea';
    getFirst(areaXPath).value = '工作加班';
}

// 添加开始时间
function addTime(index, obj) {

    let startDate = new Date(obj.startDate);
    let endDate = new Date(obj.endDate);

    const startInputs = findByXpath('//*[@id="userbillForm"]/div[2]/div/div/table[3]/tbody/tr[' + (index + 2) + ']/td[3]/p/input');
    setTimeValue(startInputs, startDate);

    const endInputs = findByXpath('//*[@id="userbillForm"]/div[2]/div/div/table[3]/tbody/tr[' + (index + 2) + ']/td[4]/p/input');
    setTimeValue(endInputs, endDate);

}

function setTimeValue(inputs, date) {
    inputs.snapshotItem(0).value = date.getFullYear();
    inputs.snapshotItem(1).value = addZero(date.getMonth() + 1);
    inputs.snapshotItem(2).value = addZero(date.getDate());
    inputs.snapshotItem(3).value = addZero(date.getHours());
    inputs.snapshotItem(4).value = addZero(date.getMinutes());
}

// 添加加班按钮
const addButtonX = '//*[@id="addCommand"]/span/span/span';
const addButton = getFirst(addButtonX);

// 最多7条
let maxLine = arr.length > 7 ? 7 : arr.length;
for (let i = 0; i < maxLine; i++) {
    // 第一条不用添加
    if (i > 0) {
        addButton.click();
    }
    addTypeByIndex(i, arr[i]);
    addReason(i);
    addTime(i, arr[i]);
}
//*[@id="userbillForm"]/div[2]/div/div/table[3]/tbody/tr[5]/td[5]
/*const rowXpath = '//!*[@id="userbillForm"]/div[2]/div/div/table[3]/tbody/tr'
const rows = findByXpath(rowXpath);
for (let i = 1; i < rows.snapshotLength; i++) {
    $(rows.snapshotItem(i).children[2].getElementsByTagName('input')[1]).blur();
    $(rows.snapshotItem(i).children[3].getElementsByTagName('input')[1]).blur();
}*/
