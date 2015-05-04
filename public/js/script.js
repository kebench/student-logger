$(function(){
	$.fn.center = function () {
   		this.css("position","absolute");
   		this.css("top", ( $(window).height() - this.height() ) / 2  + "px");
   		this.css("left", ( $(window).width() - this.width() ) / 2 + "px");
   		return this;
	}

	$("#wrapper-form").center();

	$("#submit-button").click(function(){
		submit_student_number();
	});

	$(document).keypress(function(e){
		if(e.which == 13)
			submit_student_number();
	})
	
	$("#logout-button").click(function(){
		enter_kiosk();
	});
});