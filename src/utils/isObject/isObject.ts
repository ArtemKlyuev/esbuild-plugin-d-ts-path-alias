export const isObject = <T extends Record<string, any>>(input: any): input is T => {
  return Object.prototype.toString.call(input) === '[object Object]';
};
