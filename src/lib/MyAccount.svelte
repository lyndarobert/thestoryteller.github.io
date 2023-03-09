<script>
  import { push } from 'svelte-spa-router'
  import { isAuthenticated } from '../auth';
  import { handleLogout } from '../auth';
  
  let email = "", pwd = "", newPseudo = "", newPwd = "";
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!isAuthenticated()) {
      console.log("Vous devez vous connecter pour modifier votre mot de passe.");
      return;
    }

    const token = localStorage.getItem('token');

    const getId = await fetch(`${import.meta.env.VITE_URL_DIRECTUS}users/me`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      
     
      })
    const json = await getId.json();
    console.log ("message", json)

    const response = await fetch(`${import.meta.env.VITE_URL_DIRECTUS}users/${json.data.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "email": email,
        "password": newPwd,
        "pseudo": newPseudo
        
      })
    })

    if (response.status === 200) {
      console.log("Mot de passe modifié avec succès !");
      
    } else {
      console.log("Erreur lors de la modification du mot de passe.");
    }
  }
</script>


<h1 class="title1">Modifier le mot de passe</h1>
  
<form on:submit={handleSubmit}>
  <label for="email">
    Adresse e-mail :
  </label>
  <input type="email" bind:value={email} required>
  <label for="password">
    Mot de passe actuel :
  </label>
  <input type="password" bind:value={pwd} required>
  <label for="pseudo">
    Nouveau pseudo :
  </label>
  <input type="text" bind:value={newPseudo}>
  <label for="new-password">
    Nouveau mot de passe :
  </label>
  <input type="password" bind:value={newPwd} required>
  <button type="submit" class="edit-password">Modifier le mot de passe</button>
</form>





<style>
  .title1{
  text-align: center;
  padding: 2rem 0 0.5rem;
  color: #FF8906;
}

form{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  margin: 2rem 0;
}

label{
  margin: 0.5rem;
  color: #FF8906;
  font-weight: bold;
}

input{
  margin-bottom: 1rem;
  padding: 1rem 1.5rem;
  border: 1px solid #FF8906;
  border-radius: 10px;
  font-size: 1.1rem;
}

.edit-password{
  border: 1px solid #F97066;
  border-radius: 12px;
  background-color: #FF8906;
  color: #fff;
  text-align: center;
  padding: 1rem 1.2rem;
  transition: all 0.4s;
  font-weight: bold;
  font-size: 1.2rem;
}

.edit-password:hover{
  cursor: pointer;
  background-color: #faa544;
  color: #fff;
}

@media screen and (max-width:1000px){

  input{
    text-align: left;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid #F97066;
    font-size: 1rem;
  }

  .edit-password{
  border: 1px solid #F97066;
  border-radius: 12px;
  background-color: #FF8906;
  color: #fff;
  text-align: center;
  padding: 0.7rem 0.6rem;
  transition: all 0.4s;
  font-weight: bold;
  font-size: 1.2rem;
}

}

</style>