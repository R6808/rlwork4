const expenses = [
    { item: '早餐', category: '餐饮', amount: 8 },
    { item: '午餐', category: '餐饮', amount: 18 },
    { item: '公交', category: '交通', amount: 2 },
    { item: '电影', category: '娱乐', amount: 35 },
    { item: '晚餐', category: '餐饮', amount: 20 },
    { item: '错误数据', category: '其他', amount: -10 }
];

console.table(expenses);
const cleanExpenses = (list) => {
    return list.filter(expense => expense.amount >= 0);
};

const totalExpense = (list) => {
    return list.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);
};

const getItems = (list) => {
    return list.map(expense => expense.item);
};

const validExpenses = cleanExpenses(expenses);

console.log('清洗后的数据：');
console.table(validExpenses);

console.log('总消费：', totalExpense(validExpenses), '元');

console.log('消费项目：', getItems(validExpenses));