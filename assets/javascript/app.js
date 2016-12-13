var correct;
var wrong;
var unanswered;
var currentQuestion = 0;


//variable to hold setInterval that runs the round timer
var secondCounter;
var TIMELIMIT = 15;
var WAIT = 5;

var roundTimer = {

	time: TIMELIMIT,

	start: function() {
		clearInterval(secondCounter);
		roundTimer.time=TIMELIMIT;
		secondCounter = setInterval(roundTimer.count, 1000);
	},

	stop: function() {
		clearInterval(secondCounter);
	},

	count: function() {
		roundTimer.time--;
		$(".time-remaining").html("Time Remaining: "+ roundTimer.time + " seconds.");
		if (roundTimer.time===0){
			clearInterval(secondCounter);
			processAnswer(-1);
			//do something to stop the round
		}
	}

} //end roundTimer definition

var round = [
{
	question: "The pink candle in an advent wreath symbolizes:",
	aImage: "assets/images/advent-candle.jpg",
	answers:  [ 
		{	a: "Joy",
			v: true
		},
		{	a:"Mary",
			v:false
		},
		{	a:"New Birth",
			v:false
		},
		{	a:"Childhood",
			v:false
		}
		]
},
{
	question: "Spinning hay when playing dreidel during Hanukkah results in:",
	aImage: "assets/images/dreidel.jpeg",
	answers:  [ 
		{	a: "Nothing",
			v: false
		},
		{	a:"Winning the Pot",
			v:false
		},
		{	a:"Winning Half of the Pot",
			v:true
		},
		{	a:"Adding to the Pot",
			v:false
		}
		]
},

{
	question: "This martyred saint is celebrated on December 13 in Sweden.",
	aImage: "assets/images/lucia.jpg",
	answers:  [ 
		{	a: "Saint Hilda",
			v: false
		},
		{	a:"Saint Theresa",
			v:false
		},
		{	a:"Saint Lucia",
			v:true
		},
		{	a:"Saint Catherine",
			v:false
		}
		]
}
]

	function beginGame(){
		correct=0;
		wrong=0;
		unanswered=0;
		currentQuestion=0;
		$(".time-remaining").text("");
		$(".question").text("");
		$(".start").css("display","block");
		$(".restart").css("display","none");
		$(".button0").css("display","none");
		$(".button1").css("display","none");
		$(".button2").css("display","none");
		$(".button3").css("display","none");

	}//end beginGame

	function displayCurrentQuestion(){
		roundTimer.start();
		$(".time-remaining").html("Time Remaining: "+ TIMELIMIT + " seconds.");
		$(".question").text(round[currentQuestion].question);
		$(".start").css("display","none");
		$(".button0").css("display","block");
		$(".button1").css("display","block");
		$(".button2").css("display","block");
		$(".button3").css("display","block");

		//format the button text with the answers to select
		$.each(round[currentQuestion].answers, function (index,value){
			var btnName = ".button"+index;
			$(btnName).text(value.a);
		}); //end looping through answers for a fixed question


	}//end displayCurrentQuestion




	function processAnswer(j) {
		var indexCorrect;
		var result;
		var temp;
		roundTimer.stop();

		for (var k=0;k<round[currentQuestion].answers.length;k++){
			if (round[currentQuestion].answers[k].v){
				indexCorrect=k;
				temp = "<p>The correct answer is " + round[currentQuestion].answers[k].a + ".</p>";
			}
		}	

		if (j===-1){
			unanswered++;
			result = "Out of Time!";
		}
		else if (j===indexCorrect) {
					correct++;
					result = "Correct!";
					temp="";
				} 
		else {
				wrong++;
				result="Nope!";
			}
			
	
		$(".question").html(result + temp);

		$(".button0").css("display","none");
		$(".button1").css("display","none");
		$(".button2").css("display","none");
		$(".button3").css("display","none");
		$(".answer-image").append("<img src='"+round[currentQuestion].aImage + "'>");

		setTimeout(nextUp,1000*WAIT);

	}

	function nextUp () {

		//display result for this question
		//wait 5 seconds then either show end of game or next question

		if (currentQuestion === round.length-1) {

			//put up end stats and restart button
			
			temp = "All done, here's how you did!<p>Correct Answers: "+ correct + "</p>"
					+ "<p>Incorrect Answers: "+ wrong + "</p>"
					+ "<p>Unanswered: "+ unanswered;

			$(".question").html(temp);
			$("img").remove();
			$(".restart").css("display","block");
			$(".button0").css("display","none");
			$(".button1").css("display","none");
			$(".button2").css("display","none");
			$(".button3").css("display","none");



		} 
		else {
			//go on to the next question
			$("img").remove();
			currentQuestion++;
			displayCurrentQuestion();
		}
	}//end nextUp

	//begin code execution

	beginGame();
	$(document).ready(function(){

		  $(".start").on("click", function () {
		  	displayCurrentQuestion();
		  });	

		  $(".button0").on("click",function (){
		  	processAnswer(0);
		  });

		  $(".button1").on("click",function (){
		  	processAnswer(1);
		  });
		  $(".button2").on("click",function (){
		  	processAnswer(2);
		  });

		  $(".button3").on("click",function (){
		  	processAnswer(3);
		  });
		  $(".restart").click(function(){
		  		beginGame();
		  		displayCurrentQuestion();
		  });
		  		

	//	$(".question").text(round[1].question);
		// for (var i=0; i< round[0].answers.length; i++){
		// 	var btnName = ".button"+i;
		// 	$(btnName).text(round[0].answers[i].a);
		// }





	});//end document ready function

















