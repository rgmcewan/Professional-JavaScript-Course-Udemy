import {
    BASE_API_URL,
    RESULTS_PER_PAGE,
    state,
    jobListSearchEl,
    jobDetailsContentEl,
    getData
} from '../common.js';

import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';

const renderJobList = () => {
    // remove previous job items
    jobListSearchEl.innerHTML = '';

    // display job items

    // render job items in the search job list
    state.searchJobItems.slice(state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE, state.currentPage * RESULTS_PER_PAGE).forEach(jobItem => {
        const newJobItemHTML = `
        <li class="job-item ${state.activeJobItem.id === jobItem.id ? 'job-item--active' : ''}">
                <a class="job-item__link" href="${jobItem.id}">
                    <div class="job-item__badge">${jobItem.badgeLetters}</div>
                    <div class="job-item__middle">
                        <h3 class="third-heading">${jobItem.title}</h3>
                        <p class="job-item__company">${jobItem.company}</p>
                        <div class="job-item__extras">
                            <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                        </div>
                    </div>
                    <div class="job-item__right">
                        <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                        <time class="job-item__time">${jobItem.daysAgo}d</time>
                    </div>
                </a>
            </li>
        `;
        jobListSearchEl.insertAdjacentHTML('beforeend', newJobItemHTML);

    });
};

// -- JOB LIST COMPONENT --
const clickHandler = async event => {
    // prevent default behavious (navigate)
    event.preventDefault();

    // get clicked job item element
    const jobItemEl = event.target.closest('.job-item');

    //remove active class from previously active job item
    //below is longer way to do it
    // document.querySelector('.job-item--active') && document.querySelector('.job-item--active').remove('.job-item--active');

    // cleaner way to do it
    document.querySelector('.job-item--active')?.classList.remove('job-item--active');

    // add active class
    jobItemEl.classList.add('job-item--active');

    // empty the job details section
    jobDetailsContentEl.innerHTML = '';

    // render a spinner
    renderSpinner('job-details');

    // get the id of the job item that was clicked
    const id = jobItemEl.children[0].getAttribute('href');

    // update state
    state.activeJobItem = state.searchJobItems.find(jobItem => jobItem.id === +id);

    // add id to URL                            // REMEMBER THIS ONE!
    history.pushState(null, '', `/#${id}`);

    // fetch job item data
    try {
        const data = await getData(`${BASE_API_URL}/jobs/${id}`);

        // extract job item
        const { jobItem } = data;

        // remove spinner
        renderSpinner('job-details');

        // render job details
        renderJobDetails(jobItem);
    } catch (error) {
        renderSpinner('job-details'),
            renderError(error.message);
    }

    // -- OLD SYNTAX --


    // fetch(`${BASE_API_URL}/jobss/${id}`)
    //     .then(response => {
    //         if (!response.ok) { // 4xx, 5xx status code
    //             throw new Error('Resource Issue (E.G. Resource doesn\'t exist or server issue');
    //             }

    //         return response.json();

    //     })
    //     .then(data => {
    //         // extract job item
    //         const { jobItem } = data;

    //         // remove spinner
    //         renderSpinner('job-details');

    //          // render job details
    //          renderJobDetails(jobItem);

    //  })
    //  .catch(error => { // network problem or other errors (e.g. trying to parse something not JSON as JSON)

    //     renderSpinner('job-details'),
    //     renderError(error.message);
    // });


};

jobListSearchEl.addEventListener('click', clickHandler);

export default renderJobList;