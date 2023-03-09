<script>
  import { link } from "svelte-spa-router";
  import { isAuthenticated } from "../auth";

  // fonction pour récupérer les histoires de l'API
  const getStories = async () => {
    const response = await fetch(
      import.meta.env.VITE_URL_DIRECTUS + "items/story/?fields=*.*"
    );
    const json = await response.json();
    console.log("message console json", json);
    return json.data;
  };
</script>

<div class="stories-container">
  {#await getStories()}
    <p>Chargement de la liste...</p>
  {:then stories}
    {#each stories as story}
      <section class="stories" aria-labelledby="story-title-{story.id}">
        <div
          class="story-card"
          data-aos="fade-left"
          data-aos-easing="ease-out-back"
          data-aos-delay="40"
        >
          <h2 class="story-title">{story.title}</h2>

          {#if story?.image?.id}
            <img
              src="https:/khext1e9.directus.app/assets/{story.image?.id}"
              alt={story.title}
              class="thumbnail"
            />
          {:else}
            <img src="src/assets/coverlogo.png" alt="Logo" class="thumbnail" />
          {/if}

          {#if story.content}
            <p>
              {story.content.slice(
                0,
                story.content.split(" ").slice(0, 15).join(" ").length
              ) + "..."}
            </p>
          {:else}
            <p>Aucun contenu disponible pour cette histoire.</p>
          {/if}
          <div class="line" />
          <a href="/story/{story.id}" use:link>Lire l'histoire</a>
          <div class="line" />
          <div class="category">
            {#if story?.category?.name}
              <p>{story.category.name}</p>
            {:else}
              <p>No Category</p>
            {/if}
          </div>
        </div>
      </section>
    {/each}
  {/await}
</div>

<style>
  .link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  h2 {
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

  .line {
    border-bottom: 3px solid #e2a55e;
    width: 100%;
    margin: 1rem;
  }

  .stories {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 1rem;
  }

  .story-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background-color: #fffffe;
    border: 3px solid #ff8906;
    transition: transform 0.2s;
    padding: 0.5rem;
    width: 300px;
    height: 550px;
  }

  .story-card:hover {
    transform: scale(1.02);
  }

  p {
    margin: 1.2rem;
    color: black;
    text-align: center;
  }

  a {
    font-weight: bold;
    text-decoration: none;
    margin: 0.5rem;
    padding: 0.7rem;
    border: none;
    border-radius: 8px;
    background-color: #f97066;
    color: #fff;
    text-align: center;
    transition: 0.3s ease-out;
    width: 10rem;
  }

  a {
    font-weight: bold;
    text-decoration: none;
    margin: 0.5rem;
    padding: 0.7rem;
    border: none;
    border-radius: 8px;
    background-color: #ff8906;
    color: #fff;
    text-align: center;
    transition: 0.3s ease-out;
  }

  a:hover {
    cursor: pointer;
    background-color: #f7958e;
    color: #fff;
  }
</style>
