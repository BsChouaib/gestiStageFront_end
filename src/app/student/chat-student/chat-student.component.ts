import { Component, OnInit } from '@angular/core';
import { FormsModule, UntypedFormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-chat-student',
  standalone: true,
  imports: [NgScrollbarModule,MatFormFieldModule,FormsModule,MatInputModule],
  templateUrl: './chat-student.component.html',
  styleUrl: './chat-student.component.scss'
})
export default class ChatStudentComponent implements OnInit{
  hideRequiredControl = new UntypedFormControl(false);
  constructor(){

  }
  ngOnInit(): void {
    
  }

}
