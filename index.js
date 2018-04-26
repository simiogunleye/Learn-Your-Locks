// YouTube search endpoint
const YouTube_Search_URL = 'https://www.googleapis.com/youtube/v3/search';

var url = "";
var query = "";

// request data from youtube api

function getDataYouTubeApi(searchTerm, callback){
	const query = {
		part: 'snippet',
		key: 'AIzaSyB5ILOkqbgUizikrpFI-Z6lQSE1aB6FZP4',
		q: searchTerm,
		maxResults: 4,
	}
	$.getJSON(YouTube_Search_URL, query, callback)

}

// display youtube data from the api

function displayYouTubeSearchData(data) {
	const resultsArray = data.items.map((item, index) => 
    `<ul>
  	<li class="thumbnail">${item.snippet.title}"<br><br>  	
  	<iframe title="${item.snippet.title}" width="420" height="315"
	  src="https://www.youtube.com/embed/${item.id.videoId}">
	  </iframe></li>
  	</ul>`);
  	$('.youtube-results').html(resultsArray);
}

// event handler to to handle the search for youtube and ebay

function submitSearch() {
	$(".js-search-bar").submit(function(event) {

		event.preventDefault();
		 query = $('.js-search-query').val();
		//$('.js-search-query').val('');
    $('.description').hide()
		getDataYouTubeApi(query, displayYouTubeSearchData);
// Construct the request for ebay finding api with production key

 url = "https://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsByKeywords";
    url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=SImisolu-learnyou-PRD-8786e9946-4a82e600";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&callback=_cb_findItemsByKeywords";
    url += "&REST-PAYLOAD";
    url += `&keywords=${query}`;
    url += "&paginationInput.entriesPerPage=10";
// Submit the request     
	s=document.createElement('script'); // create script element
	s.src= url;
	document.body.appendChild(s);

	});
}

// Parse the response from ebay finding api and build an HTML table to display ebay search results
function _cb_findItemsByKeywords(root) {
 
 var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
  var html = [];
  html.push('<table width="100%" border="0" cellspacing="25" cellpadding="3"><tbody>');
  for (var i = 0; i < items.length; ++i) {
    var item     = items[i];
    var title    = item.title;
    var pic      = item.galleryURL;
    var viewitem = item.viewItemURL;
    if (null != title && null != viewitem) {
      html.push('<tr><td>' + '<img src="' + pic + '" border="3" alt="'+ title +'"">' + '</td>' +
      '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td></tr>');
    }
  }
  html.push('</tbody></table>');
  document.getElementById("results").innerHTML = html.join("");
}  



$(submitSearch);