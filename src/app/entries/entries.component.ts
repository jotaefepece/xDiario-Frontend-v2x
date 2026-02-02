import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntriesService } from '../entries.service';
import { SessionService } from '../session.service';   // <-- importa el servicio

@Component({
  selector: 'app-entries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {
  entries: any[] = [];

  // Aquí declaramos la propiedad 'session'
  constructor(
    private service: EntriesService,
    public session: SessionService   // <-- propiedad pública accesible en el HTML
  ) {}

  ngOnInit() {
    this.loadEntries();
  }

  loadEntries() {
    this.service.getEntries().subscribe({
      next: (data) => this.entries = data,
      error: (err) => console.error("Error cargando entradas", err)
    });
  }

  like(id: number) {
    if (this.session.likedId !== null) {
      alert("Ya diste un like en esta visita");
      return;
    }
    if (this.session.dislikedId === id) {
      alert("No puedes dar like y dislike a la misma entrada");
      return;
    }

    this.service.likeEntry(id).subscribe({
      next: () => {
        this.session.likedId = id;
        this.loadEntries();
      },
      error: (err) => console.error("Error al dar like", err)
    });
  }

  dislike(id: number) {
    if (this.session.dislikedId !== null) {
      alert("Ya diste un dislike en esta visita");
      return;
    }
    if (this.session.likedId === id) {
      alert("No puedes dar dislike y like a la misma entrada");
      return;
    }

    this.service.dislikeEntry(id).subscribe({
      next: () => {
        this.session.dislikedId = id;
        this.loadEntries();
      },
      error: (err) => console.error("Error al dar dislike", err)
    });
  }
}

