var students = [];
var notTimeout = false;
var gui = require('nw.gui');
var windows = gui.Window.get();
var interval;
var count;
var countExtend;
var loggedIn = false;
//var intervalKeypress;
//var keypressTimer;
var loggedInTimer;
var extendTimer;

function submit_student_number(){
	var gui = require('nw.gui');
	var windows = gui.Window.get();
	var studentNumber = $("#student-number").val();
	var match = studentNumber.match(/\b\d{4}-\d{5}\b/g);
	//Password for closing the windows
	if( studentNumber === "mnemonisms" ){
		windows.on('close',function(){
			var $this = this;
			$this.close(true);
		});
		windows.close();
	}

	if(match == null){
		$("#student-number").addClass("wrong");
		return;
	}else
		$("#student-number").removeClass("wrong");
	
	students.push(studentNumber);

	var toBeStored = {"student-number": students};
	localStorage.setItem("data", JSON.stringify(toBeStored));

	if( notTimeout ){
		//Send data through ajax
		console.log("Sending something");
	}else{
		main();
	}
	
	windows.leaveKioskMode();
	windows.moveTo(0,50);
	$("#wrapper-form").fadeOut();
	$("#wrapper-logout").fadeIn();
	//$(".stud-number").text( studentNumber );
	
	loggedInTimer = setInterval(function(){
		console.log("Shemay");
		/*countExtend = 0;
		extendTimer = setInterval(function(){
			countExtend += 1;
			console.log( countExtend );
			
			if( countExtend == 30 ){
				console.log("Pumasok sa 30 seconds rule. Did not extend");
				clearInterval( loggedInTimer );
				clearInterval( extendTimer );
				enter_kiosk();
			}
		}, 1000);*/
		
		if( confirm("Do you want to extend?") == false ){
			console.log("Did not extend");
			clearInterval( loggedInTimer );
			enter_kiosk();
		}
	}, 300000);
	
}

function disable_close(){
	var gui = require('nw.gui');
	var windows = gui.Window.get();
	//Prevents window from closing
	windows.on('close',function(){
		var $this = this;
		$this.close(false);
	});
}

function check_connection(){
	var hopia = false;
	var returnData = call_ajax('lel', false);
	returnData.success(function(data, status){
		console.log(status);
		hopia = true;
	});

	return hopia;
}

function call_ajax( params, asyncCheck ){
	return $.ajax({
		type: 'POST',
		url: 'http://127.0.0.1/test_server/test.php',
		async: asyncCheck,
		data: params
	});
}

function main(){
	notTimeout = check_connection();

	window.setInterval(function(){
		notTimeout = check_connection();
	}, 20000);
	
	/*$(document).keypress(function(){
		keypressTimer = 0
		console.log("NEW KEY IS PRESSED");
		intervalKeypress = setInterval(function(){
			keypressTimer += 1000;
			console.log( keypressTimer );
			if( keypressTimer == 10000 ){
				clearInterval( intervalKeypress );
			}
		}, 1000);
	});*/
	
	disable_close();
}

function enter_kiosk(){
	count = 2;
	$("#wrapper-logout").fadeOut();
	windows.enterKioskMode();
	
	interval = setInterval(function(){
		count = count - 1
		if( count == 0 ){
			interval = clearInterval( interval );
			$("#wrapper-form").center();
			$("#wrapper-form").fadeIn();
		}
	}, 1000);
}