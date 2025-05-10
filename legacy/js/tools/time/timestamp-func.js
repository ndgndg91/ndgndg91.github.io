export function updateTimestamp() {
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

export function convertTimestampToDatetime() {
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

export function convertDatetimeToTimestamp() {
  const datetimeInput = document.getElementById("datetime-input").value.trim();
  const timezone = document.getElementById("datetime-timezone").value;
  const resultElement = document.getElementById("datetime-to-timestamp-result");

  // 입력 형식 검증 (YYYY MM DD HH MM SS)
  const parts = datetimeInput.split(" ");
  if (parts.length !== 6) {
    resultElement.textContent = "형식: YYYY MM DD HH MM SS";
    return;
  }

  try {
    const [year, month, day, hour, minute, second] = parts.map(Number);

    // 사용자가 입력한 시간을 해당 시간대의 시간으로 간주
    const userDate = new Date(Date.UTC(year, month-1, day, hour, minute, second));

    // 시간대 오프셋 적용 (해당 시간대와 UTC 사이의 차이)
    const tzOffset = getTimezoneOffset(timezone, new Date());
    const timestamp = Math.floor(userDate.getTime() / 1000) - tzOffset;

    resultElement.textContent = timestamp;
  } catch (error) {
    resultElement.textContent = "잘못된 날짜 또는 시간대";
    console.error(error);
  }
}

// 시간대 오프셋을 초 단위로 계산하는 함수
function getTimezoneOffset(timezone, date) {
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  return (tzDate - utcDate) / 1000;
}

const timezoneSelect = document.getElementById("timezone-select");
if (timezoneSelect && !timezoneSelect.dataset.listenerAdded) {
  timezoneSelect.addEventListener("change", updateTimestamp);
  timezoneSelect.dataset.listenerAdded = "true";
}
