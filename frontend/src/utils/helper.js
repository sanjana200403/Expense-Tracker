export const addThousandSeparator = (num) => {
    if (num === null || num === undefined || isNaN(num)) {
      return "";
    }
  
    const [integerPart, fractionalPart] = num.toString().split(".");
  
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
  };
  export const prepareExpenseBarCharData =(data=[])=>{
    const chartData = data.map((item)=>({
        category:item?.category,
        amount: item?.amount
    }))
    return chartData
  }
  export const prareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  
    // Example: Aggregate income by date for charting purposes
    const chartData = sortedData.map(item => ({
      date: new Date(item.date).toLocaleDateString(), // format date as needed
      amount: item.amount, // or whatever property you want to chart
    }));
  
    return chartData;
  };