#Bookmark List Challenge

##Author

Dominykas Genys

##Description

This web app was created for the purpose of saving working links through a form and displaying it on screen in a list. Items are saved locally and do not need an external database. Each item can be removed or edited to change the url. The list is paginated to only display up to 20 links at a time.

The app was unit tested by the author as part of the development process.

The JavaScript was put through the Google Closure Compiler.

##Functionality 

A single text input and input button is used to submit a new entry.

A new entry processed through a series of loops to weed out entries with duplicates, regex check to confirm it's a viable url and an Ajax call to verify if the link does not return a 404 error page.

The valid entry is saved to local storage as part of a string in JSON array. Last submitted link is saved separately to be displayed on the results page.

If link invalid the user is informed via alerts.

After a successful submission the user is taken to the results page and greeted with a message and their last submission on display.

Once there are enough entries (above 20), pagination divides the entries into lists of 20 per page. The user can switch between pages by using the numbers above the list or the arrows on either side of the page numbers.

The populate "Create 500 entries" button allows a user to quickly add many entries, saving time.

"Clear all" button is there to remove all entries instantly. Also for convenience.

##Technology

* HTML
* CSS
* JavaScript (Es6)
* JQuery

##Dependencies

* Jquery CDN -  [jquery-3.4.1.min.js](https://code.jquery.com/jquery-3.4.1.min.js)
##User Interface
The form contains a single 

##Limitations

* The currently implemented Ajax call to validate a submitted url only works on the hosted domain (https://dominykas.dev). All other domains are blocked by cross domain policy (CORS). The request considers it a success as the request.status results in 0 and  not 404.

* After editing/deleting, the page refreshes. This loses the page that the user was last on. 

* Populate table button does not go through the validation process. Although the links are valid, the list can contain otherwise invalid urls.

* All links are held within local storage, links only available to browser memory.

* Local storage has a limit of 10mbs. Therefore there is a limit in amount of entries that can be saved.

* Not supported in I.E. due to es6 JavaScript used.

##Improvements

* Using a back end language to validate submitted web page availability properly.

* Ability to sort list using additional information about a link (name, last date accessed).

* Search for particular domains or other attributes.

* After updating an item, the page shouldn't need to refresh. Last updated item could be highlighted temporarily.

* Ability to change the number of items displayed per page. Drop down option.