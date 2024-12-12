function selectDeliveryOption(element) {
    const options = document.querySelectorAll('.delivery-option');
    options.forEach(option => option.classList.remove('selected'));
    element.classList.add('selected');
}