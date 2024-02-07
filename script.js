// Function to generate a randomly ordered array of numbers from 0 to 9 without repeats
function getRandomArray() {
    let theArray = Array(10).fill(0).map((v, i) => { return i });
    for (let i = theArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = theArray[i];
        theArray[i] = theArray[j];
        theArray[j] = temp;
    }
    return theArray;
}

// Main function to set up the captcha program
function main() {
    const digitImagesContainer = document.getElementById('digit-images');
    const randomDigitsContainer = document.getElementById('random-digits');
    const messageContainer = document.getElementById('message');

    // Step 1: Generate and display hand-drawn digit images
    const handDrawnDigits = [];
    for (let i = 0; i < 10; i++) {
        const digitImage = new Image();
        digitImage.src = `./images/${i}.jpg`; // Updated path to hand-drawn digit images
        digitImage.classList.add('digit-image');
        digitImagesContainer.appendChild(digitImage);
        handDrawnDigits.push(digitImage);
    }

    // Step 2: Generate random digits and display them to the user
    const randomDigits = getRandomArray().slice(0, 3);
    randomDigits.forEach(digit => {
        const digitNode = document.createElement('div');
        digitNode.textContent = digit;
        digitNode.classList.add('random-digit');
        randomDigitsContainer.appendChild(digitNode);
    });

    let consecutiveCorrectClicks = 0;

    // Step 3: Add event listeners to hand-drawn digit images
    handDrawnDigits.forEach((digitImage, index) => {
        digitImage.addEventListener('click', () => {
            const clickedDigit = index;
            if (randomDigits.includes(clickedDigit)) {
                randomDigits.splice(randomDigits.indexOf(clickedDigit), 1);
                digitImage.classList.add('correct');
                consecutiveCorrectClicks++;

                // Check if all random digits have been selected consecutively
                if (consecutiveCorrectClicks === 3) {
                    messageContainer.textContent = 'Captcha Passed! You are not a robot.';
                }
            } else {
                digitImage.classList.add('wrong');
                // Display the failure message when a wrong image is clicked
                messageContainer.textContent = 'Captcha Failed! Please try again.';
                consecutiveCorrectClicks = 0; // Reset consecutive correct clicks
            }
        });
    });
}

// Call the main function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', main);
