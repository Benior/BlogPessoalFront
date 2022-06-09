import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  entrar(userLogin: UserLogin):Observable<UserLogin>{
    return this.http.post<UserLogin>('https://benior-blogpessoal.herokuapp.com/usuario/logar', userLogin)
  }

  cadastrar(user:User): Observable <User> {
    return this.http.post<User>('https://benior-blogpessoal.herokuapp.com/usuario/cadastrar', user)
  }

  getByIdUser(id: number): Observable<User>{    
    return this.http.get<User>(`https://benior-blogpessoal.herokuapp.com/usuario/${id}`,{headers: new HttpHeaders().set('Authorization', environment.token)})
  }

  logado(){
    let ok: boolean = false

    if(environment.token != ''){
      ok = true
    }

    return ok
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

}

/*
https://benior-blogpessoal.herokuapp.com/
http://localhost:8080/
*/