$(document).ready(function(){
	// set Options
	var speed = 500;  // Speed for fadding the image in caruosel	
	var autoswitch = true; //auto slider options
	var autoswitch_speed = 3000; // Speed of the transitions in carousell

// add class of active to the first picture
	$(".slide").first().addClass("active");


	// hide all slides
	$(".slide").hide();

	//show first slide
	$(".active").show();

	if(autoswitch === true){
		setInterval(function(){
					$(".active").removeClass("active").addClass("old_active");
		if($(".old_active").is(":last-child")){
			$(".slide").first().addClass("active");
		}else{
			$(".old_active").next().addClass("active");
		}
		$(".old_active").removeClass("old_active");
		$(".slide").fadeOut(speed);
		$(".active").fadeIn(speed);
		}, autoswitch_speed);
	}
	// this function switches to the previous slide
	var prevSlide = function(){
		$(".active").removeClass("active").addClass("old_active");
		if($(".old_active").is(":first-child")){
			$(".slide").last().addClass("active");
		}else{
			$(".old_active").prev().addClass("active");
		}
		$(".old_active").removeClass("old_active");
		$(".slide").fadeOut(speed);
		$(".active").fadeIn(speed);
	}


	// this function switches to the next slide
	var nextSlide = function(){
		$(".active").removeClass("active").addClass("old_active");
		if($(".old_active").is(":last-child")){
			$(".slide").first().addClass("active");
		}else{
			$(".old_active").next().addClass("active");
		}
		$(".old_active").removeClass("old_active");
		$(".slide").fadeOut(speed);
		$(".active").fadeIn(speed);
	}

	// add event handler for next arrow
	$("#next").click(nextSlide);

	// Add event handler for previous arrow
	$("#previous").click(prevSlide);
});