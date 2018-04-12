const YouTube_Search_URL = 'https://www.googleapis.com/youtube/v3/search';


function getDataYouTubeApi(searchTerm, callback){
	const query = {
		part: 'snippet',
		key: 'AIzaSyB5ILOkqbgUizikrpFI-Z6lQSE1aB6FZP4',
		q: searchTerm,
		maxResults: 4,
		//order: 'viewCount',
	}
	$.getJSON(YouTube_Search_URL, query, callback)
}


function displayYouTubeSearchData(data) {
	console.log(data)
	const resultsArray = data.items.map((item, index) => `<ul>
  	<li class="thumbnail">${item.snippet.title}"</li><br>
  	<img src='${item.snippet.thumbnails.medium.url}'>
  	<div id="player-${index}"></div>
  	</ul>`);
  	$('.results').html(resultsArray);
}




function submitSearch() {
	$(".js-search-bar").submit(function(event) {
		event.preventDefault();
		const query = $('.js-search-query').val();
		$('.js-search-query').val('');
		getDataYouTubeApi(query, displayYouTubeSearchData);
	});
}


// 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player-0', {
          height: '390',
          width: '640',
          //I'm not sure what value to put for the videoID
          videoId: 'searchTerm',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }









$(submitSearch)