import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskManagementPageComponent } from "./pages/task-management-page/task-management-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [TaskManagementPageComponent],
})
export class AppComponent implements OnInit {
  
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  title = 'TaskManagementApp';



}
