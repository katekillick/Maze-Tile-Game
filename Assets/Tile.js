#pragma strict
public  var tileID: int;
public  var tileXPos: int;
public  var tileYPos: int;

public var moveSpeed: int;
public var targetPosition: int;

public var moveAxis: String;
public var moveDirection: int;
public var moveNumber: int;
public var moving:boolean  = false;

public var rend : Renderer;

public var exitUp : boolean = false;
public var exitRight : boolean = false;
public var exitDown : boolean = false;
public var exitLeft : boolean = false;

var player : GameObject;



function Start () {
	player = GameObject.FindWithTag("Player");
}

function Update () {
	if (moving) { moveTile(); }
}

function moveTile() {
   	var reachedTarget = false;
   	var playerScript = player.GetComponent(PlayerMovement);
   	
    var	movePlayer = false;
   	
   	if (playerScript.xPosition == tileXPos && playerScript.yPosition == tileYPos) {
	   	movePlayer = true;
   	}
   	
     	
     	if (moveAxis=="y" && moveDirection==1) {
     		transform.Translate(Vector3.up * Time.deltaTime * moveSpeed);
     		if (movePlayer) { player.transform.Translate(Vector3.up * Time.deltaTime * moveSpeed); }
     		if (transform.position.y >= targetPosition) { 
	     		stopMoving();
     		}
     	}
     	
      if (moveAxis=="y" && moveDirection==-1) {
     		transform.Translate(Vector3.down * Time.deltaTime * moveSpeed);
     		if (movePlayer) { player.transform.Translate(Vector3.down * Time.deltaTime * moveSpeed); }
     		if (transform.position.y <= targetPosition) { 
	     		stopMoving();
     		}
     	}
     	
     	if (moveAxis=="x" && moveDirection==1) {
     		transform.Translate(Vector3.right * Time.deltaTime * moveSpeed);
     		if (movePlayer) { player.transform.Translate(Vector3.right * Time.deltaTime * moveSpeed); }
     		if (transform.position.x >= targetPosition) { 
	     		stopMoving();
     		}
     	}
     	
      if (moveAxis=="x" && moveDirection==-1) {
     		transform.Translate(Vector3.left * Time.deltaTime * moveSpeed);
     		if (movePlayer) { player.transform.Translate(Vector3.left * Time.deltaTime * moveSpeed); }
     		if (transform.position.x <= targetPosition) { 
	     		stopMoving();
     		}
     	}
     	
	    //Debug.Log("current y " + transform.position.y + " target y " + targetPosition);
	    
}

function stopMoving() {
	moving = false; 

	var gridScript = GameObject.Find("Grid").GetComponent(Grid);
	
   	var playerScript = player.GetComponent(PlayerMovement);
	gridScript.moving-=1;
	
	var movePlayer=false;
	
   	if (playerScript.xPosition == tileXPos && playerScript.yPosition == tileYPos && !gridScript.playerMoved) {
	   	movePlayer = true;
	   	gridScript.playerMoved = true;
   	}
	
	//snap the tile to the grid
	if (moveAxis=="x") { 
		transform.position.x = targetPosition;
		tileXPos += moveDirection;
	}
	if (moveAxis=="y") {
		transform.position.y = targetPosition;
		tileYPos += moveDirection;
	}
	
	//check if the tile has gone off the grid, and if so, relocate it
	if (tileXPos < 0) {
		transform.position.x = (gridScript.colsNumber-1) * gridScript.gridDistance;
		tileXPos = gridScript.colsNumber-1;
	}
	if (tileYPos < 0) { 
		transform.position.y = (gridScript.rowsNumber-1) * gridScript.gridDistance;
		tileYPos = gridScript.rowsNumber-1;
	}
	if (tileXPos >= gridScript.colsNumber) { 
		transform.position.x = 0;
		tileXPos = 0;
	}
	if (tileYPos >= gridScript.rowsNumber) {
		transform.position.y = 0;
		tileYPos = 0;
	}
	
	//getAdjacents();
	
	if (movePlayer) {
		Debug.Log("X " + tileXPos);
		Debug.Log("Y " + tileYPos);
	
		playerScript.xPosition = tileXPos;
		playerScript.yPosition = tileYPos;
		
		player.transform.position.x = transform.position.x;
		player.transform.position.y = transform.position.y+(gridScript.gridDistance/2);
	}
	
	
}

/*
function getAdjacents() {
//	rend =  GetComponent(Renderer);
//	var myTexture = rend.material.mainTexture.name;
	//var thisPath = myTexture.Split(""[0]);
	//Debug.Log(thisPath);
	

}*/

