<script>
  import { onMount } from 'svelte';
  import Logo from '../assets/Logo.png';

  let numStories = 0;
  let numUsers = 0;

  const updateStats = async () => {
    const storiesResponse = await fetch(import.meta.env.VITE_URL_DIRECTUS + "items/story?fields=id");
    const usersResponse = await fetch(import.meta.env.VITE_URL_DIRECTUS + "users?fields=id");

    const storiesJson = await storiesResponse.json();
    const usersJson = await usersResponse.json();

    numStories = storiesJson.data?.length;
    numUsers = usersJson.data?.length;

     stats = [
      {
        text: "Nombre d'histoires",
        value: numStories
      },
      {
        text: "Nombre d'auteurs",
        value: numUsers
      }
    ];
  };

  let stats = [];

  onMount(updateStats);

</script>



<div class="footer-content">

  <div class="logo">
    <img src="{Logo}" alt="logo" width="300px">
  </div>

  <div class="communaute">
  <h2 id="stats-title">Rejoignez la communauté</h2>

  <div class="responsive-second">
    {#each stats as stat}
      
        <h3>{stat.text}</h3>
        <big>{stat.value}</big>
      
    {/each}
  </div>
  </div>
  <div class="responsive">
  <div class="contact">
    <h3>Contact</h3>
    <a href="#">Mentions Légales</a>
    <a href="#">A propos</a>
    <a href="#">Aide</a>
    <a href="#">FAQ</a>
    <div class="reseaux">
      <a href="#"></a>
    </div>
  </div>

  <nav>
    <h3>Navigation</h3>
    <a href="/">Accueil</a>
    <a href="/stories">Les histoires</a>
    <a href="/login">Se connecter</a>
    <a href="/#register">S'enregistrer</a>
  </nav>
</div>
</div>


  

<style>

#stats-title{
  color: #E2A55E;
  text-align: center;
}

.responsive{
  display: flex;
  width: 30%;
  justify-content: space-around;
}

a{
  text-decoration: none;
  color: black;
  margin-bottom: 1rem;
  transition: color 0.3s ease-in-out
}

a:hover{
  color: #FF8906;
}

.contact{
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3{
  color: #FF8906;
}

nav{
  display: flex;
  flex-direction: column;
  align-items: center;
}


.footer-content{
  background-color: #FFFFFE;
  display: flex;
  color: black;
  justify-content: space-around;
  padding: 3rem;
}

@media screen and (max-width:1130px){

  .responsive-second{
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 2rem;
    flex-direction: column;
    align-items: center;
  }

  .responsive{
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 2rem;
  }

  .footer-content{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .logo{
    border-bottom: #E2A55E 3px solid;
  }
}

.communaute{
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>