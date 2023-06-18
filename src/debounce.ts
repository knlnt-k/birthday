export default function debounce(callback: Function, delay: number) {
  let timeoutID: any = null;

  return function () {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      // @ts-ignore
      // eslint-disable-next-line prefer-rest-params
      callback.apply(this, arguments);
    }, delay);
  };
}
