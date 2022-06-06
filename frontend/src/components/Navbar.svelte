<script>
    import { link } from "svelte-spa-router";
</script>

<nav>
    <div>
    		<a href="/" use:link class="application-name">Voting App</a>
            <a href="/" use:link><i class="fas fa-poll-h"></i>Polls</a>
            <a href="/qa" use:link>Create Poll</a>
  	</div>
</nav>

<style>
    nav {
        background-color: #3ea199;
      height: 60px;
      width: 100%;
      border: 0;
    }
    nav div {
      display: flex;
      margin: 0 auto;
      max-width: 1200px;
      height: 100%;
    }
    .application-name, nav div a {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
}

.application-name {
      flex: 1;
      font-size: 24px;
      padding: 0;
      margin: 0;
      color: #ecf0f6;
      font-weight: normal;
      padding: 0 2%;
}
nav div a {
      padding: 0 2%;
      text-decoration: none;
      color: #c5d2e5;
      font-weight: bold;
}
nav div a i {
      padding: 2px 8px 0 0;
}
nav div a:hover {
      color: #ecf0f6;
}
</style>

