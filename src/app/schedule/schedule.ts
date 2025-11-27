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

  // Array para armazenar os horários disponíveis (8:00 a 18:00)
  horariosDisponiveis: string[] = []; 

  constructor(private router: Router) {
    if (typeof globalThis !== 'undefined' && (globalThis as any).localStorage) {
      const chosen = (globalThis as any).localStorage.getItem('barbeiro');
      if (chosen) {
        this.barbeiro = chosen;
      }
    }
    this.gerarHorarios(); // Popula o array de horários ao iniciar
  }

  // Função para gerar horários de 30 em 30 minutos
  gerarHorarios() {
    this.horariosDisponiveis = [];
    // Loop de 8h às 17h
    for (let h = 8; h <= 17; h++) {
      for (let m = 0; m < 60; m += 30) {
        const horaStr = h.toString().padStart(2, '0');
        const minStr = m.toString().padStart(2, '0');
        this.horariosDisponiveis.push(`${horaStr}:${minStr}`);
      }
    }
    // Adiciona o último horário, 18:00
    this.horariosDisponiveis.push('18:00');
  }

  // Função para selecionar o horário ao clicar no botão
  selecionarHora(h: string) {
    this.hora = h;
  }

  confirmarAgendamento() {
    // Monta os detalhes do agendamento para o modal
    this.modalDetails = `Barbeiro: ${this.barbeiro || '—'}\nServiço: ${this.servico || '—'}\nData: ${this.data || '—'}\nHora: ${this.hora || '—'}\nNome: ${this.nome || '—'}\nTelefone: ${this.telefone || '—'}`;
    this.modalOpen = true;
  }

  // Modificado: Fecha o modal e navega para a Home
  fecharModal() {
    this.modalOpen = false;
    this.backHome(); 
  }

  backHome() {
    this.router.navigate(['/']);
  }
}