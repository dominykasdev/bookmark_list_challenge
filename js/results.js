$(document).ready(() => {

    // results page loads lastSubmission item and renders DOM
    const lastSubmission = window.localStorage.getItem('lastSubmission');
    let result = JSON.parse(lastSubmission);

    //checks page if in results page before alert
    if (window.location.pathname.includes("/results.html")) {
        alert("Thank you for submitting your bookmark!");
    }

    $('#results').append('<li><div class="col12"><a target="_blank" href="' + result.url + '">' + result.url + '</a></div></li>');

});