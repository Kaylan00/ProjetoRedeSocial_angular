import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moments';
import { MomentService } from 'src/app/services/momment.service';

import { MensagensService } from 'src/app/services/mensagens.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-new-moments',
  templateUrl: './new-moments.component.html',
  styleUrls: ['./new-moments.component.css']
})
export class NewMomentsComponent implements OnInit {
  btnText = 'Compartilhar';

  constructor(private momentService: MomentService,
     private mensagensServices: MensagensService,
     private router: Router) { }

  ngOnInit(): void {
  }

  async createHandler(moment: any) {
    const formData = new FormData();

    formData.append("title", moment.title);
    formData.append("description", moment.description);

    if (moment.image) {
      formData.append('image', moment.image)
    }

    // Chame o método createMoment dentro da função createHandler
    this.momentService.createMoment(formData).subscribe();

    this.mensagensServices.adicionar('Adicionado com sucesso!')

    this.router.navigate(['/'])
  }
}
