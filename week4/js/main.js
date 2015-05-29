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

	// Login

	$("#signinButton").click(function(){
		var user = $("#user").val();
		var pass = $("#pass").val();
		$.ajax({
			url: "xhr/login.php",
			type: "post",
			dataType: "json",
			data: {
				username: user,
				password: pass
			},
			success:function(response){
				console.log("test user");
				if(response.error){
					alert(response.error);
				}else{
					window.location.assign("dashboard.html");
				};
			}
		});
	});

	// Logout

	$("#logOut").click(function(e){
		e.preventDefault();
		$.get("xhr/logout.php", function(){
			window.location.assign("index.html")
		})
	});

	// Register

	$("#register").on("click", function(){
		var firstname = $("#first").val(),
			lastname = $("#last").val(),
			username = $("#username").val(),
			email = $("#email").val(),
			password = $("#password").val();
			console.log(firstname + " " + lastname + " " + username + " " + email + " " + password);

			$.ajax({
				url: "xhr/register.php",
				type: "post",
				dataType: "json",
				data: {
					firstname: firstname,
					lastname: lastname,
					username: username,
					email: email,
					password: password
				},
				success: function(response){
					if(response.error){
						alert(response.error);
					}else{
						window.location.assign("dashboard.html");
					}
				}
			});
	});

	// Projects Button

	$(".projects-btn").on("click", function(e){
		e.preventDefault();
		window.location.assign("projects.html");
	});

	// Display user's name

	$.getJSON("xhr/check_login.php", function(data){
		console.log(data);
		$.each(data, function(key, val){
			console.log(val.first_name);
			$(".welcome").html("Welcome, " + val.first_name + " " + val.last_name);
		})
	})

	// Add project

	$("#addButton").on("click", function(){
		var projName = $("#projectName").val(),
			projDesc = $("#projectDescription").val(),
			projDue = $("#projectDueDate").val(),
			status = $("input[name='status']:checked").prop("id");

		$.ajax({
			url: "xhr/new_project.php",
			type: "post",
			dataType: "json",
			data: {
				projectName: projName,
				projectDescription: projDesc,
				dueDate: projDue,
				status: status
			},
			success: function(response){
				console.log("Success!");
				if(response.error){
					alert(response.error);
				}else{
					window.location.assign("projects.html");
				};
			}
		});
	});

	// Show new/current projects

	var projects = function(){
		// connect to database
		$.ajax({
			url: "xhr/get_projects.php",
			type: "get",
			dataType: "json",
			success: function(response){
				if(response.error){
					alert(response.error);
				}else{
					for(var i=0, j=response.projects.length; i<j; i++){
						var result = response.projects[i];

						$(".projects").append(
							"<div class='ui-state-default' style='border:1px solid #ccc; padding:20px'>" +
							"<input class='projectid' type='hidden' value='" + result.id + "'>" +
							" Project Name: " + result.projectName + "<br />" +
							" Project Description: " + result.projectDescription + "<br />" + 
							" Project Status: " + result.status + "<br />" +
							"<button class='deletebtn'>Delete</button>" +
							"<button class='editbtn'>Edit</button>" +
							"</div>"
						);
					};

					// Delete button
					$(".deletebtn").on("click", function(e){
						var projId = $(this).siblings(".projectid").val();
						console.log(projId);
						console.log("Delete working!");
						e.preventDefault();
						$.ajax({
							url: "xhr/delete_project.php",
							type: "post",
							dataType: "json",
							data: {
								projectID: projId
							},
							success: function(response){
								console.log("Delete ajax function success!");
								console.log(result.id);
								if(response.error){
									alert(response.error);
								}else{
									console.log(result.id);
									window.location.assign("projects.html");
								};
							}
						});
					}); // End delete
				}
			}
		})
	}
	projects();

	// Sortable Projects

	$( "#sortable" ).sortable({
		placeholder: "ui-state-highlight"
	});
	$( "#sortable" ).disableSelection();

	// Datepicker

	$( ".myDatepicker" ).datepicker();

	// Max Length Plugin

	$('.maxLength1').maxlength({      
	    maxCharacters: 50, // Characters limit   
	    status: true, // True to show status indicator below the element    
	    statusClass: "status", // The class on the status div  
	    statusText: "characters left", // The status text  
	    notificationClass: "notification",  // Will be added when maxlength is reached  
	    slider: true // True Use counter slider    
	}); 

	$('.maxLength2').maxlength({      
	    maxCharacters: 100, // Characters limit   
	    status: true, // True to show status indicator below the element    
	    statusClass: "status", // The class on the status div  
	    statusText: "characters left", // The status text  
	    notificationClass: "notification",  // Will be added when maxlength is reached  
	    slider: true // True Use counter slider    
	}); 

})(jQuery); // end private scope




