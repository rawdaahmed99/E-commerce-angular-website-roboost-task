import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
 const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
const _Router= inject(Router);
if(typeof localStorage!=='undefined' || typeof sessionStorage!=='undefined')
  if (token) {
    _Router.navigate(['/home']);
    return true;
  } else {

    return false;
  }
  else{
    return false
  }
};
