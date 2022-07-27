export const isObject = <T extends object>(input: any): input is T => {
  return Object.prototype.toString.call(input) === '[object Object]';
};
