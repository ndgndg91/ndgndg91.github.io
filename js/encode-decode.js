export function encodeBase64() {
  const input = document.getElementById("base64-input").value;
  const outputElement = document.getElementById("base64-output");
  try {
    // UTF-8로 인코딩하여 Latin1 범위 문제 해결
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const binary = String.fromCharCode(...data);
    outputElement.value = btoa(binary);
  } catch (e) {
    outputElement.value = "Error: Base64 encoding failed - " + e.message;
  }
}

export function decodeBase64() {
  const input = document.getElementById("base64-input").value;
  const outputElement = document.getElementById("base64-output");
  try {
    const binary = atob(input);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoder = new TextDecoder();
    outputElement.value = decoder.decode(bytes);
  } catch (e) {
    outputElement.value = "Error: Invalid Base64 string - " + e.message;
  }
}

export function encodeURL() {
  const input = document.getElementById("url-input").value;
  const outputElement = document.getElementById("url-output");
  try {
    const url = new URL(input);
    const encodedParams = Array.from(url.searchParams.entries())
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    outputElement.value = `${url.origin}${url.pathname}${
      encodedParams ? '?' + encodedParams : ''
    }`;
  } catch (e) {
    // URL 파싱 실패 시 전체 문자열을 인코딩
    outputElement.value = encodeURIComponent(input);
  }
}

export function decodeURL() {
  const input = document.getElementById("url-input").value;
  const outputElement = document.getElementById("url-output");
  try {
    outputElement.value = decodeURIComponent(input);
  } catch (e) {
    outputElement.value = "Error: Invalid URL-encoded string - " + e.message;
  }
}
