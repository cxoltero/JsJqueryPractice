// searchbar Handler
$(function(){
	var searchField = $("#query");
	var icon = $("#search-btn");

	// Focus event handler
	$(searchField).on('focus', function(){
		$(this).animate({
			width: '90%'
		}, 400);
		$(icon).animate({
			right: '10px'
		}, 400);
	});

		// Blur event handler
	$(searchField).on('blur', function(){
		if(searchField.val() === ""){
			$("searchField").animate({
				width: '45%'
			}, 400), function(){};
			$("icon").animate({
				right: '360px'
			}, 400), function(){};
		}
	});

	$('#search-form').submit(function(e){
		e.preventDefault();
	});
	
});
// create the search function
var search = function(){
	// clear results
	$('#results').html('');
	$('#buttons').html('');

	// get form input
	q = $("#query").val();

	// creat a get request for youtube
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: 'snippet, id',
			q: q,
			type: 'video',
			key: 'AIzaSyAX9eJzUXTP6OVeK1HJ6VRr7gD1GLf3b3M'},
			function(data){
				var nextPageToken = data.nextPageToken;
				var previousPageToken = data.previousPageToken;

				console.log(data);
				$.each(data.items, function(i, item){
					// Get output
					var output = getOutput(item);

					// Display Results
					$('#results').append(output);
				});

				var buttons = getButtons(previousPageToken, nextPageToken);

				// display buttons

				$("#buttons").append(buttons);
			}
	);
}

var getOutput = function(item){
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;

	// build outpu string;
	var output = '<li>' + 
			   	 '<div class="list-left">' +
			   	 '<img src="' + thumb +'">' + 
			   	 '</div>' + 
			   	 '<div class="list-right">' + 
			   	 '<h3>' + title + '</h3>' +
			   	 '<small>By<span class="cTitle"'+ channelTitle + '</span> on ' + videoDate + '</small>' +
			   	 '<p>' + description + '</p>'+
			   	 '</div>'+'</li>'+
				  '<div class= "clearfix"></div>'+
				  '';
	
	return output;
}

// build the next and prev buttons
var getButtons = function(previousPageToken, nextPageToken){
	if(previousPageToken){
		var btnOutput = '<div class="btn-container">'+
						'<button id="next-button" class="paging-button" data-token="'+ nextPageToken +'" data-query="'+ q +'"'+
						'onclick="nextPage();">Next Page</button></div>';
	}else{
		var btnOutput = '<div class="btn-container"'+
						'<button id="previous-button" class="paging-button" data-token="'+ previousPageToken +'" data-query="'+ q +'"'+
						'onclick="prevPage();">Prev Page</button>'+
						'<button id="next-button" class="paging-button" data-token="'+ nextPageToken +'" data-query="'+ q +'"'+
						'onclick="nextPage();">Next Page</button></div>';
	}

	return btnOutput;
}