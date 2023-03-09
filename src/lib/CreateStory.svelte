
<script>
 

  import { createEventDispatcher } from 'svelte';
  import { isAuthenticated } from '../auth.js';
  import { link } from "svelte-spa-router";
  import { marked } from 'marked';
  import sanitizeHtml from 'sanitize-html';

  

  const dispatch = createEventDispatcher();
  let title = '';
  let content = '';
  let category = '';
  let status = 'draft';
  let categories = []; // nouvelle variable pour stocker les catégories
  let message = '';


  
  
  async function loadCategories() {
    try {
      const response = await fetch(import.meta.env.VITE_URL_DIRECTUS + 'items/category');
      const data = await response.json();
      categories = data.data;
      console.log('Categories loaded:', categories);
    } catch (error) {
      console.error('Error loading categories:', error);
      // Gérer les erreurs de chargement des catégories
    }
  }

  loadCategories(); // appel de la fonction pour charger les catégories au démarrage

  function handleSubmit() {
    
    const newStory = {
      title: title,
      content: sanitizeHtml(content),
      category: category,
      status: status,
      date: new Date().toLocaleString(),
    };
    handleCreate(newStory);
  }

  async function handleCreate(story) {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(import.meta.env.VITE_URL_DIRECTUS + 'items/story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(story),
      });
      // window.location.reload();
      const data = await response.json();
      console.log('Story published:', data);
      message = 'Votre histoire a été publiée avec succès.';
    
    } catch (error) {
      console.error('Error publishing story:', error);
      message = 'Une erreur est survenue lors de la publication de votre histoire.';
      
    }
  }

  async function handlePreview(story) {
  const previewHTML = `
    <div class="story-preview">
      <h2>${story.title}</h2>
      <p class="date">${story.content}</p>
      <div class="content" innerHTML={marked(content)}></div>

    </div>
  `;
  const previewWindow = window.open('', '_blank', 'height=600,width=800');
  previewWindow.document.write(`
    <html>
      <head>
        <title>Prévisualisation de l'histoire</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown.min.css">
      </head>
      <body>
        ${previewHTML}
      </body>
    </html>
  `);
  previewWindow.document.close();
}


  
</script>


<h2>Partagez votre plume</h2>
<div class="container-create">
  {#if !isAuthenticated()}
  <div class="content-not-authenticated">
  <p>Merci de vous inscrire ou de vous connectez</p>

   <a class="button-container" href="/register" use:link>S'inscrire</a>

</div>

<div>
<img class="register-img" src="src/assets/CreateStory.jpg" alt="register" width="600" data-aos="fade-right">
</div>

  {:else}

  <form on:submit|preventDefault={handleSubmit} class="formulaire">
    <div class="title-category-status">
    <label for="title">
      Titre:
    </label>
      <input type="text" bind:value={title} required />
    <label for="categorie">
      
      Catégorie:
    </label>
      <select bind:value={category}>
        {#each categories as cat}
        <option value={cat.id}>{cat.name}</option>
        {/each}
      </select>
    <label for="statut">
      Statut:
    </label>
      <select bind:value={status}>
        <option value="draft">Brouillon</option>
        <option value="published">Publié</option>
      </select>
    </div>
 <div class="content">
    <label for="content">
      Contenu:
    </label>
      <textarea bind:value={content} required></textarea>

      <div class="button-content">
      <button type="button" on:click={()=> handlePreview({title, content: sanitizeHtml(content)})}>Prévisualiser</button>
      
    <button type="submit">Publier</button>
    </div>
  </div>
</form>
{/if}
</div>
  <div class="publication">
    {#if message}  
    <p class="success">{message}</p>
    {/if}
</div>
  





<style>



  .publication{
    display: flex;
    justify-content: center;
  }

  h2{
    color: #FF8906;
    text-align: center;
    margin-top: 3rem;
  }

  p{
    color: #fff;
    margin-bottom: 5rem;
  }

.formulaire{
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

  .content-not-authenticated{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 70vh;
    padding: 50px ;
  }

  .button-content{
    display: flex;
  }

  .button-container {
  text-decoration: none;
  border: 1px solid #FF8906;
  border-radius: 8px;
  background-color: #FF8906;
  color: #fff;
  text-align: center;
  padding: 1rem 4rem;
  transition: all 0.4s;
  font-weight: bold;
  font-size: 1.2rem;    
  }

  .button-container:hover{
    background-color: #e2a55e;
  }

  .container-create{
    display: flex;
    
    justify-content: space-evenly;
    margin-top: 2rem;
  }

  .title-category-status{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: bold;
        
    }

    .content{
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    label{
        margin: 0.5rem;
        color: #ff8906;
        font-weight: bold;
        
    }

    input{
        margin-bottom: 1rem;
        padding: 1rem 8rem 1rem 0.8rem;
        border: 1px solid #ff8906;
        border-radius: 10px;
        width: 12rem;
    }

    select{
      background-color: #fff;
      color: #ff8906;
      border: 2px solid #ff8906;
      border-radius: 10px;
      padding: 0.8rem;
      width: 200px;
      margin-bottom: 1rem;
      width: 15rem;
      text-align: center;
      font-size: 1rem;
      font-weight: bold;
    }

  textarea {
    display: flex;
     height: 250px;
     width: 360px;
     border: 1px solid #ff8906;
     margin-bottom: 1rem;
  }
  
  input {
  
     width: 100px;
  }
  
  button{
    font-weight: bold;
    text-decoration: none;
    margin: 0.5rem;
    padding: 0.7rem;
    border: none;
    border-radius: 8px;
    background-color: #ff8906;
    color: #fff;
    text-align: center;
    width: 10rem;
    font-size: 1rem;
  }

  button:hover{
    cursor: pointer;
    background-color: #e2a55e;
    color: #fff;
    
  }

  
.success{
  display: flex;
  color: #fff;
  background-color: #f97066;
  border-radius: 10px;
  padding: 0.8rem;
  width: 300px;
  text-align: center;
  justify-content: center;
  font-weight: bold;
}
  @media screen and (max-width:1130px){
    .formulaire{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
}

.container-create {
  display: flex;
  flex-direction: column;
}

img {
  display: none;
}
  }
  
  
  </style>


