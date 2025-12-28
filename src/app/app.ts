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
			id: Math.floor(Math.random() * 1000000),
			name: 'New participant',
			ammo: 10,
			maxAmmo: 10,
		};
		this.participants.set([...this.participants(), newOne]);
	}

	editReceived(p: Participant) {
		this.participants.update((participants) =>
			participants.map((existingP) => (existingP.id === p.id ? p : existingP)),
		);
	}

	deleteParticipant(p: Participant) {
		this.participants.update((participants) =>
			participants.filter((existingP) => existingP.id !== p.id),
		);
	}

	reloadAll() {
		this.participants.update((participants) =>
			participants.map((p) => ({
				...p,
				ammo: p.maxAmmo,
			})),
		);
	}

	deleteAll() {
		this.participants.set([]);
	}
}
