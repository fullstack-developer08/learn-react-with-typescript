export default {
  formatCurrency: (num: number): string => {
    return "$" + Number(num.toFixed(2)).toLocaleString() + " ";
  },

  setLocalStorage: (name: string, value: any) => {
    try {
      let val = JSON.stringify(value);
      localStorage.setItem(name, val);
    } catch (e) {
      return;
    }
  },

  getLocalStorage: () => {
    return;
  },

  removeLocalStorage: () => {
    return;
  }
};
