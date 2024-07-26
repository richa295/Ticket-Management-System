// Ticket.html specific script
document.addEventListener('DOMContentLoaded', () => {
    const ticketForm = document.getElementById('ticketForm');
    ticketForm.addEventListener('change', calculateFare);
    ticketForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(ticketForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        const fare = calculateFare();
        formObject['fare'] = fare;

        const queryString = Object.keys(formObject)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formObject[key])}`)
            .join('&');

        window.location.href = `passengerDetails.html?${queryString}`;
    });

    function calculateFare() {
        const coachType = document.getElementById('coachType').value;
        let fare = 0;

        switch (coachType) {
            case 'AC':
                fare = 1000;
                break;
            case 'Sleeper':
                fare = 400;
                break;
            case '2S':
                fare = 240;
                break;
            default:
                fare = 0;
                break;
        }

        const fareDisplay = document.getElementById('fareDisplay');
        fareDisplay.textContent = `Fare: ${fare} (including GST)`;
        return fare;
    }
});

// PassengerDetails.html specific script
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const ticketData = Object.fromEntries(urlParams.entries());

    const passengerForm = document.getElementById('passengerForm');
    passengerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(passengerForm);
        const formObject = { ...ticketData };
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        const queryString = Object.keys(formObject)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formObject[key])}`)
            .join('&');

        window.location.href = `payment.html?${queryString}`;
    });
});

// Payment.html specific script
document.addEventListener('DOMContentLoaded', () => {
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const cardPaymentDiv = document.getElementById('cardPayment');
    const upiPaymentDiv = document.getElementById('upiPayment');

    paymentMethodSelect.addEventListener('change', () => {
        if (paymentMethodSelect.value === 'card') {
            cardPaymentDiv.style.display = 'block';
            upiPaymentDiv.style.display = 'none';
        } else if (paymentMethodSelect.value === 'upi') {
            cardPaymentDiv.style.display = 'none';
            upiPaymentDiv.style.display = 'block';
        } else {
            cardPaymentDiv.style.display = 'none';
            upiPaymentDiv.style.display = 'none';
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const bookingData = Object.fromEntries(urlParams.entries());

    const paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(paymentForm);
        const formObject = { ...bookingData };
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        const queryString = Object.keys(formObject)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formObject[key])}`)
            .join('&');

        window.location.href = `confirmation.html?${queryString}`;
    });
});

// Confirmation.html specific script
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookingData = Object.fromEntries(urlParams.entries());

    const confirmationMessage = `
        <strong>Thank you for your booking!</strong><br>
        Booking Details:<br>
        Coach Type: ${bookingData.coachType}<br>
        From: ${bookingData.fromLocation}<br>
        To: ${bookingData.toLocation}<br>
        Date: ${bookingData.bookingDate}<br>
        Passenger Name: ${bookingData.passengerName}<br>
        Passenger Age: ${bookingData.passengerAge}<br>
        Passenger Gender: ${bookingData.passengerGender}<br>
        Fare: ${bookingData.fare}<br>
    `;
    document.getElementById('confirmationMessage').innerHTML = confirmationMessage;

    const bookingHistory = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    bookingHistory.push(bookingData);
    localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));
});

function goHome() {
    window.location.href = 'index.html';
}
