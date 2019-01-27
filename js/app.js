/*
 * Create a list that holds all of your cards
 */
let cards= [$(".card:eq(0)"),$(".card:eq(1)"),$(".card:eq(2)"),$(".card:eq(3)"),$(".card:eq(4)"),$(".card:eq(5)"),$(".card:eq(6)"),$(".card:eq(7)"),$(".card:eq(8)"),$(".card:eq(9)"),$(".card:eq(10)"),$(".card:eq(11)"),$(".card:eq(12)"),$(".card:eq(13)"),$(".card:eq(14)"),$(".card:eq(15)")]


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

//declare the necessary game values as moves,stars number and the opened and matched cards
let stars = 3;
let moves =0
let opened =[];
let matched =[];
let seconds=0;
let minutes=0;
let hours=0;

//add new game function for everytime starting a new game
function newGame() {
	shuffle(cards)
	let deck=$(".deck");
	$(".card").remove();
	for (c of cards){
		deck.append(c);
	};
	moves=0;
	$(".moves").html(moves);
	$(".card").removeClass("open show match");
	$(".card").css("pointer-events","auto");
	$(".fa").addClass("fa-star")
	opened =[];
	matched =[];
	$("#time").html("00:00:00");
    seconds = 0;
   	minutes = 0;
   	hours = 0;
}

newGame();

//event listener on cilcking restart
$(".restart").on("click",newGame);

//Timer function
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    let time =(hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds)
    $("#time").html(time);

    timer();
}
function timer() {
	let t = setTimeout(add, 1000);
}
timer();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function gameLogic(){
	moves +=1;
	if (moves==30){
		$(".fa:eq(0)").removeClass("fa-star")
		stars=2;
	}else if (moves==40) {
		$(".fa:eq(1)").removeClass("fa-star")
		stars=1;
	}
	else if (moves==50){
		$(".fa:eq(2)").removeClass("fa-star")
		stars=0;
	}
	$(".moves").html(moves);
    if (opened.length ==0){
    	$(this).addClass( "open show" )
		opened.push($(this))
		opened[0].css("pointer-events","none");
	}
	else {
		$(this).addClass( "open show" )
		if ($(this).html()==opened[0].html()) {
			matched.unshift($(this));			
			matched[0].addClass("match")
			matched[0].css("pointer-events","none");
			matched.unshift(opened[0]);
			matched[0].addClass("match")
			matched[0].css("pointer-events","none");
			opened.pop()
		}else{
			$(".card").css("pointer-events","none");
			setTimeout(function(){
				$(".card").removeClass("open show");
				opened[0].css("pointer-events","auto");
				$(".card").css("pointer-events","auto");
				opened.pop()
			},1000)		
		}
	}

	time=$("#time").html()
	if (matched.length==16){
		if(confirm(
		`Congratulations!!
		moves :${moves}	
		stars rating :${stars}
		time :${time}
		Restart?`)){
			newGame();
		};

	};

};


$(".deck").on("click",".card",gameLogic);

