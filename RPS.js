      document.querySelector('.js-rock-button').
      addEventListener('click',()=>{
        playGame('rock');
      });

      document.querySelector('.js-paper-button').
      addEventListener('click',()=>{
        playGame('paper');
      });

      document.querySelector('.js-scissor-button').
      addEventListener('click',()=>{
        playGame('scissors');
      });

      document.querySelector('.js-autoPlay-button').addEventListener('click',()=>{
        autoPlay();
      });

      document.querySelector('.js-reset-button').addEventListener('click',()=>{
     showResetConfirmation();
      })

      document.body.addEventListener('keydown',(event)=>{
        if(event.key==='r')
        playGame('rock');
        else if(event.key==='p')
        playGame('paper');
        else if(event.key==='s')
        playGame('scissors');
        else if(event.key==='a')
        autoPlay();
        else if(event.key==='Backspace'){
        score.wins = 0;
        score.loss = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();}
      })

      let score = JSON.parse(localStorage.getItem('score')) || {  
        wins: 0,
        loss: 0,
        ties: 0
      };
      updateScoreElement();

      function updateScoreElement(){
      document.querySelector('.win').innerHTML=`Wins:${score.wins},Losses:${score.loss},Ties:${score.ties}`;
       }
       
      

      let isAutoPlaying=false;
      let intervalId;
      function autoPlay(){
        if(!isAutoPlaying){
        intervalId=setInterval(function(){
        const playerMove=pickComputerMove();
        document.querySelector('.js-autoPlay-button').innerHTML='Stop playing';
        playGame(playerMove);},1000);
        isAutoPlaying=true;
      }
      else{
        clearInterval(intervalId);
        isAutoPlaying=false;
      }
      }

      function playGame(playerMove) {
        const computerMove = pickComputerMove();
        let result = '';

        if (playerMove === 'scissors') {
          if (computerMove === 'rock') {
            result = 'You lose.'; 
          } else if (computerMove === 'paper') {
            result = 'You win.';
          } else if (computerMove === 'scissors') {
            result = 'Tie.';
          }

        } else if (playerMove === 'paper') {
          if (computerMove === 'rock') {
            result = 'You win.';
          } else if (computerMove === 'paper') {
            result = 'Tie.';
          } else if (computerMove === 'scissors') {
            result = 'You lose.';
          }
          
        } else if (playerMove === 'rock') {
          if (computerMove === 'rock') {
            result = 'Tie.'
          } else if (computerMove === 'paper') {
            result = 'You lose.';
          } else if (computerMove === 'scissors') {
            result = 'You win.';
           }
        }

        if (result === 'You win.') {
          score.wins += 1;
        //  console.log(`Wins ${score.wins}`);
        } else if (result === 'You lose.') {
          score.loss += 1;
          //console.log(`Loss ${score.loss}`);
        } else if (result === 'Tie.') {
          score.ties += 1;
          //console.log(`Ties ${score.ties}`);
        }

        localStorage.setItem('score', JSON.stringify(score));
        updateScoreElement();
        document.querySelector('.loss').innerHTML = result;
      //  document.querySelector('.score').innerHTML = `You ${playerMove} - ${computerMove} Computer`;
      document.querySelector('.score').innerHTML = `You <img src="images/${playerMove}-emoji.png" class="img">
      <img src="images/${computerMove}-emoji.png" class="img"> Computer`;
        }

     //  function updateScoreElement(){
      // document.querySelector('.win').innerHTML=`win:${score.wins} , loss:${score.loss} , ties:${score.ties}`;
     //  }
      function pickComputerMove() {
      const randomNumber = Math.random();
      let computerMove = '';
      if (randomNumber >= 0 && randomNumber < 1 / 3) {
          computerMove = 'rock';
      } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
          computerMove = 'paper';
      } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
          computerMove = 'scissors';
       }
       return computerMove;
      }

      function resetScore(){
        score.wins = 0;
        score.loss = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
      }

      function showResetConfirmation(){
            document.querySelector('.js-reset-confirmation').innerHTML=`Are you sure you want to reset the score? 
            <button class=js-reset-confirm-yes> Yes </button>
            <button class=js-reset-confirm-no> No </button>`;

            document.querySelector('.js-reset-confirm-yes')
            .addEventListener('click',()=>{
              resetScore();
              hideResetConfirmation();
            });
            document.querySelector('.js-reset-confirm-no')
            .addEventListener('click',()=>{
              hideResetConfirmation();
            });
          }

          function hideResetConfirmation(){
            document.querySelector('.js-reset-confirmation').innerHTML='';
          }