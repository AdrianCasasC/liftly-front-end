import { MONTHS } from "../constants/date"

export const getMonthNameByNumber = (monthNumber: number): string => {
	return MONTHS[monthNumber];
}

export const getEuropeDay = (date: Date): number => {
	const day = date.getDay(); // 0 = Sunday, 6 = Saturday
	return day === 0 ? 6 : day - 1;
}