export default function tlv(data: any) {
  let result = '';
  for (const val in data) {
    if (!data[val]) continue;
    if (typeof data[val] === 'object') data[val] = tlv(data[val]);
    result +=
      val.toString().padStart(2, '0') +
      data[val].length.toString().padStart(2, '0') +
      data[val];
  }

  return result;
}
