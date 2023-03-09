<script>
  import { onMount } from 'svelte';
  import { isAuthenticated } from '../auth';
  import { link } from "svelte-spa-router";
  import Swal from 'sweetalert2';

  
  let stories = [];

  const accessToken = localStorage.getItem("token");


  const getStories = async () => {
      const response = await fetch(
        `https://khext1e9.directus.app/users/me`, 
        {   method: 'GET',
            headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${accessToken}`,
        }, 
        
        });
 
    const json = await response.json();
   
    const user = json.data;

    const storiesResponse = await fetch(`${import.meta.env.VITE_URL_DIRECTUS}items/story?fields=*.*&filter[user_created][_eq]=${user.id}`);

    const { data } = await storiesResponse.json();
           stories = data;
    // console.log (stories);
    return stories;
  };

  onMount(getStories);

    async function deleteStory(id) {
  const result = await Swal.fire({
    title: 'Êtes-vous sûr(e) de vouloir supprimer cette histoire ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler'
  });

  if (result.isConfirmed) {
    const response = await fetch(`${import.meta.env.VITE_URL_DIRECTUS}items/story/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (response.ok) {
      stories = stories.filter((story) => story.id !== id);
      await Swal.fire({
        title: 'Histoire supprimée',
        icon: 'success'
      });
    }
  }
}

async function updateStoryStatus(storyId, newStatus) {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`${import.meta.env.VITE_URL_DIRECTUS}items/story/${storyId}`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        
      },
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await response.json();
    console.log('Story status updated:', data);
   
    // Actualiser la liste des histoires pour afficher le nouveau statut
  } catch (error) {
    console.error('Error updating story status:', error);
    
  }
}

 
  function getStoryStatusClass(status) {
    return status === 'published' ? 'status-published' : 'status-draft';
  }



</script>




  <div class="stories-container">
    {#each stories as story}
      
        <section class="stories" aria-labelledby="story-title-{story.id}" role="listitem">
          <div class="story-content">
            <div class="story-card" data-aos="fade-left" data-aos-easing="ease-out-back" data-aos-delay="40">
              <div class="{getStoryStatusClass(story?.status)}"></div>
              <h2 id="story-title-{story.id}">{story.title}</h2>



              {#if story?.image?.id}
              <img src="https:/khext1e9.directus.app/assets/{story.image?.id}" alt="{story.title}" class = "thumbnail">
              {:else}
              <img src="src/assets/coverlogo.png" alt="Logo" class = "thumbnail">
            {/if}



              {#if story.content}
              <p>{story.content.slice(0, story.content.split(' ').slice(0, 15).join(' ').length) + "..."}</p>
            {:else}
              <p>Aucun contenu disponible pour cette histoire.</p>
            {/if}
              <div class="link">
                <a href="/story/{story.id}" class="{story.id}" use:link>Lire l'histoire</a>
                <button on:click={() => deleteStory(story.id)}>Supprimer</button>
 
                <div class="category">
                <p>{story.category?.name}</p>
              </div>
               
              </div>
            </div>
          
          </div>
        </section>
      
    {/each}
  </div>

<style>


button {
  font-weight: bold;
  text-decoration: none;
  margin: 0.5rem;
  padding: 0.7rem;
  border: none;
  border-radius: 8px;
  background-color: #ff1100;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  transition:  0.3s ease-out;
  width: 11rem;
  
}



button:hover{
  cursor: pointer;
}

.status-published {
    background-color: green;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
  }
  .status-draft {
    background-color: red;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
  }
  .link{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  }
  h2{
    color: #ff8906;
    text-align: center;
    font-size: 1.2rem;
  }
  .stories-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 3rem;
    }
    .line{
      border-bottom:3px solid #e2a55e ;
      width: 100%;
      margin: 1rem;
    }
  
    .stories {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: 1rem;
    }
  
    .story-card{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background-color: #fffffe;
    border: 3px solid #ff8906;
    transition: transform .2s;
    padding: 0.5rem;
    width: 300px;
    max-height: max-content;
  }
  
  .story-card:hover{
    transform: scale(1.02);
  }
  
  p{
    margin: 1.2rem;
    color: black;
    text-align: center;
  }
  
  a{
  font-weight: bold;
  text-decoration: none;
  margin: 0.5rem;
  padding: 0.7rem;
  border: none;
  border-radius: 8px;
  background-color: #F97066;
  color: #fff;
  text-align: center;
  transition:  0.3s ease-out;
  width: 10rem;
  }
  
  a{
    font-weight: bold;
      text-decoration: none;
      margin: 0.5rem;
      padding: 0.7rem;
      border: none;
      border-radius: 8px;
      background-color: #ff8906;
      color: #fff;
      text-align: center;
      transition:  0.3s ease-out;
  }
  a:hover{
  cursor: pointer;
  background-color: #f7958e;
  color: #fff;
  }

  
  </style>