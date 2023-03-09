<script>
  import { link } from "svelte-spa-router";

  // fonction pour récupérer les histoires de l'API
  const getStories = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_URL_DIRECTUS
      }items/story/?fields=*.*&status=published`
    );
    const json = await response.json();
    console.log(json);
    return json.data;
  };

  let count = 0;
</script>

<h1 id="title1">THE STORY TELLER</h1>

<div
  data-aos="flip-left"
  data-aos-easing="ease-out-cubic"
  data-aos-duration="2000"
>
  <section class="intro" aria-label="Introduction">
    <h2 class="subtitle">
      "Plongez dans un univers d'histoires uniques et partagez vos propres
      récits avec une communauté de passionnés !"
    </h2>

    <img
      class="miniature-responsive"
      src="src/assets/miniaturebis.png"
      alt="responsive miniature"
      width="400"
    />
  </section>
</div>

<div class="stories-container">
  {#await getStories()}
    <p>Chargement de la liste...</p>
  {:then stories}
    {#each stories
      .filter((story) => story.status === "published")
      .slice(0, 4) as story}
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
<div class="button-container">
  <a href="/stories" use:link>Voir plus d'histoires</a>
  <a href="/register" use:link>Ecrivez la vôtre</a>
</div>

<style>
  @media screen and (max-width: 1130px) {
    .miniature-responsive {
      display: none;
    }
  }

  #title1 {
    margin: 4rem;
    color: #ff8906;
    font-size: 40px;
  }
  .thumbnail {
    width: 100px; /* taille de la miniature */
    height: auto;
  }
  .subtitle {
    font-size: 2rem;
    color: #fffffe;
    padding: 2rem;
    width: 30rem;
  }

  .line {
    border-bottom: 3px solid #e2a55e;
    width: 100%;
  }
  h1 {
    text-align: center;
    margin: 2rem;
    color: #fffffe;
  }
  .story-title {
    color: #ff8906;
    text-align: center;
    font-size: 1.2rem;
  }
  p {
    margin: 1.2rem;
    color: black;
    text-align: center;
  }
  .intro {
    text-align: center;
    display: flex;

    justify-content: center;
  }
  .stories-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
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
    height: 450px;
  }
  .story-card:hover {
    transform: scale(1.02);
  }
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
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
    background-color: #e2a55e;
    color: #fff;
  }
</style>
