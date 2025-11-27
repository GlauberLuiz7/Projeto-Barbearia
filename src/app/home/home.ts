import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  selectBarbeiro(name: string) {
    // keep behavior similar to original code: store selected barber then navigate
    localStorage.setItem('barbeiro', name);
    this.router.navigate(['/agendamento']);
  }
}
