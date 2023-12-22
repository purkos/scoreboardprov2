import { Component, inject, OnInit } from "@angular/core";
import { PlayerService } from "../../services/player.service";
import { AuthService } from "../../services/auth.service";

export interface FavoritePlayer {
  favorite_id: number;
  user_id: number;
  player_id: number;
  // Add other properties if needed
}

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.sass"],
})
export class ProfileComponent implements OnInit {
  private playerService = inject(PlayerService);
  private authService = inject(AuthService);
  public favoritePlayers!: FavoritePlayer[];
  public favoritePlayersList!: FavoritePlayer[];
  actionsMenu = {
    menuNumber: 0,
    isOpened: false,
  };
  actions: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  ngOnInit() {
    this.playerService.getFavoritePlayers().subscribe((response) => {
      this.favoritePlayers = response;
    });
    this.authService.getHistoryActions().subscribe((response)=> {
      console.log(response)
    })
  }

  public openActionMenu(index: number): boolean {
    this.actionsMenu.isOpened = false;
    this.actionsMenu.menuNumber = index;
    this.actionsMenu.isOpened = true;
    return this.actionsMenu.isOpened;
  }
}
