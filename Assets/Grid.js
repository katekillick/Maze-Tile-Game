#pragma strict

public var tilesNumber: int;
public var rowsNumber: int;
public var colsNumber: int;
public var moveSpeed: int;
public var gridDistance: int;

public var moving: int  = 0;
public var justMoved : boolean = false;

public var playerMoved : boolean = false;

public var tiles: Tile[,] = new Tile[5,5];

var myMaterials : Material[];

/*var myTiles : int[,];
myTiles[0] = int[1,0,0,1];/*
	[1,0,1,0],
	[1,0,1,1],
	[1,1,0,0],
	[1,1,0,1],
	[1,1,1,0],
	[1,1,1,1],
	[0,1,0,1],
	[0,1,1,0],
	[0,0,1,1],
	[0,1,1,1]
];*/

function Start () {

	//put together the array of tiles
	
   for ( var i = 0; i < tilesNumber; i++ )
     {
         var childScript = transform.GetChild(i).GetComponent(Tile);
         var tileXPos = childScript.tileXPos;
         var tileYPos = childScript.tileYPos;
         
         /*
         //pick a random texture from the list
         var rend = transform.GetChild(i).GetComponent.<Renderer>();
		 var rand = Random.Range(0,myTiles.length);
		 var myTile = myTiles[0,0].ToString();
		 //rend.material.mainTexture =  Resources.Load(myTile) as Texture; //set the texture
		 Debug.Log(myTile);
		 */
		 
         //old method - assign something random from the materials specified in the array attached to the grid object
       	 tiles[tileXPos,tileYPos] = childScript;
 		//Debug.Log(tiles[tileXPos, tileYPos]);
 		
 		//assign a random texture
		var rend = transform.GetChild(i).GetComponent.<Renderer>();
		var myMaterial = Random.Range(0,myMaterials.length);
		rend.material = myMaterials[myMaterial];
		
		var myTexture = myMaterials[myMaterial].name;
		var textSplit : String[];
		textSplit = myTexture.Split("."[0]);
		//Debug.Log("texture is"); 
		//Debug.Log(textSplit[0]);
		
		
	
		if (textSplit[1]=="1") { childScript.exitUp=true; }
		if (textSplit[0]=="1") { childScript.exitLeft=true; }
		if (textSplit[3]=="1") { childScript.exitDown=true; }
		if (textSplit[2]=="1") { childScript.exitRight=true; }
		
		
     }

}

function Update () {
	if (justMoved && moving == 0) { //this means we've just finished a movement
		 Debug.Log("finished moving");
		 justMoved = false;
		 
		 for ( var i = 0; i < tilesNumber; i++ ) //update the grid array with the new positions
		 {
	         var childScript = transform.GetChild(i).GetComponent(Tile);
	         var tileXPos = childScript.tileXPos;
	         var tileYPos = childScript.tileYPos;
			 tiles[tileXPos,tileYPos] = childScript;
		 }
	}
}

function moveTiles (thisAxis: String, thisNumber: int, thisDirection: int) { //this is called when a slideTrigger is clicked
	
	if (moving==0) { //as long as we're not already moving - other checks will be added here later
		var targetPosition : int;
		playerMoved = false;
		
		//go through each tile and set the target movement
		for (var k = 0; k < tilesNumber; k++) {
			//is this tile an affected tile?
			 var childTile =      transform.GetChild(k);
	         var childScript = childTile.GetComponent(Tile);
	         var moveMe = false;
	         var moveBy = 0;
	         
	         //if we are moving the x axis, and tileXPos matches the row we want to move
	         if (thisAxis=="y" && thisNumber==childScript.tileXPos) { 
		         moveMe=true;
		         moveBy=thisDirection*gridDistance;
		         targetPosition=childTile.transform.position.y+(thisDirection*gridDistance);
	         }
	         
	         //or equally, if we are moving the y axis, and the tileYPos matches the col we want to move
	         if (thisAxis=="x" && thisNumber==childScript.tileYPos) {
	         	moveMe=true;
		        moveBy=thisDirection*gridDistance;
		        targetPosition=childTile.transform.position.x+(thisDirection*gridDistance);
	         }
	         
	         if (moveMe) {
	         	//set the movement / direction / etc up
     			childScript.moveAxis = thisAxis;
				childScript.moveDirection = thisDirection;
				childScript.moveNumber = thisNumber;
				childScript.moveSpeed = moveSpeed;
				childScript.targetPosition = targetPosition;
				childScript.moving = true;
		        moving++; //count how many tiles are currently moving
		        justMoved = true;
			}
	         justMoved = true;
	         Debug.Log(moveMe);
	         
		}		
	}
	
}
