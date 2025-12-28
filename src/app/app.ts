import { Component, signal } from '@angular/core';
import { Participant } from '../types/participant';
import { ParticipantComponent } from './participant-component/participant-component';

@Component({
	selector: 'app-root',
	templateUrl: './app.html',
	styleUrl: './app.css',
	imports: [ParticipantComponent],
})
export class App {
	public participants = signal<Participant[]>([]);

	addNewParticipant() {
		let newOne: Participant = {
			name: 'New participant',
			ammo: 1,
			maxAmmo: 10,
		};
		this.participants.set([...this.participants(), newOne]);
	}
}
