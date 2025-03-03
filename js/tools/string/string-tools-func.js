import '../../../css/base.css';
import '../../../css/navigation.css';
import '../../../css/sections.css';
import '../../../css/tools.css';
import '../../../css/responsive.css';
import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5 } from 'uuid'; // uuid 모듈 추가

// UUID 형식 유효성 검사 함수
export function isValidUUID(str) {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(str);
}

// 16진수로 변환하는 유틸리티 함수
export function toHex(value, length) {
  return value.toString(16).padStart(length, '0');
}

export function generateUUIDv7() {
  const timestamp = Date.now();
  const timestampHex = toHex(timestamp, 12);
  const rand1 = Math.floor(Math.random() * 0x10000);
  const rand2 = Math.floor(Math.random() * 0x100000000);
  const rand3 = Math.floor(Math.random() * 0x100000000);
  const version = 7;
  const variant = 0x8000 | (rand1 & 0x3FFF);

  document.getElementById('uuid-v7-result').textContent = [
    timestampHex.slice(0, 8),
    timestampHex.slice(8, 12),
    toHex(version, 1) + toHex(variant, 3),
    toHex(rand2 >>> 16, 4),
    toHex(rand2 & 0xFFFF, 4) + toHex(rand3, 8),
  ].join('-');
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
    document.getElementById('uuid-v3-result').textContent = uuidv3(name, namespace); // uuid.v3() -> uuidv3()
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

  if (isNaN(length) || length < 1 || length > 128) {
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
