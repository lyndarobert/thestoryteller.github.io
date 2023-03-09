<script>
  import Router from 'svelte-spa-router';
  
  import Menu from "./lib/Menu.svelte";
  import Home from './lib/Home.svelte';
  import Login from './lib/Login.svelte';
  import Story from './lib/Story.svelte';
  import Stories from "./lib/Stories.svelte";
  import CreateStory from './lib/CreateStory.svelte';
  import Register from './lib/Register.svelte';
  import MyAccount from './lib/MyAccount.svelte';
  import MyStories from './lib/MyStories.svelte';
  import Footer from './lib/Footer.svelte';

 
  
  const routes = {
    '/': Home,
    '/login': Login,
    '/register': Register,
    '/stories': Stories,
    '/story/:id': Story,
    '/createstory': CreateStory,
    '/myaccount': MyAccount,
    '/mystories' : MyStories,
    '/logout' : Home,
  };

</script>

<header>
  <Menu />
  <div class="bandeau"></div>
</header>

<main aria-labelledby="title1">
  <Router {routes} />
</main>

<footer><Footer /></footer>