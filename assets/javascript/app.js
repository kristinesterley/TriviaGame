var correct;
var wrong;
var unanswered;
var currentQuestion = 0;


//variable to hold setInterval that runs the round timer
var secondCounter;
//constants for the timer in the game
var TIMELIMIT = 15;  //time limit (in seconds) to answer each question
var WAIT = 5; //number seconds to wait for the user to read the result

var TIMEUP = -1;

//timer for each round

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
			//stop the timer, then send processAnswer indication that the user did not answer
			clearInterval(secondCounter);
			processAnswer(TIMEUP);			
		}
	}
} //end roundTimer definition

//questions and answers 

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
	question: "The Columbian celebration called the Day of the Little Candles includes:",
	aImage: "assets/images/columbia.jpg",
	answers:  [ 
		{	a: "Candles and Lanterns",
			v: false
		},
		{	a:"Fireworks",
			v:false
		},
		{	a:"Music",
			v:false
		},
		{	a:"All of the Above",
			v:true
		}
		]
},
{
	question: "Spinning 'hey' when playing dreidel during Hanukkah results in:",
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
	question: "Kwanzaa, a celebration of African and American culture, lasts for:",
	aImage: "assets/images/kwanzaa.jpeg",
	answers:  [ 
		{	a: "3 days",
			v: false
		},
		{	a:"5 days",
			v:false
		},
		{	a:"6 days",
			v:false
		},
		{	a:"7 days",
			v:true
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
//beginGame initializes variables and sets up the start screen

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

	// sets up the screen for a question

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


// accepts the button number for the answer, checks if it is correct, displays result then waits
// before calling the nextUp function 

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

		if (j===TIMEUP){
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
				result="Sorry!";
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


		//show end of game or next question

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

















