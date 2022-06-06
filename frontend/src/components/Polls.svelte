<script >
  let votedPolls = JSON.parse(localStorage.getItem("votedPolls"));
  console.log(votedPolls)
  console.log(votedPolls.length)

function fetchAPI() {
      return fetch('/api/polls')
      .then(response => response.json())
}

function deletePoll(id) {
      return fetch(`/api/polls/${id}`,{
            method: "DELETE"
      })
      .then(response => {
            if (response.ok){
                  window.location.reload();
                  console.log("Successfully deleted poll")
            }
      }
      )
}
</script>
{#await fetchAPI()}
	<p>Loading...</p>
{:then polls}
<div class="content home">
	<h2>Polls</h2>
	<p>Welcome to the home page! You can view the list of existing polls below.</p>
	<table>
        <thead>
            <tr>
                <td>#Poll ID</td>
                <td>Question</td>
                <td></td>
            </tr>
        </thead>
        <tbody>{#each polls as poll}       
            <tr>
                      <td>{poll.id}</td>
                              <td>{poll.question}</td>
                              <td class="actions">
                                    <a href={votedPolls.includes(poll.id) ?  `/#/qa/${poll.id}/result` : `/#/qa/${poll.id}`} class="view" title="View Poll">{votedPolls.includes(poll.id) ? "View Results" : "Vote"}</a>
                                    <span class="trash" title="Delete Poll" on:click={() => deletePoll(poll.id)}>Delete</span>
                              </td>
            </tr>{/each}
        </tbody>
    </table>
</div>
{:catch error}
<p>{error}</p>
{/await}
<style>
    
.home table {
      width: 100%;
      padding-top: 30px;
      border-collapse: collapse;
}
.home table thead {
      background-color: #ebf0f1;
      border-bottom: 1px solid #d3dae0;
}
.home table thead td {
      padding: 10px;
      font-weight: bold;
      color: #767779;
      font-size: 14px;
}
.home table tbody tr {
      border-bottom: 1px solid #f8f8f8;
}
.home table tbody tr:nth-child(even) {
      background-color: #fbfcfc;
}
.home table tbody tr:hover {
      background-color: #979797;
}
.home table tbody tr:hover td {
      color: #FFFFFF;
}
.home table tbody tr:hover td:nth-child(1) {
      color: #FFFFFF;
}
.home table tbody tr td {
      padding: 10px;
}
.home table tbody tr td:nth-child(1) {
      color: #a5a7a9;
}
.home table tbody tr td.actions {
      padding: 8px;
      text-align: right;
}
.home table tbody tr td.actions .view, .home table tbody tr td.actions .trash {
      display: inline-flex;
      text-align: right;
      text-decoration: none;
      color: #FFFFFF;
      padding: 10px 12px;
      border-radius: 5px;
      cursor: pointer;
}
.home table tbody tr td.actions .trash {
      background-color: #b73737;
}
.home table tbody tr td.actions .trash:hover {
      background-color: #a33131;
}

.home table tbody tr td.actions .view {
      background-color: #3ea199;
}
.home table tbody tr td.actions .view:hover {
      background-color: #3ea199;
}
</style>