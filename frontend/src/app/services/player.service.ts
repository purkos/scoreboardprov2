import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroment/enviroment';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private selectedPlayerSubject = new BehaviorSubject<string>('');
  readonly apiSoccerUrl = enviroment.soccerApiUrl;

  selectedPlayer$: Observable<string> = this.selectedPlayerSubject.asObservable();

  constructor(private http: HttpClient) {}

  setSelectedPlayer(playerName: string): void {
    this.selectedPlayerSubject.next(playerName);
  }

  getSelectedPlayer(): Observable<string> {
    return this.selectedPlayerSubject.asObservable();
  }

  getPlayersDetails(playerName: string): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiSoccerUrl}/searchplayers.php?p=${playerName}`);
  }
}
