import { Component, input } from '@angular/core';
import { Participant } from '../../types/participant';

@Component({
	selector: 'participant-component',
	imports: [],
	templateUrl: './participant-component.html',
	styleUrl: './participant-component.css',
})
export class ParticipantComponent {
	public participant = input<Participant>();
}
