import { Component } from '@angular/core';
import { EntriesComponent } from './entries/entries.component';
import { AddEntryComponent } from './add-entry/add-entry.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EntriesComponent, AddEntryComponent],  // <-- quita RouterOutlet
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}

