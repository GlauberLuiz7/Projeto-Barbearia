import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ScheduleComponent } from './schedule/schedule';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'agendamento', component: ScheduleComponent },
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];
