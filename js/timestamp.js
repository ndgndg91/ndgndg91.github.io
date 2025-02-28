function updateTimestamp() {
  const now = new Date();
  const timestampElement = document.getElementById("current-timestamp");
  if (timestampElement) {
    timestampElement.textContent = Math.floor(now.getTime() / 1000);
  }

  const timezoneElement = document.getElementById("current-timezone");
  if (timezoneElement) {
    timezoneElement.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  const timezoneSelect = document.getElementById("timezone-select");
  const selectedTimezone = timezoneSelect ? timezoneSelect.value : Intl.DateTimeFormat().resolvedOptions().timeZone;
  const datetimeElement = document.getElementById("current-datetime");
  if (datetimeElement) {
    const options = {
      timeZone: selectedTimezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(now);
    const year = parts.find(part => part.type === 'year').value;
    const month = parts.find(part => part.type === 'month').value;
    const day = parts.find(part => part.type === 'day').value;
    const hours = parts.find(part => part.type === 'hour').value;
    const minutes = parts.find(part => part.type === 'minute').value;
    const seconds = parts.find(part => part.type === 'second').value;
    datetimeElement.textContent = `${year} ${month} ${day} ${hours} ${minutes} ${seconds}`;
  }
}

function convertTimestampToDatetime() {
  const timestampInput = document.getElementById("timestamp-input").value;
  const timezoneSelect = document.getElementById("timestamp-timezone").value;
  const resultElement = document.getElementById("timestamp-to-datetime-result");

  if (!timestampInput || isNaN(timestampInput)) {
    resultElement.textContent = "유효한 Unix Timestamp를 입력하세요.";
    return;
  }

  const timestamp = parseInt(timestampInput) * 1000;
  const date = new Date(timestamp);
  const options = {
    timeZone: timezoneSelect,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(date);
  const year = parts.find(part => part.type === 'year').value;
  const month = parts.find(part => part.type === 'month').value;
  const day = parts.find(part => part.type === 'day').value;
  const hours = parts.find(part => part.type === 'hour').value;
  const minutes = parts.find(part => part.type === 'minute').value;
  const seconds = parts.find(part => part.type === 'second').value;
  resultElement.textContent = `${year} ${month} ${day} ${hours} ${minutes} ${seconds}`;
}

function convertDatetimeToTimestamp() {
  const datetimeInput = document.getElementById("datetime-input").value.trim();
  const timezoneSelect = document.getElementById("datetime-timezone").value;
  const resultElement = document.getElementById("datetime-to-timestamp-result");

  // 입력 형식이 올바른지 확인 (YYYY MM DD HH MM SS)
  const parts = datetimeInput.split(" ");
  if (parts.length !== 6) {
    resultElement.textContent = "형식: YYYY MM DD HH MM SS";
    return;
  }

  const [year, month, day, hours, minutes, seconds] = parts;
  const dateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  // 날짜 유효성 검사
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    resultElement.textContent = "유효한 날짜/시간을 입력하세요.";
    return;
  }

  // 선택한 시간대에서 날짜/시간의 각 부분을 추출
  const options = {
    timeZone: timezoneSelect,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const partsInTimeZone = formatter.formatToParts(date);

  // 각 부분을 추출
  const yearPart = partsInTimeZone.find(part => part.type === 'year').value;
  const monthPart = partsInTimeZone.find(part => part.type === 'month').value;
  const dayPart = partsInTimeZone.find(part => part.type === 'day').value;
  const hourPart = partsInTimeZone.find(part => part.type === 'hour').value;
  const minutePart = partsInTimeZone.find(part => part.type === 'minute').value;
  const secondPart = partsInTimeZone.find(part => part.type === 'second').value;

  // UTC 기준 Date 객체 생성
  const utcDate = new Date(Date.UTC(
    parseInt(yearPart, 10),
    parseInt(monthPart, 10) - 1, // 월은 0부터 시작
    parseInt(dayPart, 10),
    parseInt(hourPart, 10),
    parseInt(minutePart, 10),
    parseInt(secondPart, 10)
  ));

  // 타임스탬프 계산 (초 단위)
  resultElement.textContent = Math.floor(utcDate.getTime() / 1000);
}

const timezoneSelect = document.getElementById("timezone-select");
if (timezoneSelect && !timezoneSelect.dataset.listenerAdded) {
  timezoneSelect.addEventListener("change", updateTimestamp);
  timezoneSelect.dataset.listenerAdded = "true";
}
