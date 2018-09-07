import dateFns from "date-fns";
import Money from "money-math";

export const Tables = {
  processColumns: function (nameObject, expenseType) {
    const { shelter, util1, util2, util3, util4, util5, car, insurance, cc1, cc2, cc3, cc4, cc5, cc6, other1, other2, other3, savings1, savings2, savings3 } = nameObject;
    const columns = [
      {
        Header: "Date",
        accessor: "addDate",
        maxWidth: 80,
        Cell: row => {
          if (dateFns.format(row.value * 1000, "MMM YYYY") === "Invalid Date")
            return "Averages"
          else
            return dateFns.format(row.value * 1000, "MMM YYYY")
        }
      }
    ];
    switch (expenseType) {
      case 'bills':
        const billColumns = [];
        if (shelter) billColumns.push({ Header: shelter, accessor: "shelter" });
        if (util1) billColumns.push({ Header: util1, accessor: "util1" });
        if (util2) billColumns.push({ Header: util2, accessor: "util2" });
        if (util3) billColumns.push({ Header: util3, accessor: "util3" });
        if (util4) billColumns.push({ Header: util4, accessor: "util4" });
        if (util5) billColumns.push({ Header: util5, accessor: "util5" });
        if (car) billColumns.push({ Header: car, accessor: "car" });
        if (insurance) billColumns.push({ Header: insurance, accessor: "insurance" });
        if (other1) billColumns.push({ Header: other1, accessor: "other1" });
        if (other2) billColumns.push({ Header: other2, accessor: "other2" });
        if (other3) billColumns.push({ Header: other3, accessor: "other3" });
        columns.push({ Header: "Monthly Bills", columns: billColumns });
        break;
      case 'otherExpenses':
        const savColumns = []
        const ccColumns = []
        if (savings1) savColumns.push({ Header: savings1, accessor: "savings1" });
        if (savings2) savColumns.push({ Header: savings2, accessor: "savings2" });
        if (savings3) savColumns.push({ Header: savings3, accessor: "savings3" });
        columns.push({ Header: "Savings Deposits", columns: savColumns });
        if (cc1) ccColumns.push({ Header: cc1, accessor: "cc1" });
        if (cc2) ccColumns.push({ Header: cc2, accessor: "cc2" });
        if (cc3) ccColumns.push({ Header: cc3, accessor: "cc3" });
        if (cc4) ccColumns.push({ Header: cc4, accessor: "cc4" });
        if (cc5) ccColumns.push({ Header: cc5, accessor: "cc5" });
        if (cc6) ccColumns.push({ Header: cc6, accessor: "cc6" });
        columns.push({ Header: "CC Payments", columns: ccColumns });
        break;
      case 'ccSpend':
        const ccSpendColumns = []
        if (cc1) ccSpendColumns.push({ Header: cc1, accessor: "cc1" });
        if (cc2) ccSpendColumns.push({ Header: cc2, accessor: "cc2" });
        if (cc3) ccSpendColumns.push({ Header: cc3, accessor: "cc3" });
        if (cc4) ccSpendColumns.push({ Header: cc4, accessor: "cc4" });
        if (cc5) ccSpendColumns.push({ Header: cc5, accessor: "cc5" });
        if (cc6) ccSpendColumns.push({ Header: cc6, accessor: "cc6" });
        columns.push({ Header: "CC Spending by Month", columns: ccSpendColumns });
        break;
      default:
        console.log("No Expenses Match!");
    }
    return columns;
  },

  processAverages: function (dataObj, dataArr) {
    const { shelter, util1, util2, util3, util4, util5, car, insurance, cc1, cc2, cc3, cc4, cc5, cc6, detail1, detail2, detail3, detail4, detail5, other1, other2, other3, savings1, savings2, savings3 } = dataObj;
    const avgObj = {};
    const returnArray = dataArr;
    const divisor = returnArray.length;

    let newshelter = "0.00";
    let newutil1 = "0.00";
    let newutil2 = "0.00";
    let newutil3 = "0.00";
    let newutil4 = "0.00";
    let newutil5 = "0.00";
    let newcar = "0.00";
    let newcc1 = "0.00";
    let newcc2 = "0.00";
    let newcc3 = "0.00";
    let newcc4 = "0.00";
    let newcc5 = "0.00";
    let newcc6 = "0.00";
    let newdetail1 = "0.00";
    let newdetail2 = "0.00";
    let newdetail3 = "0.00";
    let newdetail4 = "0.00";
    let newdetail5 = "0.00";
    let newinsurance = "0.00";
    let newother1 = "0.00";
    let newother2 = "0.00";
    let newother3 = "0.00";
    let newsavings1 = "0.00";
    let newsavings2 = "0.00";
    let newsavings3 = "0.00";

    const averagingFunction = function (array, newItem, obj, field) {
      array.forEach(each => {
        newItem = Money.add(
          newItem,
          parseFloat(each[field]).toFixed(2).toString()
        )
      });
      obj[field] = Money.div(
        parseFloat(newItem).toFixed(2).toString(),
        parseFloat(divisor).toFixed(2).toString()
      );
    }
    if (shelter) averagingFunction(returnArray, newshelter, avgObj, 'shelter');
    if (util1) averagingFunction(returnArray, newutil1, avgObj, 'util1');
    if (util2) averagingFunction(returnArray, newutil2, avgObj, 'util2');
    if (util3) averagingFunction(returnArray, newutil3, avgObj, 'util3');
    if (util4) averagingFunction(returnArray, newutil4, avgObj, 'util4');
    if (util5) averagingFunction(returnArray, newutil5, avgObj, 'util5');
    if (car) averagingFunction(returnArray, newcar, avgObj, 'car');
    if (insurance) averagingFunction(returnArray, newinsurance, avgObj, 'insurance');
    if (cc1) averagingFunction(returnArray, newcc1, avgObj, 'cc1');
    if (cc2) averagingFunction(returnArray, newcc2, avgObj, 'cc2');
    if (cc3) averagingFunction(returnArray, newcc3, avgObj, 'cc3');
    if (cc4) averagingFunction(returnArray, newcc4, avgObj, 'cc4');
    if (cc5) averagingFunction(returnArray, newcc5, avgObj, 'cc5');
    if (cc6) averagingFunction(returnArray, newcc6, avgObj, 'cc6');
    if (detail1) averagingFunction(returnArray, newdetail1, avgObj, 'detail1');
    if (detail2) averagingFunction(returnArray, newdetail2, avgObj, 'detail2');
    if (detail3) averagingFunction(returnArray, newdetail3, avgObj, 'detail3');
    if (detail4) averagingFunction(returnArray, newdetail4, avgObj, 'detail4');
    if (detail5) averagingFunction(returnArray, newdetail5, avgObj, 'detail5');
    if (other1) averagingFunction(returnArray, newother1, avgObj, 'other1');
    if (other2) averagingFunction(returnArray, newother2, avgObj, 'other2');
    if (other3) averagingFunction(returnArray, newother3, avgObj, 'other3');
    if (savings1) averagingFunction(returnArray, newsavings1, avgObj, 'savings1');
    if (savings2) averagingFunction(returnArray, newsavings2, avgObj, 'savings2');
    if (savings3) averagingFunction(returnArray, newsavings3, avgObj, 'savings3');

    returnArray.unshift(avgObj);
    return returnArray;
  }


}