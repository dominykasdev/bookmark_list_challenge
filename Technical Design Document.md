#Bookmark List Challenge

##Author

Dominykas Genys

##Description/Functionality 

This web app was created for the purpose of saving working links through a form and displaying it on screen in a list. Items are saved locally and do not need an external database. Each item can be removed or edited to change the url. The list is paginated to only display up to 20 links at a time.

##Technology

*HTML
*CSS
*JavaScript (Es6)
*JQuery

##Dependencies

*Jquery CDN -  [jquery-3.4.1.min.js](https://code.jquery.com/jquery-3.4.1.min.js)
##User Interface
The form contains a single 

##Limitations

*The currently implemented Ajax call to validate a submitted url only works on the hosted domain (https://dominykas.dev). All other domains are blocked by cross domain policy (CORS). The request considers it a success as the request.status results in 0 and  not 404.

*After editing/deleting, the page refreshes. This loses the page that the user was last on. 

*Populate table button does not go through the validation process. Although the links are valid, the list can contain otherwise invalid urls.

*All links are held within local storage, links only available to browser instance.

*Not supported in I.E. due to es6 JavaScript used.

##Improvements

*Using a back end language to validate submitted web page availability properly.

*Ability to sort list using additional information about a link (name, last date accessed).

*Search for particular domains or other attributes.

*After updating an item, the page shouldn't need to refresh. Last updated item could be highlighted temporarily.

*Ability to change the number of items displayed per page. Drop down option.
