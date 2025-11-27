import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule.html',
  styleUrls: ['./schedule.css']
})
export class ScheduleComponent {
  barbeiro = '';
  servico = '';
  data = '';
  hora = '';
  nome = '';
  telefone = '';
  modalOpen = false;
  modalDetails = '';

  constructor(private router: Router) {
    // read any chosen barber from localStorage
    // localStorage isn't available during server-side rendering — gate access
    if (typeof globalThis !== 'undefined' && (globalThis as any).localStorage) {
      const chosen = (globalThis as any).localStorage.getItem('barbeiro');
      if (chosen) {
        this.barbeiro = chosen;
      }
    }
  }

  confirmarAgendamento() {
    // build details and open modal
    this.modalDetails = `Barbeiro: ${this.barbeiro || '—'}\nServiço: ${this.servico || '—'}\nData: ${this.data || '—'}\nHora: ${this.hora || '—'}\nNome: ${this.nome || '—'}\nTelefone: ${this.telefone || '—'}`;
    this.modalOpen = true;
  }

  fecharModal() {
    this.modalOpen = false;
  }

  backHome() {
    this.router.navigate(['/']);
  }
}
