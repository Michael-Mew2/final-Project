const getTimeRanges = () => {
    const now = new Date();
  
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
  
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay());
  
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
    const startOfYear = new Date(now.getFullYear(), 0, 1);
  
    return {
      today: startOfToday,
      thisWeek: startOfWeek,
      thisMonth: startOfMonth,
      thisYear: startOfYear,
    };
  };

export default getTimeRanges;