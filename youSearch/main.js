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
	var q = $("#query").val();

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
			}
	);
}