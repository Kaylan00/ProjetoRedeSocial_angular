import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/momment.service';
import { Moment } from 'src/app/Moments';
import { Comments } from 'src/app/Comments';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { environment } from 'src/environments/environment';

import { Router, ActivatedRoute, Route } from '@angular/router';
import { MensagensService } from 'src/app/services/mensagens.service';
import { CommentsService } from 'src/app/services/comments.service';


@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {

  baseApiUrl = environment.baseApiUrl
  moment?: Moment

  commentForm!: FormGroup
  constructor(private momentService: MomentService, 
    private route: ActivatedRoute,
    private mensagensService: MensagensService,
    private router: Router,
    private commentService: CommentsService,
    ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.momentService.getMoment(id)
    .subscribe(item => this.moment = item.data)
    //ativando app

    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
    })
  }

  get text(){
    return this.commentForm.get('text')!
  }
  get username(){
    return this.commentForm.get('username')!
  }
  //pegar resultado do comentario
  async removeHandler(id: number){
    await this.momentService.removeMoment(id).subscribe()

    this.mensagensService.adicionar('Post excluído com sucesso!')

    this.router.navigate(['/'])
  }

  async onSubmit(formDirective: FormGroupDirective){
   
    if(this.commentForm.invalid){
      return
    }

    const data: Comments = this.commentForm.value

    data.momentId = Number (this.moment!.id)
    //colocando id do momento
    await this.commentService.createComment(data).subscribe((comment) => this.moment!.comments!.push(comment.data))

    this.mensagensService.adicionar("Comentário adicionado")
    //resetando form
    this.commentForm.reset()

    formDirective.resetForm()
  }
  test(){
    console.log(this.moment?.comments)
  }
  //sendo form directive para trazer os dados

}
