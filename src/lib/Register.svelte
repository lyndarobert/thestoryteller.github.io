<script>
 import {push} from 'svelte-spa-router'
 import { link } from "svelte-spa-router";


export let reload = false;

 let pseudo = '';
 let email = ''
 let password = '';
 let confirmPassword = '';
 let errorMessage = '';


 const handleSubmit = async (event) => {
  event.preventDefault();

  if (password !== confirmPassword) {
    errorMessage = "Les mots de passe ne correspondent pas.";
    return;
  }
};

 


 const userRole = async () => {
 // Appel du endpoint avec la bonne méthode et les données d'identification
 const response = await fetch(import.meta.env.VITE_URL_DIRECTUS + "users",{
     method: "POST",
     headers: {
       "content-type": "application/json",
     },
     body: JSON.stringify({ 
       email,
       password,
       role: "49d144e1-3da7-41fc-8b40-b2ae9167c1a4"}),
   });

    // Recharge la page
    if (reload) location.reload();
    // ou redirige vers l'accueil après inscription
    else push("/login");
};


</script>

<div class="register-content">
  <div class="register-form">
 <h1 class="title1">Inscription</h1>

 {#if errorMessage}
   <p style="color: red;">{errorMessage}</p>
 {/if}

 <form on:submit={handleSubmit} on:submit={userRole} data-aos="fade-left">
  


   <label for="email">Email:</label>
   <input type="email" bind:value={email} required />

   <label for="pseudo">Pseudo:</label>
   <input type="pseudo" bind:value={pseudo} required />

   <label for="password">Mot de passe:</label>
    <input type="password" bind:value={password} required />

    <label for="confirmpassword">Confirmer le mot de passe:</label>
     <input type="password" placeholder="********" bind:value={confirmPassword} required />
 
     <div class="button-login-register">
    <input class="connexion" type="submit" value="S'inscrire">
    <a class ="loggedin" href="/login" use:link>Dejà enregistré ?</a>
    </div>
 </form>

 </div>
  <img class="register-img" src="src/assets/pexels-picjumbocom-196649.jpg" alt="register" width="600" data-aos="fade-right">
 </div>





 <style>


.loggedin {
  background-color: #0F0E17;
  color: white;
  text-align: center;
  text-decoration: underline;
}

  .button-login-register{
    display: flex;
    flex-direction: column;
  }
 
  .register-content{
   display: flex;
   flex-direction: row-reverse;
   justify-content: space-evenly;
   align-items: center;
   height: 80vh;
   margin-bottom: 3rem;
 }
 
 .title1{
   text-align: center;
   padding: 2rem 0 0.5rem;
   color: #DE7708;
 }
 
 form{
   display: flex;
   flex-direction: column;
   align-items: center;
   font-weight: bold;
 }

 a{
  text-decoration: none;
 }
 
 label{
   margin: 0.5rem;
   color: #DE7708;
   font-weight: bold;
 }
 
 input{
   margin-bottom: 1rem;
   padding: 1rem 8rem 1rem 0.8rem;
   border: 1px solid #FF8906;
   border-radius: 10px;
 }
 
 .connexion{
   border: 1px solid #FF8906;
   border-radius: 8px;
   background-color: #FF8906;
   color: #fff;
   text-align: center;
   padding: 1rem 0;
   transition: all 0.4s;
   font-weight: bold;
   font-size: 1.2rem;
   width: 12rem;
 }
 .connexion:hover{
     cursor: pointer;
     background-color: #f7958e;
     color: #fff;
 
 }
 
 @media screen and (max-width:1130px){
 
   .register-content{
     display: flex;
     flex-direction: row-reverse;
     justify-content: center;
     align-items: flex-start;
 }
 
     input{
     text-align: left;
     margin-bottom: 1rem;
     padding: 0.5rem 4rem 0.5rem 0.4rem;
     border: 1px solid #F97066;
 }
 .register-img{
     display: none;
 }

 .connexion{
   border: 1px solid #FF8906;
   border-radius: 8px;
   background-color: #FF8906;
   color: #fff;
   text-align: center;
   padding: 0.6rem 0;
   transition: all 0.4s;
   font-weight: bold;
   font-size: 1.2rem;
   width: 12rem;
 
 }
}
 
 </style>