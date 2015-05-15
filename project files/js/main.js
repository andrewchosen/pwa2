/*  
	RE{FACTOR}
	Author: Andrew Lancaster
	Date: 5/7/2015
*/

(function($){
	
	// Tooltip
	$(".masterTooltip").hover(function(){ //add hover event to .masterTooltip
		var title = $(this).attr("title"); //store title attribute in variable
		$(this).data("tipText", title).removeAttr("title"); //store title variable value into data, remove title attribute
		$("<p class='tooltip'></p>") //create tooltip html
		.text(title) //add text from title variable
		.appendTo('body') //add it to the end of body html
		.fadeIn('fast'); //animate display
	}, function() {
		$(this).attr("title", $(this).data('tipText')); //replace title attribute with data-tipText
		$(".tooltip").remove(); //remove .tooltip html
	}).mousemove(function(e) {
		var mouseX = e.pageX + 20; //X coords
		var mouseY = e.pageY + 10; //Y coords
		$(".tooltip")
		.css({ top: mouseY, left: mouseX }) //make tooltip follow mouse coordinates
	});
	
	// Accordian
	$(".tab-panels > li").hide().eq(0).show(); //show first tab
	$(".tab-panels > li:not(:first)").hide(); //hide all but first tab

	$(".tabs li").click(function(e) {
		e.preventDefault(); //prevent "#" to keep from scrolling to top of page
		$(".tab-panels > li").hide(); //hide tab panels
		$(".tabs .active").removeClass("active"); //remove active tab class
		$(this).addClass("active"); //add active class to show selected tab
		var clicked = $(this).find("a:first").attr("href"); //store tab link into "clicked" variable
		$(".tab-panels " + clicked).fadeIn(100); //show select tab
	}).eq(0).addClass("active"); //add "active" class to tab

	// Modal
	$(".modalClick").on("click", function(event){ //begin click event for .modalClick element
		event.preventDefault(); //prevent default link event
		$("#overlay") //grab #overlay id
			.fadeIn() //show
			.find("#modal") //grab #mobal id within #overlay
			.fadeIn(); //show
	});

	$(".close").on("click", function(event){ //begin click event for .close element
		event.preventDefault(); //prevent default link event
		$("#overlay") //grab #overlay id
			.fadeOut() //hide
			.find("#modal") //find #modal id within #overlay
			.fadeOut(); //hide
	});

		// Status Fade
	$(".myStatus + label").mouseover(function(){
		$(this).fadeTo(100, .3);
	});

	$(".myStatus + label").mouseout(function(){
		$(this).fadeTo(100, 1);
	});
	
})(jQuery); // end private scope




