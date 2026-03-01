/**
 * loan-calculator.js
 * Handles the calculation of monthly payments, total interest, and total cost.
 */

document.getElementById('loan-form').addEventListener('submit', function(e) {
    // Prevent the form from refreshing the page
    e.preventDefault();

    // Get UI Elements
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    
    const monthlyPaymentUI = document.getElementById('monthly-payment');
    const totalPaymentUI = document.getElementById('total-payment');
    const totalInterestUI = document.getElementById('total-interest');
    const resultsDiv = document.getElementById('results');

    // Parse values
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        // Calculations
        const totalPayment = monthly * calculatedPayments;
        const totalInterest = totalPayment - principal;

        // Display results rounded to 2 decimal places
        monthlyPaymentUI.innerText = '$' + monthly.toFixed(2);
        totalPaymentUI.innerText = '$' + totalPayment.toFixed(2);
        totalInterestUI.innerText = '$' + totalInterest.toFixed(2);

        // Show the results area
        resultsDiv.style.display = 'block';
    } else {
        alert('Please check your numbers and ensure they are valid.');
    }
});
