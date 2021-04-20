class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1Img);
    car1.scale=0.8;

    car2 = createSprite(300,200);
    car2.addImage("car2",car2Img);
    car2.scale=1.1;

   
    cars = [car1, car2];

   
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
//    image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);
      image(trackImg,displayWidth*4,0,-displayWidth*5,displayHeight);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x;
      var y=0;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 200;
        //use data form the database to display the cars in y direction
        x = displayWidth + allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = cars[index-1].x;
        }

       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance>3520){
      gameState=2;

    }
    drawSprites();
  }

  end(){
    console.log("game over");
  }
  
}
