export function cutByLen(str, b, i, c) {
  const strArr = [];
  let startPoint = 0;
  const endPoint = 65000;
  for (b = i = 0; (c = str.charCodeAt(i)); ) {
    b += c >> 7 ? 2 : 1;
    i++;
    if (b === startPoint + endPoint) {
      strArr.push(str.substring(startPoint, i));
      startPoint += endPoint;
    }
  }
  if (b !== 20) {
    strArr.push(str.substring(startPoint, i));
  }
  return strArr;
}
