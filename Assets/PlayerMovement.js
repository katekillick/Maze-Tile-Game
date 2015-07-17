#pragma strict

public var xPosition : int;
public var yPosition : int;
public var theGrid : GameObject;

//public var currentTile : GameObject;


function Start () {

}

function Update () {

	var gridScript = theGrid.GetComponent(Grid);
	
	var newX : int = xPosition;
	var newY : int = yPosition;
	
	var currentTile = gridScript.tiles[xPosition,yPosition];
	
	if (!gridScript.moving) {
	
		if (Input.anyKey) {
			Debug.Log (currentTile);
		}

		if (Input.GetKeyDown("right") && xPosition+1<gridScript.colsNumber && currentTile.exitRight) {
			if (gridScript.tiles[xPosition+1,yPosition].exitLeft) {
				Debug.Log("can move right");
				newX = xPosition+1;
				transform.position.x+=gridScript.gridDistance;
			}
		}
		
		if (Input.GetKeyDown("left") && xPosition>0 && currentTile.exitLeft) {
			if (gridScript.tiles[xPosition-1,yPosition].exitRight) {
				Debug.Log("can move left");
				transform.position.x-=gridScript.gridDistance;
				newX = xPosition-1;
			}
		}
		
		if (Input.GetKeyDown("up") && yPosition+1<gridScript.rowsNumber && currentTile.exitUp) {
		
			if (gridScript.tiles[xPosition,yPosition+1].exitDown) {
				Debug.Log("can move up");
				transform.position.y+=gridScript.gridDistance;
				newY = yPosition+1;
			}
		}
		
		if (Input.GetKeyDown("down") && yPosition>0 && currentTile.exitDown) {
		
			if (gridScript.tiles[xPosition,yPosition-1].exitUp) {
				Debug.Log("can move down");
				transform.position.y-=gridScript.gridDistance;
				newY = yPosition-1;
			}
		}
		
		
		
		xPosition = newX;
		yPosition = newY;
		
		currentTile = gridScript.tiles[xPosition,yPosition];
		
		if (Input.anyKey) {
			Debug.Log (currentTile);
		}
	}

	
}