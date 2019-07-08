export default {
  formatCurrency: (num: number): string => {
    return "$" + Number(num.toFixed(2)).toLocaleString() + " ";
  },

  setLocalStorage: (key: string, value: any) => {
    try {
      const obj = JSON.stringify(value);
      localStorage.setItem(key, obj);
    } catch (e) {
      return;
    }
  },

  getLocalStorage: (key: string) => {
    try {
      const stringObj = localStorage.getItem(key);
      if (stringObj === null) return undefined;
      return JSON.parse(stringObj);
    } catch (e) {
      return undefined;
    }
  },

  removeLocalStorage: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      return undefined;
    }
  }
};
