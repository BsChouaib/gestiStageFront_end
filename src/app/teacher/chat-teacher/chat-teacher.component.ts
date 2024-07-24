import { Component, OnInit } from '@angular/core';
import { FormsModule, UntypedFormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-chat-teacher',
  standalone: true,
  imports: [NgScrollbarModule,MatFormFieldModule,FormsModule,MatInputModule],
  templateUrl: './chat-teacher.component.html',
  styleUrl: './chat-teacher.component.scss'
})
export default class ChatTeacherComponent implements OnInit{
  hideRequiredControl = new UntypedFormControl(false);
  constructor(){

  }
  ngOnInit(): void {
    
  }

}
