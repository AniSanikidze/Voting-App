<script>
  import { onMount } from "svelte";
  import { replace } from "svelte-spa-router";
  export let params;
  let poll;
  let votedPolls = JSON.parse(localStorage.getItem("votedPolls"));

  onMount(() => {
    if (votedPolls.includes(JSON.parse(params.id))){
      replace(`/qa/${params.id}/result`)
    }
  });

  async function fetchAPI() {
    return await fetch(`/api/polls/${params.id}`)
      .then((response) => response.json())
      .then((data) => (poll = data[0]));
  }

  async function voteAnswer(answerId, pollId) {
    return await fetch(`/api/polls/vote/${answerId}`, {
      method: "PATCH",
    }).then((response) => {
      if (response.ok) {
        votedPolls.push(pollId);
        localStorage.setItem("votedPolls", JSON.stringify(votedPolls));
        replace(`/qa/${pollId}/result`);
        console.log("Okay");
      }
    });
  }
</script>

{#await fetchAPI()}
  <p>Loading...</p>
{:then poll}
  <div class="content vote">
    <h2>Poll {poll.id}</h2>
    <div class="wrapper">
      <header>{poll.question}</header><p>Choose option to vote</p>
      <div class="poll-area">
        {#each poll.answers as answer}
          <div>
            <input type="checkbox" name="poll" id="opt-1" />
            <label for="opt-1" class="opt-1" on:click={() => voteAnswer(answer.answerId, poll.id)}>
              <div class="row">
                <div class="column">
                  <span class="circle" />
                  <span class="text">{answer.answer}</span>
                </div>
              </div>
            </label>
          </div>{/each}
      </div>
    </div>
  </div>
{:catch error}
  <p>An error occurred!</p>
{/await}

<style>
  .vote{
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

input[type="checkbox"]{
  display: none;
}
</style>
