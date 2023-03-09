<script>
  import { push } from "svelte-spa-router";
  import { link } from "svelte-spa-router";

  // export let reload = false;

  let email = "";
  let password = "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await login();
    localStorage.setItem("token", token);
    // Recharge la page
    window.location.assign("/");
    //ou redirige vers l'accueil après connexion
  };

  const login = async () => {
    // Appel du endpoint avec la bonne méthode et les données d'identification
    const response = await fetch(
      import.meta.env.VITE_URL_DIRECTUS + "auth/login",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    // Vérification de la réponse
    if (!response.ok) {
      throw new Error("Erreur lors de la connexion");
    }
    // Extrait le token et le retourne
    const token = await response.json();
    return token.data.access_token;
    console.log(token);
  };
</script>

<div class="login-content">
  <div class="log-form">
    <h2 class="title1">Connexion</h2>
    <form
      on:submit={handleSubmit}
      aria-label="Informations de connexion"
      data-aos="fade-left"
    >
      <label for="email">Email</label>
      <input
        required
        type="email"
        name="email"
        id="email"
        placeholder="ex : @mnmail.com"
        bind:value={email}
      />

      <label for="password">Mot de passe</label>
      <input
        required
        type="password"
        name="password"
        id="password"
        placeholder="***"
        bind:value={password}
      />

      <input class="conexion" type="submit" value="Se connecter" />
    </form>
  </div>
  <img
    class="img-login-page"
    src="src/assets/New Product Feature Gradient Promotion Tablet Mockup Instagram Post.gif"
    alt="connexion"
    width="500"
    data-aos="fade-right"
  />
</div>

<style>
  .login-content {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-evenly;
    align-items: center;
  }

  .title1 {
    text-align: center;
    padding: 2rem 0 0.5rem;
    color: #ff8906;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
  }
  label {
    margin: 0.5rem;
    color: #ff8906;
    font-weight: bold;
  }

  input {
    margin-bottom: 1rem;
    padding: 1rem 8rem 1rem 0.8rem;
    border: 1px solid #ff8906;
    border-radius: 10px;
  }

  .conexion {
    display: flex;
    justify-content: center;
    border: 1px solid #ff8906;
    border-radius: 8px;
    background-color: #ff8906;
    color: #fff;
    text-align: center;
    padding: 1rem 4rem;
    transition: all 0.4s;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .conexion:hover {
    cursor: pointer;
    background-color: #faa544;
    color: #fff;
  }

  .img-login-page {
    padding: 100px;
  }

  @media screen and (max-width: 1130px) {
    input {
      text-align: left;
      margin-bottom: 1rem;
      padding: 0.5rem 4rem 0.5rem 0.4rem;
      border: 1px solid #f97066;
      width: 12rem;
    }

    .login-content {
      display: flex;
      flex-direction: row-reverse;
      justify-content: center;
      align-items: center;
    }

    .img-login-page {
      display: none;
    }
  }
</style>
