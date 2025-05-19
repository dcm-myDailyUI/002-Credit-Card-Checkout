document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('paymentForm');
    const cardNumber = document.getElementById('cardNumber');
    const cardHolder = document.getElementById('cardHolder');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCVC = document.getElementById('cardCVC');
    
    // Input elements
    const nameInput = document.getElementById('cardholderName');
    const numberInput = document.getElementById('cardNumberInput');
    const expiryInput = document.getElementById('expiryDate');
    const cvcInput = document.getElementById('cvc');

    // Card type patterns
    const cardPatterns = {
        visa: /^4/,
        mastercard: /^5[1-5]/,
        amex: /^3[47]/
    };

    // Function to detect card type
    function detectCardType(number) {
        const plainNumber = number.replace(/\D/g, '');
        if (cardPatterns.visa.test(plainNumber)) return 'visa';
        if (cardPatterns.mastercard.test(plainNumber)) return 'mastercard';
        if (cardPatterns.amex.test(plainNumber)) return 'amex';
        return null;
    }

    // Function to update card logo
    function updateCardLogo(type) {
        const cardLogo = document.getElementById('cardLogo');
        if (type) {
            // Adjust width for Amex to be wider than other card types
            const width = type === 'amex' ? 'w-40' : 'w-32';
            cardLogo.className = `fab text-white text-6xl opacity-90 transition-all duration-300 ${width} text-right fa-cc-${type}`;
        } else {
            cardLogo.className = 'fab text-white text-6xl opacity-0 transition-all duration-300 w-32 text-right';
        }
        
        // Update form icons
        document.querySelectorAll('.card-type-icon').forEach(icon => {
            if (type) {
                icon.classList.toggle('text-gray-400', !icon.classList.contains(`fa-cc-${type}`));
                icon.classList.toggle('text-indigo-500', icon.classList.contains(`fa-cc-${type}`));
            } else {
                icon.classList.remove('text-indigo-500');
                icon.classList.add('text-gray-400');
            }
        });
    }

    // Format card number with spaces
    numberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        value = value.replace(/\D/g, '');
        
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        e.target.value = formattedValue;
        cardNumber.textContent = formattedValue || '•••• •••• •••• ••••';
        
        // Detect and update card type
        const cardType = detectCardType(formattedValue);
        updateCardLogo(cardType);
    });

    // Update card holder name
    nameInput.addEventListener('input', function(e) {
        cardHolder.textContent = e.target.value.toUpperCase() || 'JOHN DOE';
    });

    // Format expiry date
    expiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        
        e.target.value = value;
        cardExpiry.textContent = value || 'MM/YY';
    });

    // Update CVC
    cvcInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value;
        cardCVC.textContent = value || '•••';
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add your payment processing logic here
        alert('Payment processing would happen here!');
    });
});
