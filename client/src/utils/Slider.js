export const Slider = {

  calcForBalances: function (calcObj) {
    const { width, numBal, numExp, balOpen, expOpen } = calcObj;
    let stateObject = {};

    if (!balOpen) {
      stateObject.balanceOpen = true;
      stateObject.balanceStyle = { opacity: "1" }
      stateObject.balanceStyle.height = `calc(69px + ${numBal * 19}px)`;
    }
    else {
      stateObject.balanceOpen = false;
      stateObject.balanceStyle = { opacity: "0" };
      stateObject.balanceStyle.height = "0";
    }

    if (width === 640) {
      stateObject.expensesTopStyle = { transition: "transform .28s ease-in-out" };
      stateObject.creditTopStyle = { transition: "transform .28s ease-in-out" };

      if (!balOpen && !expOpen) {
        stateObject.expensesTopStyle.transform = `translateY(${69 + (numBal * 19)}px)`;
        stateObject.creditTopStyle.transform = `translateY(${69 + (numBal * 19)}px)`;
      }
      else if (!balOpen && expOpen) {
        stateObject.creditTopStyle.transform = `translateY(${53 + (numExp * 84) + 69 + (numBal * 19)}px)`;
        stateObject.expensesTopStyle.transform = `translateY(${69 + (numBal * 19)}px)`;
      }
      else if (balOpen && expOpen) {
        stateObject.expensesTopStyle.transform = `translateY(0)`;
        stateObject.creditTopStyle.transform = `translateY(${53 + (numExp * 84)}px)`;
      }
      else {
        stateObject.expensesTopStyle.transform = `translateY(0)`;
        stateObject.creditTopStyle.transform = `translateY(0)`;
      }
    }

    if (width === 980) {
      stateObject.savingsTopStyle = { transition: "transform .28s ease-in-out" };
      if (!balOpen)
        stateObject.savingsTopStyle.transform = `translateY(${69 + (numBal * 19)}px)`;
      else
        stateObject.savingsTopStyle.transform = `translateY(0)`;
    }

    return stateObject;
  },

  calcForExpenses: function (calcObj) {
    const { width, numBal, numExp, balOpen, expOpen } = calcObj;
    let stateObject = {};
    let time;
    if (numExp < 3) time = .3;
    else if (numExp < 6) time = .35;
    else if (numExp > 8) time = .5;
    else time = .42;

    if (!expOpen) {
      stateObject.expensesOpen = true;
      stateObject.expensesStyle = { opacity: "1" }
      stateObject.expensesStyle.height = `calc(53px + ${numExp * 84}px)`;
      stateObject.expensesStyle.transition = `height ${time}s ease-in-out, opacity .3s ease-in-out`;
    }
    else {
      stateObject.expensesOpen = false;
      stateObject.expensesStyle = { opacity: "0" };
      stateObject.expensesStyle.height = "0";
      stateObject.expensesStyle.transition = `height ${time}s ease-in-out, opacity .3s ease-in-out .15s`;
    }

    if (width === 640) {
      stateObject.creditTopStyle = { transition: `transform ${time}s ease-in-out` };

      if (!balOpen)
        stateObject.creditTopStyle.transform = `translateY(${53 + (numExp * 84)}px)`;
      else
        stateObject.creditTopStyle.transform = `translateY(${53 + (numExp * 84) + 69 + (numBal * 19)}px)`;

      if (balOpen && expOpen)
        stateObject.creditTopStyle.transform = `translateY(${69 + (numBal * 19)}px)`;
      if (!balOpen && expOpen)
        stateObject.creditTopStyle.transform = "translateY(0)";
    }

    if (width === 980) {
      stateObject.transTopStyle = { transition: `transform ${time}s ease-in-out` };
      if (!expOpen)
        stateObject.transTopStyle.transform = `translateY(${53 + (numExp * 84)}px)`;
      else
        stateObject.transTopStyle.transform = "translateY(0)";
    }

    return stateObject;
  },

  calcForThisMonth: function (calcObj) {
    const { width, numMonth, numSavings, savOpen, monthOpen } = calcObj;
    let stateObject = {};
    let time;
    if (numMonth < 4) time = .38;
    if (numMonth > 7) time = .47;
    else time = .43;

    if (!monthOpen) {
      stateObject.thisMonthOpen = true;
      stateObject.monthStyle = { opacity: "1" }
      stateObject.monthStyle.height = `calc(280px + ${numMonth * 19}px`;
      stateObject.monthStyle.transition = `height ${time}s 0s ease-in-out, opacity .3s ease-in-out`;
    }
    else {
      stateObject.thisMonthOpen = false;
      stateObject.monthStyle = { opacity: "0" };
      stateObject.monthStyle.height = "0";
      stateObject.monthStyle.transition = `height ${time}s 0s ease-in-out, opacity .3s .15s ease-in-out .15s`;
    }

    if (width === 640) {
      stateObject.savingsTopStyle = { transition: `transform ${time}s ease-in-out` };
      stateObject.transTopStyle = { transition: `transform ${time}s ease-in-out` };

      if (!monthOpen && !savOpen) {
        stateObject.savingsTopStyle.transform = `translateY(${280 + (numMonth * 19)}px)`;
        stateObject.transTopStyle.transform = `translateY(${280 + (numMonth * 19)}px)`;
      }
      else if (!monthOpen && savOpen) {
        stateObject.transTopStyle.transform = `translateY(${280 + (numMonth * 19) + 53 + (numSavings * 84)}px)`;
        stateObject.savingsTopStyle.transform = `translateY(${280 + (numMonth * 19)}px)`;
      }
      else if (monthOpen && savOpen) {
        stateObject.savingsTopStyle.transform = "translateY(0)";
        stateObject.transTopStyle.transform = `translateY(${53 + (numSavings * 84)}px)`;
      }
      else {
        stateObject.savingsTopStyle.transform = "translateY(0)";
        stateObject.transTopStyle.transform = "translateY(0)";
      }
    }

    if (width === 980) {
      stateObject.creditTopStyle = { transition: `transform ${time}s ease-in-out` };
      if (!monthOpen)
        stateObject.creditTopStyle.transform = `translateY(${280 + (numMonth * 19)}px)`;
      else
        stateObject.creditTopStyle.transform = "translateY(0)";
    }

    return stateObject;
  },

  calcForSavings: function (calcObj) {
    const { width, numMonth, numSavings, savOpen, monthOpen } = calcObj;
    let stateObject = {};

    if (!savOpen) {
      stateObject.savingsOpen = true;
      stateObject.savingsStyle = { opacity: "1" }
      stateObject.savingsStyle.height = `calc(53px + ${numSavings * 84}px`;
    }
    else {
      stateObject.savingsOpen = false;
      stateObject.savingsStyle = { opacity: "0" };
      stateObject.savingsStyle.height = "0";
    }

    if (width === 640) {
      stateObject.transTopStyle = { transition: "transform .28s ease-in-out" };

      if (!monthOpen)
        stateObject.transTopStyle.transform = `translateY(${53 + (numSavings * 84)}px)`;
      else
        stateObject.transTopStyle.transform = `translateY(${280 + (numMonth * 19) + 53 + (numSavings * 84)}px)`;

      if (monthOpen && savOpen)
        stateObject.transTopStyle.transform = `translateY(${280 + (numMonth * 19)}px)`;
      if (!monthOpen && savOpen)
        stateObject.transTopStyle.transform = "translateY(0)";
    }

    return stateObject;
  }

}