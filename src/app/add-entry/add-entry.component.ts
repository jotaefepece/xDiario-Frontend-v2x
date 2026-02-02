import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntriesService } from '../entries.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-add-entry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent {
  texto: string = '';
  showError = false;
  errorMessage = '';

  constructor(
    private service: EntriesService,
    public session: SessionService
  ) {}

  isFormValid(): boolean {
    return (
      this.session.likedId !== null &&
      this.session.dislikedId !== null &&
      this.texto.trim().toLowerCase().startsWith('hoy') &&
      this.texto.trim().length >= 5
    );
  }

  checkForm() {
    // Ocultamos el error cuando el usuario empieza a corregir
    this.showError = false;
  }

  submitEntry() {
    if (this.isFormValid()) {
      this.service.addEntry(this.texto).subscribe({
        next: () => {
          this.texto = '';
          this.session.reset();
          this.showError = false;
          window.location.reload(); // o puedes mostrar un mensaje de éxito bonito
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Hubo un error al guardar. Intenta de nuevo.';
          this.showError = true;
        }
      });
    } else {
      this.errorMessage = 'Aún faltan requisitos por cumplir. Revisa la lista superior.';
      this.showError = true;
    }
  }
}
