window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() { const initialValues = {
  amount: 10000,
  years: 5,
  rate: 3.5
};

document.getElementById("loan-amount").value = initialValues.amount;
document.getElementById("loan-years").value = initialValues.years;
document.getElementById("loan-rate").value = initialValues.rate;

update();
}

// Get the current values from the UI
// Update the monthly payment
function update() { const values = getCurrentUIValues();
  const monthlyPayment = calculateMonthlyPayment(values);
  updateMonthly(monthlyPayment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const { amount, years, rate } = values;
  const monthlyRate = rate / (12 * 100); // Convert annual rate to monthly rate
  const numberOfPayments = years * 12;
  
  const numerator = amount * monthlyRate;
  const denominator = 1 - Math.pow(1 + monthlyRate, -numberOfPayments);
  
  const monthlyPayment = numerator / denominator;
  return monthlyPayment.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById("monthly-payment").innerText = "$" + monthly;
}

