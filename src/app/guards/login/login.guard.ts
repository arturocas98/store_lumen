import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private storage: Storage,
    private router : Router,
    private authService:AuthService
  ){}
  // async canActivate(){
  //   const isUserLoggedIn =await this.storage.get('isUserLoggedIn');
  //   if(isUserLoggedIn){
  //     return true;
  //   }else{
  //     this.router.navigateByUrl('/login');
  //   }
    
  // }

  canActivate(): Promise<boolean>{
    return new Promise(resolve=>{
      this.authService.authActivate().then(resp=>{
        if (!resp) {
          this.router.navigateByUrl("/login");
          resolve(false);   
        }else{
          resolve(true);
        }
      });
    })
  }
  
}
