document.querySelector('form').addEventListener('submit', (e) => {
    // Show loader
    document.getElementById('loading').style.display = 'block';
    // showing results after 5 seconds
    setTimeout(calcResults, 1000);
    e.preventDefault();
});

let calcResults = () => {
    // input variables
    const inputAmount = document.getElementById('amount');
    const inputIntrest = document.getElementById('intrest');
    const inputYears = document.getElementById('years');

    // display variables
    let monthlyPayment = document.getElementById('monthly-payment');
    let totalPayment = document.getElementById('total-payment');
    let totalInterest = document.getElementById('total-interest');

    // calculation varaibles
    const principle = parseFloat(inputAmount.value);
    const calculatedIntrest = parseFloat(inputIntrest.value) / 100 / 12;
    const calculatedPayment = parseFloat(inputYears.value) * 12;

    // calculating monthly intrest
    const x = Math.pow(1 + calculatedIntrest, calculatedPayment);
    const monthly = (principle * x * calculatedIntrest) / (x - 1);

    // checking whether the returned value of monthly is finite or not
    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principle).toFixed(2);
        // clearning input fields
        inputAmount.value = '';
        inputIntrest.value = '';
        inputYears.value = '';
        // show results
        document.getElementById('results').style.display = 'block';
        // hide loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Kindly chek your input!');
    }
}

let showError = (error) => {
    // hide loader
    document.getElementById('loading').style.display = 'none';
    let newError = document.createElement('div');
    newError.className = 'alert alert-danger anime text-center';
    newError.textContent = error;
    let errParent = document.getElementById('showerror');
    errParent.appendChild(newError);
    setTimeout(removeError, 3000);
}

let removeError = () => {
    document.querySelector('.alert-danger').remove();
}