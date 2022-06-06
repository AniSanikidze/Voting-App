<script>
    export let params;
    let poll;
    let total_votes=0;
    let votedPolls = JSON.parse(localStorage.getItem("votedPolls"));
  console.log(votedPolls)
  
    async function fetchAPI() {
       return await fetch(`/api/polls/${params.id}`)
        .then((response) => response.json())
        .then(data => (
             calculatePercentage(data[0])
        ));
    }

    function calculatePercentage(poll){   
        total_votes = poll.answers.reduce(function (result, answer) {
            return result + answer.votes;
        }, 0);

        poll.answers.map(function (answer) {
            answer.percentage = Math.round(answer.votes/total_votes * 100);
        }, 0);

        return poll;
    }

  </script>
  
  {#await fetchAPI()}
    <p>Loading...</p>
  {:then poll}
    <div class="content home">
      <h2>Poll {poll.id}</h2>
      <div class="wrapper">
        <header>{poll.question}</header>
        <div class="poll-area">
          {#each poll.answers as answer}
            <div>
              <input type="checkbox" name="poll" id="opt-1" />
              <label for="opt-1" class="opt-1">
                <div class="row">
                  <div class="column">
                    <span class="text">{answer.answer}</span>
                  </div>
                  <span class="percent">{answer.percentage} % ({answer.votes} votes)</span>
                </div>
                <div class="progress" style='--w:{answer.percentage};'></div>
              </label>
            </div>{/each}
        </div>
      </div>
    </div>
  {:catch error}
    <p>An error occurred!</p>
  {/await}
  
  <style>
      .home{
      width: 100%;
} 
    .wrapper {
      background: #fff;
      border-radius: 15px;
      padding: 25px;
      width: 70%;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
      margin: auto;
      margin-top: 2rem;
    }
    .wrapper header {
      font-size: 22px;
      font-weight: 600;
    }
    .wrapper .poll-area {
      margin: 20px 0 15px 0;
    }
    label {
      display: block;
      margin-bottom: 10px;
      border-radius: 5px;
      padding: 8px 15px;
      border: 2px solid #e6e6e6;
      transition: all 0.2s ease;
      background-color: #3ea1990a;
    }
    .poll-area label:hover{
    border-color: #3ea199!important;
  }
  
  .poll-area label .row{
    display: flex;
    pointer-events: none;
    justify-content: space-between;
  } 
  .poll-area label .row .column{
    display: flex;
    align-items: center;
  }
   
  label .row span{
    font-size: 16px;
    font-weight: 500;
  } 

  label .progress{
  height: 7px;
  width: 100%;
  position: relative;
  margin: 8px 0 3px 0;
  border-radius: 30px;
  pointer-events: none;
  display: flex !important;
  transform-origin: 0;
  animation-name: progress-bar;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-iteration-count: 1;
  background-color: #3ea199;
  width: calc(1% * var(--w));
  border-radius: inherit;
  transition: all 0.2s ease;
    }
@keyframes progress-bar {
  0% {
    background-color:rgba(149, 149, 149, 0.648);
    transform: scaleX(0);
  }
  80% {
    background-color:#3ea19968;
  }
  100% {
    background-color: #3ea199;
    transform: scaleX(1);
  }
}

label .progress,
label .row .percent{
  display: block;
}
  
  input[type="checkbox"]{
    display: none;
  }
  </style>