<script>
  //Poll component which allows user to vote for an answer
  import { onMount } from "svelte";
  import { replace } from "svelte-spa-router";
  let votedPolls = JSON.parse(localStorage.getItem("votedPolls"));
  export let params;
  let poll;

  //Redirecting to results page if the user has already voted in this poll
  onMount(() => {
    if (votedPolls.includes(JSON.parse(params.id))) {
      replace(`/qa/${params.id}/result`);
    }
  });
  //Getting specific poll by fetching API, otherwise raising an error.
  async function fetchAPI() {
    const response = await fetch(`/api/polls/${params.id}`);
    if (!response.ok) {
      const error = response.status;
      throw new Error(error);
    }
    const data = await response.json();
    if (response.ok) {
      poll = data[0];
      return poll;
    }
  }
  //Voting for a chosen answer.
  async function voteAnswer(answerId, pollId) {
    const response = await fetch(`/api/polls/vote/${answerId}`, {
      method: "PATCH",
    });
    if (!response.ok) {
      const error = response.status;
      throw new Error(error);
    } else {
      votedPolls.push(pollId);
      localStorage.setItem("votedPolls", JSON.stringify(votedPolls));
      replace(`/qa/${pollId}/result`);
    }
  }
</script>

{#await fetchAPI()}
  <h1>Loading...</h1>
{:then poll}
  <div class="content vote">
    <h2>Poll {poll.id}</h2>
    <div class="wrapper">
      <header>{poll.question}</header>
      <p>Choose an option to vote</p>
      <div class="poll-area">
        {#each poll.answers as answer}
          <div>
            <input type="checkbox" name="poll" id="opt-1" />
            <label
              for="opt-1"
              class="opt-1"
              on:click={() => voteAnswer(answer.answerId, poll.id)}
            >
              <div class="row">
                <div class="column">
                  <span class="circle" />
                  <span class="text">{answer.answer}</span>
                </div>
              </div>
            </label>
          </div>
        {/each}
      </div>
    </div>
  </div>
{:catch error}
  <h1>{error}</h1>
{/await}

<style>
  .vote {
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
  .poll-area label:hover {
    border-color: #3ea199 !important;
  }

  .poll-area label .row {
    display: flex;
    pointer-events: none;
    justify-content: space-between;
  }
  .poll-area label .row .column {
    display: flex;
    align-items: center;
  }
  .poll-area label .row .circle {
    height: 19px;
    width: 19px;
    display: block;
    border: 2px solid #ccc;
    border-radius: 50%;
    margin-right: 10px;
    position: relative;
  }

  .poll-area label:hover .row .circle {
    display: block;
    border-color: #3ea199;
  }

  .poll-area label:hover .row .circle::after {
    content: "";
    height: 15px;
    width: 15px;
    background: #3ea199;
    border-radius: inherit;
    position: absolute;
    left: 2px;
    top: 2px;
  }

  label .row span {
    font-size: 16px;
    font-weight: 500;
  }

  input[type="checkbox"] {
    display: none;
  }
</style>
