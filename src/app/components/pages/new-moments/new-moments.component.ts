import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moments';
import { MomentService } from 'src/app/services/momment.service';

@Component({
  selector: 'app-new-moments',
  templateUrl: './new-moments.component.html',
  styleUrls: ['./new-moments.component.css']
})
export class NewMomentsComponent implements OnInit {
  btnText = 'Compartilhar';

  constructor(private momentService: MomentService) { }

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
  }
}
