import { Component, OnInit } from '@angular/core';
import { AgendamentoService } from 'src/app/services/agendamento.service';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss'],
  standalone: false
})
export class AgendamentosComponent  implements OnInit {
  agendamentos: any[] = [];

  constructor(private agendamentoService: AgendamentoService) { }

  async ngOnInit() {
    await this.carregarAgendamentos();
  }

  async carregarAgendamentos() {
    this.agendamentos = await this.agendamentoService.list();
  }

}
