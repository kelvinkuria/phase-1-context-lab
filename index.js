// Helper function to calculate hours between two timestamps
function calculateHours(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const milliseconds = end - start;
  return milliseconds / (1000 * 60 * 60);
}

// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// Function to create employee records from an array of arrays
function createEmployeeRecords(employeeArrays) {
  return employeeArrays.map(createEmployeeRecord);
}

// Function to create a time-in event
function createTimeInEvent(employee, timeStamp) {
  if (!timeStamp) {
    console.error("Invalid timeStamp provided:", timeStamp);
    return employee;
  }

  const [date, hour] = timeStamp.split(' ');

  if (!date || !hour) {
    console.error("Invalid date or hour in timeStamp:", timeStamp);
    return employee;
  }

  employee.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date,
  });
  return employee;
}

// Function to create a time-out event
function createTimeOutEvent(employee, timeStamp) {
  if (!timeStamp) {
    console.error("Invalid timeStamp provided:", timeStamp);
    return employee;
  }

  const [date, hour] = timeStamp.split(' ');

  if (!date || !hour) {
    console.error("Invalid date or hour in timeStamp:", timeStamp);
    return employee;
  }

  employee.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date,
  });
  return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(event => event.date === date);
  const timeOut = employee.timeOutEvents.find(event => event.date === date);
  return calculateHours(timeIn.hour, timeOut.hour);
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(date) {
  const hoursWorked = hoursWorkedOnDate(this, date);
  return hoursWorked * this.payPerHour;
}

// Provided allWagesFor function
const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  );

  return payable;
};

// Function to find an employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName);
}

// Function to calculate payroll for all employees
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((sum, employee) => sum + allWagesFor.call(employee), 0);
}






  

