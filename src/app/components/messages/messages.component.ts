import { Component, OnInit } from '@angular/core';

import { MensagensService } from 'src/app/services/mensagens.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public mensagensServices: MensagensService) { }

  ngOnInit(): void {
  }
  
}
