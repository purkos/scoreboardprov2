import { Component, inject, Input, OnInit } from "@angular/core";
import { Player } from "../../../models/player.model";
import { AuthService } from "../../../services/auth.service";
import { PlayerService } from "../../../services/player.service";
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.sass"],
})
export class PlayerComponent implements OnInit {
  @Input() playerInfo!: Player;
  responseMessage: string = "";
  // isAddedToFav = new BehaviorSubject<boolean>(false);
  isAddedToFav: boolean = false;
  public authService = inject(AuthService);
  private playerService = inject(PlayerService);
  public isImageAvailable(): boolean {
    return !!this.playerInfo.strCutout;
  }
  onAddToFav(playerId: string) {
    this.playerService.addPlayerToFav(playerId).subscribe(
      (response) => {
        this.responseMessage = response.message;
        this.isAddedToFav = true;
        setTimeout(() => {
          this.responseMessage = "";
        }, 1000);
      },
      (error) => console.error("Error:", error),
    );
  }
  onIsInFav(playerId: string) {
    this.playerService.isInFavorites(playerId).subscribe(
      (response) => {
          this.isAddedToFav = response
      },
      (error) => {
        console.error(error);
      },
    );

  }
  onRemoveFav(playerId: string) {
    this.playerService.removePlayerFromFav(playerId).subscribe(
        (response)=> {
          this.isAddedToFav = !response
        },
        (error) => {
          console.error(error)
        }
    )
  }
  ngOnInit() {
    this.onIsInFav(this.playerInfo.idPlayer);
  }
}
