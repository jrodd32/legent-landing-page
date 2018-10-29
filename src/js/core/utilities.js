const randomId = () => Math.random().toString(36).slice(2);

// wait until element is in dom
const wait = (selector) => {
  return new Promise((resolve, reject) => {
    const waitForEl = (selector, count = 0) => {
      const el = document.querySelector(selector);

      if (el) {
        resolve(el);
      } else {
        setTimeout(() => {
          count++;

          if (count < 10) {
            waitForEl(selector, count);
          } else {
            reject();
          }
        }, 100);
      }
    };

    waitForEl(selector);
  });
};

export {
  randomId,
  wait
};
