import dayjs from 'dayjs'

// 封装日期格式
export const formatMonthDay= (date) => {
    return dayjs(date).format('MM月DD日')
};
export const formatMonthDay_1 = (date) => {
    return dayjs(date).format('MM.DD')
};

// 日期差天数
export const getDiffDays = (startDate, endDate) => {
    return dayjs(endDate).diff(startDate, 'day')
}