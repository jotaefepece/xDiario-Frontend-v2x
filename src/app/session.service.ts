import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  likedId: number | null = null;
  dislikedId: number | null = null;

  reset() {
    this.likedId = null;
    this.dislikedId = null;
  }
}

