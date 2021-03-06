import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagem: Postagem[]
  tituloPost: string

  tema: Tema = new Tema()
  listaTema: Tema[]
  idTema: number

  user: User = new User()
  idUser = environment.id

  key = 'date'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou, faça login novamente')
      this.router.navigate(['/entrar'])
    }
    this.authService.refreshToken()
    this.getAllPostagem()
    this.getAllTemas()
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTema = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  getAllPostagem() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) =>
      this.listaPostagem = resp
    )
  }

  getPostagemByTitulo() {
    
    if (this.tituloPost == '') {
      this.getAllPostagem()
    } else{
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]) =>
      this.listaPostagem = resp
    )
    }  
  }

  findByIdUser() {
    this.authService.entrar
    this.authService.logado
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp

      this.alertas.showAlertSuccess('Postagem realizada com sucesso')

      this.postagem = new Postagem()
      this.getAllPostagem()
      this.getAllTemas()
    })
  }

}
