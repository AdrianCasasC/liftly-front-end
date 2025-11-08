import { Component, input, output } from '@angular/core';

@Component({
  selector: 'liftly-add-button',
  imports: [],
  templateUrl: './add-button.html',
  styleUrl: './add-button.scss',
})
export class AddButton {

  /*Inputs */
  saveButtonText = input<string>('Guardar');
  cancelButtonText = input<string>('Cancelar');
  addButtonText = input<string>('Añadir');
  title = input<string>('Añadir');
  buttonType = input<'button' | 'reset' | 'submit'>('button');
  disabled = input<boolean>(false);

  /* Outputs */
  save = output<void>();
  cancel = output<void>();
  add = output<void>();

  onSave(): void {
    this.save.emit();
  }
  
  onCancel(): void {
    this.cancel.emit();
  }
  
  onAdd(): void {
    this.add.emit();
  }

}
