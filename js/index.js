$(document).ready(function () {

    // attempt to populate list on document ready
    // no localStorage item doesn't display any url links
    populateList(loadLocalStorage());

    // event handler for form submit
    $("body").on("submit", "#link-form", function (e) {
        e.preventDefault();
        submit();
    }).on("click", "#page-numbers a", function (e) { // event handler for page navigation buttons 
        e.preventDefault();
        let target = this;
        if(target.name != 'prev' && target.name != 'next'){
            $('#page-numbers a').removeClass('selected');
            $(target).addClass('selected');
        }
        togglePages(target.name);
    });

});

// creates local storage if item "list" not present
// gets "list" item
const loadLocalStorage = () => {

    let localStorage = window.localStorage.getItem('list'),
        loadedStorage = JSON.parse(localStorage);

    if (loadedStorage == null || loadedStorage == 'undefined') {
        loadedStorage = {
            items: []
        };
    }

    return loadedStorage;
}


// poplates list on page load if "list" local storage item exists
const populateList = list => {

    const container = $(".paginated-container"),
        itemPerPageLimit = 20;
    let itemCounter = 0,
        pageNum = 0;

    list.items.forEach((element, index) => {
        // prev button appended first
        if (index == 0) { 
            container.find('#page-numbers').append('<a id="page-button-prev" target="_self" href="" name="prev"><</a>');
        } 
        // ul element "page" and page buttons created per every 20 items
        if (index == itemCounter) {
            pageNum++;
            container.append('<ul id="page-' + pageNum + '" class="link-list"></ul>');
            container.find('#page-numbers').append('<a id="page-button-' + pageNum + '" target="_self" href="" name=' + pageNum + ' >' + pageNum + '</a>');
            itemCounter += itemPerPageLimit;
        }
        // next button appended last
        if (index == (list.items.length-1)) { // next button
            container.find('#page-numbers').append('<a id="page-button-next" target="_self" href="" name="next">></a>');
        }
        // li elements for pages with links
        $(".paginated-container #page-" + pageNum).append('<li><div class="col1">' + index + '</div><div class="col8"><a target="_blank" href="' + element.url + '">' + element.url + '</a></div><div class="col3"><button class="col6" onClick="editItem(\'' + element.url + '\')">Edit</button><button class="col6" onClick="removeItem(\'' + element.url + '\')">Delete</button></div></li>');
    });
    // toggles first page by default
    togglePages(1);
}


// toggles which pages display per button click
const togglePages = num => {
    let selected = $('#page-numbers a.selected');
    // prev button functionality. Goes back 1 page if current page >1
    if (num == 'prev') {
        num = parseInt(selected.attr("name"));
        if (num > 1) {
            $('#page-numbers a').removeClass('selected');
            $('#page-numbers #page-button-' + (num - 1)).addClass('selected');
            $(".paginated-container ul").removeClass("show selected").addClass("hidden");
            $(".paginated-container #page-" + (num - 1)).removeClass("hidden").addClass("show selected");
        }
    } else if (num == 'next') { // next button functionality. Goes forward 1 page if current page > max
        num = parseInt(selected.attr("name"));
        if ($("#page-button-" + (num + 1)).length != 0) {
            $('#page-numbers a').removeClass('selected');
            $('#page-numbers #page-button-' + (num + 1)).addClass('selected');
            $(".paginated-container ul").removeClass("show selected").addClass("hidden");
            $(".paginated-container #page-" + (num + 1)).removeClass("hidden").addClass("show selected");
        }
    } else {
        $('#page-numbers a').removeClass('selected');
        $('#page-numbers #page-button-' + num).addClass('selected');
        $(".paginated-container ul").removeClass("show selected").addClass("hidden");
        $(".paginated-container #page-" + num).removeClass("hidden").addClass("show selected");
    }

}

// prompts use to edit select item. 
// Item is validated before submission + page reload
const editItem = url => {
    let list = loadLocalStorage();
    list.items.forEach((element, index) => {
        if (element.url == url) {
            let editPrompt = prompt("Edit this item", url);
            if (editPrompt == null) {} else {
                submit(editPrompt, index);
            }
        }
    });
}


// removes item from list
const removeItem = url => {
    let list = loadLocalStorage(),
        loadedStorage = loadLocalStorage();

    loadedStorage.items.forEach((element, index) => {
        if (element.url == url) {
            list.items.splice(index, 1);
        }
    });
    saveLocalStorage(list, true);
}

// saves entire list including edits, removal and new entries
const saveLocalStorage = (newList, edited, lastSubmission) => {
    window.localStorage.setItem('list', JSON.stringify(newList));
    if (edited) {
        location.reload()
    } else if (!edited) {
        window.localStorage.setItem('lastSubmission', JSON.stringify(lastSubmission));
        window.location = "./results.html";
    }
}

// submit function called when submiting new or editing existing urls
const submit = (url, index) => {
    let editCheck = false,
        lastSubmission, loadedStorage = loadLocalStorage();
    typeof url == 'undefined' ? url = document.getElementById("link-address").value : editCheck = true;

    // promise to wait for ajax response
    validate(url).then(() => {
        if (editCheck) { // overwriting existing url
            loadedStorage.items[index].url = url;
            console.log("The url has been changed!");
        } else { // adding new url
            loadedStorage.items.push({
                "url": url
            });
            // last submission for results page display
            lastSubmission = {
                "url": url
            };
        }
        // successful submission saved
        saveLocalStorage(loadedStorage, editCheck, lastSubmission);
    }).catch(reason => {
        // failed validation message
        alert(reason);
    });
}


// validation using regex to check for valid url format "http://www.example.com"
// ajax request to check whether page exists
const validate = newUrl => {

    const pattern = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    let loadedStorage = loadLocalStorage(), request;

    return new Promise((resolve, reject) => {

        // adds https:// to url string if www. present
        if(newUrl.substring(0,4) == "www."){
            newUrl = "https://" + newUrl
        }

        if (pattern.test(newUrl)) { // regex validation of url

            loadedStorage.items.forEach((element, index) => { // checks for duplicates
                if (element.url == newUrl) {
                    reject("Link already exists");
                }
            });

            // let request;

            if (window.XMLHttpRequest)
                request = new XMLHttpRequest();
            else
                request = new ActiveXObject("Microsoft.XMLHTTP");
            request.open('GET', newUrl, true);
            request.withCredentials = "true";
            request.onreadystatechange = () => { // CORS prevents non same domain website access
                if (request.readyState === 4) {
                    console.log(request.status);
                    if (request.status == 404) { // rejects url if status not found
                        reject("The url '" + newUrl + "' status is " + request.status + ". Invalid.");
                    } else {
                        resolve(true);
                    }
                }
            };
            request.send();
        } else {
            // reject url if regex test fails
            reject("The url '" + newUrl + "' is invalid.");
        }
    });
}


// populates list with facebook links for convenience
const quickPopulate = () => {
    let arr = {
        "items": []
    };

    for (let i = 0; i < 500; i++) {
        arr.items[i] = {
            "url": "https://www.facebook.com/" + (i + 1)
        };
    }
    window.localStorage.setItem("list", JSON.stringify(arr));
    location.reload();
}

// removes all entries including local storage item "list"
const clearAll = () => {
    window.localStorage.removeItem("list");
    location.reload();
}