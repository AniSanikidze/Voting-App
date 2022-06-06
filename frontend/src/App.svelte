<script>
  import Router from "svelte-spa-router";
  import Polls from "./components/Polls.svelte";
  import CreatePoll from "./components/CreatePoll.svelte";
  import Poll from "./components/Poll.svelte";
  import PollResult from "./components/PollResult.svelte";
  import Navbar from "./components/Navbar.svelte"

  const routes = {
	  '/': Polls,
	  '/qa': CreatePoll,
	  '/qa/:id': Poll,
	  '/qa/:id/result': PollResult
  };
  var votedPolls = [];
  localStorage.setItem("votedPolls",JSON.stringify(votedPolls));
</script>

<Navbar/>
<main>
  <Router {routes}/>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
