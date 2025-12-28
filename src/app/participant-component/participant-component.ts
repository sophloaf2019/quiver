import { Component, input, output, signal } from '@angular/core';
import { Participant } from '../../types/participant';
import { Field, form, required, validate } from '@angular/forms/signals';

@Component({
	selector: 'participant-component',
	imports: [Field],
	templateUrl: './participant-component.html',
	styleUrl: './participant-component.css',
})
export class ParticipantComponent {
	public participant = input.required<Participant>();
	public participantSignal = signal<Participant>({
		id: 0,
		name: '',
		ammo: 0,
		maxAmmo: 0,
	});
	public participantForm = form(this.participantSignal, (schema) => {
		required(schema.name, { message: 'You need to supply a name.' });
		validate(schema.maxAmmo, ({ value }) => {
			const maxAmmo = value();
			if (maxAmmo <= 0) {
				return { kind: '', message: 'Max ammo cannot be less than zero.' };
			}
			return null;
		});
	});

	public edited = output<Participant>();
	public deleted = output<Participant>();

	public editState = signal<boolean>(false);

	ngOnInit() {
		this.participantSignal.set(this.participant());
	}

	editsSubmitted(e: Event) {
		e.preventDefault();
		if (this.participantForm().valid()) {
			this.edited.emit(this.participantForm().value());
			return;
		}
		this.participantForm().markAsTouched();
	}

	ammoBump(amt: number) {
		const current = this.participant();
		this.edited.emit({
			...current,
			ammo: Math.max(0, Math.min(current.ammo + amt, current.maxAmmo)),
		});
	}

	reload() {
		const current = this.participant();
		this.edited.emit({
			...current,
			ammo: current.maxAmmo,
		});
	}
}
