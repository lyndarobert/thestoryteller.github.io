import { push } from 'svelte-spa-router';

export const isAuthenticated = () => {
  
  return localStorage.getItem('token') !== null;
 
   };

// console.log (isAuthenticated);   

// Fonction pour déconnecter l'utilisateur
export const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.assign("/");
    // push('/');
    
  }

  // console.log (handleLogout);   

  