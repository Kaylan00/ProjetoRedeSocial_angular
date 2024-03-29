import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'src/app/Moments';
import { MomentService } from 'src/app/services/momment.service';
import { MensagensService } from 'src/app/services/mensagens.service';
@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {
  moment!: Moment
  btnTExt: string = 'Editar'
  constructor(private momentService: MomentService,
    private route: ActivatedRoute,
    private mensagensService: MensagensService,
    private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.momentService.getMoment(id).subscribe(item =>{
      this.moment = item.data;
    })
  }
  async editHandler(momentData: Moment){
    
    const id = this.moment.id

    const formData = new FormData()

    formData.append('title', momentData.title)
    formData.append('description', momentData.description)

    if(momentData.image){
      formData.append('image', momentData.image)
    }
    await this.momentService.updateMoment(id!, formData).subscribe()  

    this.mensagensService.adicionar(`Publicação ${id} atualizada com sucesso!`) 
    this.router.navigate(['/'])
  }

}
