<script>
  import Router from "svelte-spa-router";
  import Polls from "./components/Polls.svelte";
  import CreatePoll from "./components/CreatePoll.svelte";
  import Poll from "./components/Poll.svelte";
  import PollResult from "./components/PollResult.svelte";
  import Navbar from "./components/Navbar.svelte"

  //Application Components with corresponding routes
  const routes = {
	  '/': Polls,
	  '/qa': CreatePoll,
	  '/qa/:id': Poll,
	  '/qa/:id/result': PollResult
  };
  //Setting votedPolls array as a localStorage to store polls that the user has already voted.
  var votedPolls = [];
  if (!localStorage.getItem('votedPolls')){
      localStorage.setItem("votedPolls",JSON.stringify(votedPolls));
  }
</script>

<Navbar/>
<main>
  <Router {routes}/>
</main>

<style>
  main {
    text-align: center;
    margin: 0 auto;
  }
</style>
