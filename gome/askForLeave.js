function getFirst(xpath) {
    return $x(xpath)[0];
}

getFirst('//*[@id="userbillForm"]/div[2]/div/div/table[3]/tbody/tr[2]/td[2]/textarea').click();

// 先执行上面两行代码 否则加班类型没法自动填上
function addZero(num) {
    if (num < 10) {
        return '0' + num;
    }
    return num;
}

// 设置值
const str = '[{"startDate":"2021-04-16 18:34:00","endDate":"2021-04-16 20:35:00"},{"startDate":"2021-04-19 18:31:00","endDate":"2021-04-19 20:35:00"},{"startDate":"2021-04-20 18:29:00","endDate":"2021-04-20 20:33:00"},{"startDate":"2021-04-21 18:25:00","endDate":"2021-04-21 20:35:00"},{"startDate":"2021-04-22 18:34:00","endDate":"2021-04-22 20:38:00"},{"startDate":"2021-04-23 18:35:00","endDate":"2021-04-23 20:43:00"}]';
const arr = JSON.parse(str);

const normalX = '//*[@id="tree"]/li[3]/div';

// 添加加班类型为普通加班
function addTypeByIndex(index) {
    let areaXPath = '//*[@id="userbillForm"]/div[2]/div/div/table[3]/tbody/tr[' + (index + 2) + ']/td[2]/textarea';
    getFirst(areaXPath).click();
    getFirst(normalX).click();
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

    const startInputs = $x('//*[@id="userbillForm"]/div[2]/div/div/table[3]/tbody/tr[' + (index + 2) + ']/td[3]/p/input');
    setTimeValue(startInputs, startDate);

    const endInputs = $x('//*[@id="userbillForm"]/div[2]/div/div/table[3]/tbody/tr[' + (index + 2) + ']/td[4]/p/input');
    setTimeValue(endInputs, endDate);

}

function setTimeValue(inputs, date) {
    inputs[0].value = date.getFullYear();
    inputs[1].value = addZero(date.getMonth() + 1);
    inputs[2].value = addZero(date.getDate());
    inputs[3].value = addZero(date.getHours());
    inputs[4].value = addZero(date.getMinutes());
}

// 添加加班按钮
const addButtonX = '//*[@id="addCommand"]/span/span/span';
const addButton = getFirst(addButtonX);

// 最多7条
let maxLine = arr.length;
for (let i = 0; i < maxLine; i++) {
    // 第一条不用添加
    if (i > 0) {
        addButton.click();
    }
    addTypeByIndex(i);
    addReason(i);
    addTime(i, arr[i]);
}
