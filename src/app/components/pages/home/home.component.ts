import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/momment.service';

import { Moment } from 'src/app/Moments';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allMoments: Moment[]=[] //pegar momentos do banco
  moments: Moment[]=[] //filtro dos moments
  baseApiUrl= environment.baseApiUrl

  //tem q fazer todo search
  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((itens) =>{

      const data = itens.data
      data.map((item) =>{
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-br'
        )
      });
      this.allMoments = data
      this.moments = data
    })
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
  
    this.moments = this.allMoments.filter(moment => {
      return moment.title.toLowerCase().includes(value.toLowerCase());
    });
  }

}
