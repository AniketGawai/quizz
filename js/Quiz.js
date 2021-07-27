class Quiz {
  constructor(){}

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
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
  
    //write code to change the background color here
  
    background("lightblue")
    textSize(30);
    fill("brown")

    //write code to show a heading for showing the result of Quiz
    text("Result of the quiz",340,50)
    text("___________________________",230,55);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(alConestants !== undefined){
      var display_answers = 230;
      fill("blue")
      textSize(20)

       //write code to add a note here
      text("Note:Contestant who answered correct are highleted is green colour",130,230)

      //write code to highlight contest who answered correctly
      for(var plr in allConstestants){
        var correctAns = "2";
        if (correctAns === allConstestants[plr].answer)
        fill("green")
        else
        fill("red");

        display_answer+=30;
        textSize(15);
        text(allConstestants[plr].name + ":" + allConstestants[plr].answer,250,display_answers)
      }
    }
  }
}
