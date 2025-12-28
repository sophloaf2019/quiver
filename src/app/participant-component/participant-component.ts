import { Component, input, output, signal } from '@angular/core';
import { Participant } from '../../types/participant';

@Component({
	selector: 'participant-component',
	imports: [],
	templateUrl: './participant-component.html',
	styleUrl: './participant-component.css',
})
export class ParticipantComponent {
	public participant = input.required<Participant>();

	public edited = output<Participant>();
	public deleted = output<Participant>();

	public editState = signal<boolean>(false);
}
