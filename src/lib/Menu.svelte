<script>
  import { isAuthenticated } from '../auth';
  import {handleLogout} from '../auth';
  import { push } from 'svelte-spa-router';
  import Logo from '../assets/Logo.png';
  import MenuBurger from '../assets/menuwhite.svg';
  import Close from '../assets/close.svg'
  import {link} from 'svelte-spa-router'
  
  

  
  const nav_links = [
    {
      "label": "Page d'accueil du site",
      "text": "Accueil",
      "url": "/",
      "showOnlyIfAuthenticated": true

    },
    {
      "label": "Formulaire de connexion au site",
      "text": "Se connecter",
      "url": "/login",
      "showOnlyIfNotAuthenticated": true
    },
    {
      "label": "Formulaire d'inscription au site",
      "text": "S'enregistrer",
      "url": "/register",
      "showOnlyIfNotAuthenticated": true
    },
    {
      "label": "Formulaire de gestion de compte",
      "text": "Mon compte",
      "url": "/myaccount",
      "showOnlyIfAuthenticated": true
    },
    {
      "label": "Page des histoires",
      "text": "Lire les Histoires",
      "url": "/stories",
      "showOnlyIfAuthenticated": false
    },
    {
      "label": "Page de création d'une histoire",
      "text": "Ecrire une histoire",
      "url": "/createstory",
      "showOnlyIfAuthenticated": false,
      
      
    },
    {
      "label": "Gestion des stories de l'user",
      "text": "Mes histoires",
      "url": "/mystories",
      "showOnlyIfAuthenticated": true
        },
    {
      "label": "Page de déconnexion",
      "text": "Se déconnecter",
      "url": "/logout",
      "showOnlyIfAuthenticated": true
    },
   
  ];
// console.log (nav_links);

  let showMenu = false;

  function toggleMenu() {
    showMenu = !showMenu;
  }

  const authenticated = isAuthenticated();
      
  // console.log(authenticated);

  $: filteredNavLinks = nav_links.filter((nav_link) => {
        
  // console.log("nav_link:", nav_link); // 
  // console.log("authenticated:", authenticated);
  if (nav_link.showOnlyIfAuthenticated && !authenticated) {
    // console.log("filtered: showOnlyIfAuthenticated && !authenticated");
    return false;
  }
  if (nav_link.showOnlyIfNotAuthenticated && authenticated) {
    
    
    return false;
  }
  // console.log("not filtered");
  return true;
});




</script>
    
<div class="header-content">
  <div class="modal_menu_burger">
    <button class="toggle-menu-button" on:click={toggleMenu}>
      <img src="{MenuBurger}" alt="menu-burger" width="40px" />
    </button>
  </div>

    <a href="/" class="logo-link"> <img src="{Logo}" alt="Logo du site" width="200"></a>

  <div class="modal_menu_burger-second">
    <img src="{MenuBurger}" alt="menu-burger" width="40px" />
  </div>
  <nav
    id="menu2"
    class="links {showMenu ? 'class-open' : 'class-close'}"
    role="menu"
    aria-label="header navigation" >
    <div class="modal_menu_burger">
      <button class="toggle-menu-button" on:click={toggleMenu}>
        <div class="close">
        <img src="{Close}" alt="menu-burger" width="40px" />
      </div>
      </button>
    </div>

    <div class = "nav-container">
    {#each filteredNavLinks as nav}
    <a
    role="menuitem"
    aria-label="{nav.label}"
    class="{nav.class}"
    href="{nav.url}"
    on:click={() => {
      toggleMenu();
      if (nav.url === '/logout') {
        handleLogout();
      }
    }}
    use:link
  >
    {nav.text}
  </a>
      
    {/each}
  </div>
  </nav>
</div>


<style>

/* .nav-container {

  display: flex;
} */


  .close{
    margin-left: 150%;
  }

        .header-content{
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .logo-link{
      background-color: #f7958e00;
  }
  
  .logo-link:hover{
      background-color: #f7958e00;
      transform: scale(1.05);
    }
        .modal_menu_burger{
          position: sticky;
          top: 20px;
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
         background-color: #e2a55e;
         color: #fff;
        }
        
        .toggle-menu-button{
            border: none;
            background-color: rgba(255, 0, 0, 0);
        }
        .toggle-menu-button:hover{
            cursor: pointer;
        }
        
        @media screen and (max-width:1130px){
                .class-close{
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  position: fixed;
                  top: 0;
                  bottom: 1;
                  right: -230px;
                  width: 13rem;
                  height: 100%;
                  background-color: #fffffe;
                  padding:10px;
                  z-index: 1;
                  transition: transform 0.5s ease-in-out;
                  transform: translateX(230px);
                }

                .nav-container {

                  display: flex;
                  flex-direction: column;
                }
        
                .class-open{
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  position: fixed;
                  top: 0;
                  bottom: 1;
                  right: -230px;
                  transition: transform 0.5s ease-in-out;
                  width: 13rem;
                  height: 100%;
                  background-color: #fffffe;
                  padding:10px;
                  z-index: 1;
                  transform: translateX(-230px);
                }
  
                a{
              width: 10rem;
              z-index: 1;
          }
  
          .header-content{
              display: flex;
              flex-direction: row-reverse;
              justify-content: space-between;
          }
  
          .logo{
              display: flex;
              justify-content: center;
              width: 100vw;
          }
          .modal_menu_burger{
              padding: 0 1rem;
              position: sticky;
          }
          .modal_menu_burger-second{
              padding: 0 1rem;
              opacity: 0;
          }
      }
  
     


      @media screen and (max-width:500px){
        .class-close{
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  position: fixed;
                  top: 0;
                  bottom: 1;
                  right: -230px;
                  width: 14rem;
                  height: 100%;
                  background-color: #fffffe;
                  padding:10px;
                  z-index: 1;
                  transition: transform 0.5s ease-in-out;
                  transform: translateX(230px);
                }
        
                .class-open{
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  position: fixed;
                  top: 0;
                  bottom: 1;
                  right: -230px;
                  transition: transform 0.5s ease-in-out;
                  width: 13rem;
                  height: 100%;
                  background-color: #fffffe;
                  padding:10px;
                  z-index: 1;
                  transform: translateX(-230px);
                }
  
  
          a{
              width: 10rem;
              z-index: 1;
          }
  
          .header-content{
              display: flex;
              flex-direction: row-reverse;
          }
  
          .logo{
              display: flex;
              justify-content: center;
              width: 100vw;
          }
          .modal_menu_burger{
              padding: 0 1rem;
          }
          .modal_menu_burger-second{
              padding: 0 1rem;
              opacity: 0;
          }
      }
  
      @media screen and (min-width:1130px){
      .modal_menu_burger{
          display: none;
      }
      .modal_menu_burger-second{
          display: none;
      }
  }
  
      </style>