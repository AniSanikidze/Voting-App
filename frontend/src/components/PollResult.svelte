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
        // console.log(poll)
   
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
    .wrapper {
      background: #fff;
      border-radius: 15px;
      padding: 25px;
      min-width: 500px;
      max-width: fit-content;
      width: 100%;
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
      cursor: pointer;
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
  .poll-area label .row .circle{
      height: 19px;
      width: 19px;
      display: block;
      border: 2px solid #ccc;
      border-radius: 50%;
      margin-right: 10px;
      position: relative;
  }
  
  .poll-area label:hover .row .circle{
    display: block;
    border-color: #3ea199;
  } 
  
  .poll-area label:hover .row .circle::after{
    content: "";
    height: 15px;
    width: 15px;
    background: #3ea199;
    border-radius: inherit;
    position: absolute;
    left: 2px;
    top: 2px;
  }
   
  label .row span{
    font-size: 16px;
    font-weight: 500;
  } 

  label .progress{
  height: 7px;
  width: 100%;
  position: relative;
  background: #f0f0f0;
  margin: 8px 0 3px 0;
  border-radius: 30px;
  pointer-events: none;
  display: flex !important;
    }

    label .progress:after{
  position: absolute;
  content: "";
  height: 100%;
  background: #ccc;
  width: calc(1% * var(--w));
  border-radius: inherit;
  transition: all 0.2s ease;
}
label .progress::after{
  background: #3ea199;
}
label .progress,
label .row .percent{
  display: block;
}
  
  input[type="checkbox"]{
    display: none;
  }
  </style>