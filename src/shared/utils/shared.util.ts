import { Account } from '../models/all.types';

export const toDate = (dateString: string): Date | string => {
  // 입력 문자열 확인 (6자리)
  if (dateString.length !== 6) {
    return '';
  }

  // 년, 월, 일 추출
  const year = parseInt(`20${dateString.slice(0, 2)}`, 10); // 앞 두 자리: 년도
  const month = parseInt(dateString.slice(2, 4), 10) - 1; // 월 (0부터 시작하므로 -1)
  const day = parseInt(dateString.slice(4, 6), 10); // 일

  // Date 객체 생성
  return new Date(year, month, day);
};

export const koreanDate = (date: Date | string) => {
  if (typeof date === 'string') {
    return date;
  } else {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
};

export const containsKorean = (str: string) => {
  // 완성형 한글과 자음/모음을 포함하는 정규식
  const regex = /[\u3131-\u3163\uac00-\ud7a3]/;
  return regex.test(str);
};

export const fullNameGet = (account: Account) => {
  if (account) {
    const fullName = `${account.last_name}${account.first_name}`;
    return fullName;
  } else {
    return '';
  }
};
