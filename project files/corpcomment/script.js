// -- GLOBAL --
const MAX_CHARS = 150;

const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');
const submitBtnEl = document.querySelector('.submit-btn');

// COUNTER COMPONENT

const inputHandler = () => {
    // determine maximum number of characters
    const maxNrChars = MAX_CHARS;

    // determine number of characters the user has typed
    const nrCharsTyped = textareaEl.value.length;

    // claculate number of characters left (max - currently typed)
    const charsLeft = maxNrChars - nrCharsTyped;

    // Show numer of chars left
    counterEl.textContent = charsLeft;
};


textareaEl.addEventListener('input', inputHandler);



// FORM COMPONENT

const showVisualIndicator = textCheck => {
    const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid';
    // show valid indicator (green outline)
    formEl.classList.add(className);
        
    // remove the visual indicator
    setTimeout(() => {
        formEl.classList.remove(className)
    }, 2000);
};

const submitHandler = event => {
    //prevent default browser action (submitting form data to the 'action' address and loading a new page)
    event.preventDefault();

    // get text from the text area
    const text = textareaEl.value;
    
    // validate test (eg check if hashtag is present and text is long enough)
    if (text.includes('#') && (text.length > 4)) {
        showVisualIndicator('valid');
    } else {
        showVisualIndicator('invalid');

    // focus the text area again
    textareaEl.focus();
    
    // stop this function executing if the form is invalid
    return;
}

    // we have text that is valid, now extract other info from that text
    const hashtag = text.split(' ').find(word => word.includes('#'));
    // const hashtag = text.split(' ');
    // const company;
    const company = hashtag.substring(1);
    // const badgeLetter;
    const badgeLetter = company.substring(0, 1).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;

    // new feedback item HTML
    const feedbackItemHTML = `
        <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${company}</p>
                <p class="feedback__text">${text}</p>
            </div>
            <p class="feedback__date">${daysAgo === 0 ? 'NEW' : `${daysAgo}d`}</p>
        </li>
    `;

    // Insert new feedback item into list
    feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);

    // clear the text area
    textareaEl.value = '';

    // blur the submit button
    submitBtnEl.blur();
    // reset the counter
    counterEl.textContent = MAX_CHARS;
    
    //test the submit and get information about the event in the console (NOT IN COURSE CODE)
    console.log(text);
    console.log(1);
    console.log(event);
    console.log(company);
    console.log(badgeLetter);
};

formEl.addEventListener('submit', submitHandler);