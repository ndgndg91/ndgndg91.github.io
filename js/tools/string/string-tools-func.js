import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5, v7 as uuidv7 } from 'uuid'; // uuid 모듈 추가

// UUID 형식 유효성 검사 함수
export function isValidUUID(str) {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(str);
}

export function generateUUIDv7() {
  document.getElementById('uuid-v7-result').textContent = uuidv7();
}

export function generateUUIDv1() {
  document.getElementById('uuid-v1-result').textContent = uuidv1(); // uuid.v1() -> uuidv1()
}

export function generateUUIDv3() {
  const namespace = document.getElementById('uuid-v3-namespace').value.trim();
  const name = document.getElementById('uuid-v3-name').value.trim();

  if (!namespace || !name) {
    alert('enter namespace and name.');
    return;
  }

  if (!isValidUUID(namespace)) {
    alert('namespace format must be uuid. ex) : 6ba7b810-9dad-11d1-80b4-00c04fd430c8');
    return;
  }

  try {
    document.getElementById('uuid-v3-result').value = uuidv3(name, namespace); // uuid.v3() -> uuidv3()
  } catch (error) {
    alert('error occurred when creating UUID v3. check input.');
    console.error(error);
  }
}

export function generateUUIDv4() {
  document.getElementById('uuid-v4-result').textContent = uuidv4(); // uuid.v4() -> uuidv4()
}

export function generateUUIDv5() {
  const namespace = document.getElementById('uuid-v5-namespace').value.trim();
  const name = document.getElementById('uuid-v5-name').value.trim();

  if (!namespace || !name) {
    alert('enter namespace and name.');
    return;
  }

  if (!isValidUUID(namespace)) {
    alert('namespace format must be uuid. ex) : 6ba7b810-9dad-11d1-80b4-00c04fd430c8');
    return;
  }

  try {
    document.getElementById('uuid-v5-result').textContent = uuidv5(name, namespace); // uuid.v5() -> uuidv5()
  } catch (error) {
    alert('error occurred when creating UUID v5. check input.');
    console.error(error);
  }
}

export function generateRandomHex() {
  const lengthInput = document.getElementById('hex-length').value;
  const length = parseInt(lengthInput);
  const resultElement = document.getElementById('random-hex-result');

  if (isNaN(length) || length < 1 || length > 512) {
    alert('Length must be a number between 1 and 128.');
    return;
  }

  const byteLength = Math.ceil(length / 2);
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  let result = Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, length);
  if (result.length < length) {
    result += '0'.repeat(length - result.length);
  }

  resultElement.textContent = result;
}

export function getByteLength(str) {
  return new TextEncoder().encode(str).length;
}

export function analyzeString() {
  const input = document.getElementById('string-input').value;
  const lengthElement = document.getElementById('string-length');
  const bytesElement = document.getElementById('string-bytes');

  if (!input) {
    lengthElement.textContent = '0';
    bytesElement.textContent = '0';
    return;
  }

  const charLength = input.length;
  const byteLength = getByteLength(input);

  lengthElement.textContent = charLength;
  bytesElement.textContent = byteLength;
}
