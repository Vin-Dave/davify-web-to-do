export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const calculateDaysLeft = (deadlineTimestamp) => {
  const currentDate = new Date();
  const deadlineDate = new Date(deadlineTimestamp);

  const timeDifference = deadlineDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
  console.log(daysLeft);
  return daysLeft;
};
