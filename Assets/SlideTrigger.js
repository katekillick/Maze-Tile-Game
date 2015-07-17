#pragma strict
public var axis: String;
public var number: int;
public var direction: int;

private var grid : GameObject;

function Start () {

}

function Update () {

}



function OnMouseOver()
{
    if (Input.GetMouseButtonDown(0)) { //detect when a tile is clicked
    	//Debug.Log(tileXPos);
    	Debug.Log("move the " + axis + " axis on rol/column " + number + " by " + direction);
    	
		//find out where the grid is
		grid = GameObject.Find("Grid");
		//Debug.Log(grid);
		grid.GetComponent(Grid).moveTiles(axis, number, direction);

    }
}