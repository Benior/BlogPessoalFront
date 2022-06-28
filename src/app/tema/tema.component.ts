import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  tema: Tema = new Tema()
  listaTema: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private authService: AuthService,
    private alerta: AlertasService

  ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.alerta.showAlertInfo('Sua sessão expirou, faça login novamente')
      this.router.navigate(['/entrar'])
    }

    if(environment.tipo != 'admin'){
      this.alerta.showAlertDanger('Você precisa ser administrador para criar/editar temas')
      this.router.navigate(['/inicio'])
    }

    this.authService.refreshToken()
    this.findAllTemas()
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTema = resp
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp:Tema)=>{
      this.tema = resp
      alert('Tema cadastrado com sucesso')

      this.findAllTemas()
      
      this.tema = new Tema()
    })
  }

 

}
