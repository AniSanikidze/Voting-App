<script>
  let num_of_answers = 2;

  let poll = {
    question: "",
    answers: [],
  };
  function postPoll() {
    fetch("/api/new-poll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(poll),
    }).then((response) => {
      if (response.ok) {
        location.href = "/";
        console.log("Okay");
      }
    });
  }

  function addOption() {
        if (num_of_answers < 6){
          num_of_answers += 1;    
        }
        
  }

  function removeOption() {
        if (num_of_answers > 2){
          num_of_answers -= 1;    
        }
  }

  async function hanldeKeyPress(e,index,value) {
      if (index == num_of_answers - 1){
            if (e.key === 'Enter') {
                        await addOption();
                        }
            else if (e.key === 'Backspace' && value === "") {
                       await removeOption()   
                  }
                  var textarea = [].slice.call(document.querySelectorAll('textarea')).pop();
                        textarea.focus();
      }
     
  }
</script>

<div class="content update">
  <h2>Create Poll</h2>
  <form on:submit|preventDefault={postPoll}>
    <div class="input">
      <textarea
        type="text"
        class="input-field"
        name="title"
        id="title"
        bind:value={poll.question}
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
        required
      />
      <label for="description" class="input-label">Poll Question</label>
    </div>
    {#each Array(num_of_answers) as _, index (index)}
    <div class="input" id="answers">
        <textarea
          type="text"
          class="input-field"
          name="description"
          id={index}
          bind:value={poll.answers[index]}
          on:keydown={(e) => hanldeKeyPress(e,index,poll.answers[index])}
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          required
        />
        <label for="description" class="input-label"
          >Poll Option {index + 1}</label
        >
      </div>
    {/each}
    <div class="create-poll-btns">
      <input type="button" value="Add Option" class="add-option-btn" on:click={addOption} />
      <input type="button" value="Remove Option" class="remove-option-btn" on:click={removeOption} />
</div>
      <input type="submit" value="Publish" class="create-poll-btn" />
    
  </form>
</div>

<style>
  .update form {
    padding: 15px 0;
    display: flex;
    flex-flow: column;
    width: 700px;
    margin: auto;
  }
  .input {
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    padding-top: 1.5rem;
    margin-top: 1.5rem;
  }
  .input-field {
    border: 0;
    z-index: 1;
    background-color: transparent;
    border-bottom: 2px solid #eee;
    font: inherit;
    font-size: 1.125rem;
    height: 30px;
  }

  textarea:focus {
    outline: 0;
    border-bottom-color: #3ea199;
  }
  .input-label {
    color: #818588;
    position: absolute;
    top: 1.5rem;
    transition: 0.25s ease;
  }

  textarea:focus + label {
    color: #3ea199;
    transform: translateY(-1.5rem);
  }

  textarea:valid + .input-label {
    color: #3ea199;
    transform: translateY(-1.5rem);
  }
  .create-poll-btns {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .add-option-btn{
      display: block;
    background-color: #3e57a1;
    border: 0;
    font-weight: bold;
    font-size: 12px;
    color: #ffffff;
    cursor: pointer;
    /* width: 150px; */
    border-radius: 5px;
    padding: 10px  !important;
    /* margin: auto; */
    margin-right: 15px;
    margin-top: 30px;
  }
  .remove-option-btn{
      display: block;
    background-color: #a13e3e;
    border: 0;
    font-weight: bold;
    font-size: 12px;
    color: #ffffff;
    cursor: pointer;
    /* width: 150px; */
    border-radius: 5px;
    padding: 10px !important;
    /* margin: auto; */
    margin-top: 30px;
  }
  .create-poll-btn {
    display: block;
    background-color: #3ea199;
    border: 0;
    font-weight: bold;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
    width: 200px;
    border-radius: 5px;
    padding: 15px 20px !important;
    margin: auto;
    margin-top: 30px;
  }
  .create-poll-btn:hover {
    background-color: #3ea199;
  }
</style>