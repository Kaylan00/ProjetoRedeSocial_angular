import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

import { Moment} from 'src/app/Moments';


import{FormGroup, FormControl, Validators} from '@angular/forms'
@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})

export class MomentFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() btnText!: string;
  @Input() momentData: Moment | null = null;

  constructor() { }

  momentForm!: FormGroup

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id: ''),
      title: new FormControl(this.momentData ? this.momentData.title: '', Validators.required),
      description: new FormControl(this.momentData ? this.momentData.description: '', [Validators.required]),
      image: new FormControl(''),
    })//aqui todos campos que vai ter no formulario
  } //inicializando coisas do angular
  
  get title(){
    return this.momentForm.get('title')! //pegando atributo title do momentfor
  }

  get description(){
    return this.momentForm.get('description')! //pegando atributo title do momentfor
  }

  submit(){
    if(this.momentForm.invalid){
      return;
    }
    this.onSubmit.emit(this.momentForm.value)
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.momentForm.patchValue({ image: file });
  }
  

}
