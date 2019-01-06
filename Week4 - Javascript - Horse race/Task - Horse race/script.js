
function Horse (id, x, name, laneNumber) {
	this.element = document.getElementById(id);  // HTML element of the horse
	this.speed = Math.random()*10 + 30;
	this.x = x;	// horizontal position of element
	this.laneNumber = laneNumber;	
	this.name = name;

	this.moveRight = function() {
		let horse = this;
		let interval = setInterval(move, this.speed);
		function move() {
			if(horse.x == 85){
				clearInterval(interval);
				horse.x = 0;
				horse.element.style.left = "0px";		
				horse.arrive();		
			}
			else {
				horse.x ++;
				horse.element.style.left = horse.x + "%";
			}
		}
	}

	// Arrive function is called whenever a horse finishes
	this.arrive = function(){
		//Get all table cells
		var tds = document.querySelectorAll('#results .result');

		//results.length is the current arrive position
		tds[results.length].innerHTML = 'Lane ' + this.laneNumber + ' - ' + this.name;
		
		//Push the lane number to results array. According to the results array, we know the order of race results
		results.push(this);

		//All horse arrived, enable again the Start Button and alert the winner
		if (results.length == 4){		
			document.getElementById("start").disabled = false;
			document.getElementById("winner").innerText = results[0].name + " on lane number " + results[0].laneNumber; 
			modal.style.display = "block";
		}
	}
}

let results = [];	

	//Event listener to the Start button
	document.getElementById('start').onclick = function(){
		alert("Race is going to start!");
		document.getElementById('start').disabled = true;
		
		// Creating new Horse objects with id, x position, name and lane number
		let horse1 = new Horse('horse1', 0, "Belco", 1);
		let horse2 = new Horse('horse2', 0, "Darki", 2);
		let horse3 = new Horse('horse3', 0, "Sivco", 3);
		let horse4 = new Horse('horse4', 0, "Soncko", 4);

		// empty table and array with results, to prepare for new start
		let tds = document.querySelectorAll('#results .result');
		for (let i = 0; i < tds.length; i++) {
			tds[i].innerHTML = "";
		}
		while(results.length > 0) {
			results.pop();
		}
		// Starting the race
		horse1.moveRight();
		horse2.moveRight();
		horse3.moveRight();
		horse4.moveRight();		
	}

	// MODAL to alert the winner
	let modal = document.getElementsByClassName("modalWinner")[0];
	let span = document.getElementsByClassName("close")[0];
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}	
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
		modal.style.display = "none";
		}
	}
