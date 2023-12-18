import { inject, Injectable } from "@angular/core";
import {BehaviorSubject, catchError, map, Observable, throwError} from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { enviroment } from "../enviroment/enviroment";
import { Player } from "../models/player.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class PlayerService {
  readonly apiSoccerUrl = enviroment.soccerApiUrl;
  userId!: number;
  readonly backendUrl = enviroment.apiUrl;
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  public searchPlayer(playerName: string): Observable<Player[]> {
    return this.http
      .get<Player[]>(`${this.apiSoccerUrl}/searchplayers.php?p=${playerName}`)
      .pipe(
        map((response: any) => response.player as Player[]),
        map((players: Player[]) => {
          // Filter the players based on the strSport property
          return players.filter((player) => player.strSport === "Soccer");
        }),
      );
  }
  public addPlayerToFav(playerId: string): Observable<any> {
    const user = this.authService.getUserData();
    const payload = { playerId: playerId, userId: user.userId };

    return this.http
      .post<any>(`${this.backendUrl}/player/addToFav`, payload)
      .pipe(
        catchError((error) => {
          console.error("Error adding player to favorites", error);
          return throwError(error);
        }),
      );

  }
  public isInFavorites(playerId: string):Observable<boolean>{
      const user = this.authService.getUserData()
      return this.http.get<boolean>(`${this.backendUrl}/player/isFav?userId=${user.userId}&playerId=${playerId}`)
  }

}
