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

  // lista de horario
  horariosDisponiveis: string[] = []; 

  constructor(private router: Router) {
    if (typeof globalThis !== 'undefined' && (globalThis as any).localStorage) {
      const chosen = (globalThis as any).localStorage.getItem('barbeiro');
      if (chosen) {
        this.barbeiro = chosen;
      }
    }
    this.gerarHorarios(); // Popula a lista de horarios
  }

  // gerador de horario de 30 em 30 min 
  gerarHorarios() {
    this.horariosDisponiveis = [];
    // loop até 17:30
    for (let h = 8; h <= 17; h++) {
      for (let m = 0; m < 60; m += 30) {
        const horaStr = h.toString().padStart(2, '0');
        const minStr = m.toString().padStart(2, '0');
        this.horariosDisponiveis.push(`${horaStr}:${minStr}`);
      }
    }
    // add o ultimo horário, 18:00
    this.horariosDisponiveis.push('18:00');
  }

  // func para selecionar o horario
  selecionarHora(h: string) {
    this.hora = h;
  }

  confirmarAgendamento() {
    // detalhes do agendamento
    this.modalDetails = `Barbeiro: ${this.barbeiro || '—'}\nServiço: ${this.servico || '—'}\nData: ${this.data || '—'}\nHora: ${this.hora || '—'}\nNome: ${this.nome || '—'}\nTelefone: ${this.telefone || '—'}`;
    this.modalOpen = true;
  }

  // fecha o modal e volta pro Home
  fecharModal() {
    this.modalOpen = false;
    this.backHome(); 
  }

  backHome() {
    this.router.navigate(['/']);
  }
}