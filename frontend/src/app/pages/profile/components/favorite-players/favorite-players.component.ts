import { Component, inject, OnInit } from "@angular/core";
import { PlayerService } from "../../../../services/player.service";

interface FavoritePlayer {
  favorite_id: number;
  user_id: number;
  player_id: number;
  // Add other properties if needed
}
@Component({
  selector: "app-favorite-players",
  templateUrl: "./favorite-players.component.html",
  styleUrls: ["./favorite-players.component.sass"],
})
export class FavoritePlayersComponent implements OnInit {
  private playerService = inject(PlayerService);
  public favoritePlayersList: any[] = [];

  ngOnInit() {
    this.playerService.getFavoritePlayers().subscribe((favPlayer) => {
      for (let player of favPlayer) {
        this.playerService
          .getPlayerById(player.player_id)
          .subscribe((playerInfo) => {
            this.favoritePlayersList.push(playerInfo);
          });
      }
    });
  }
  public sortFavorites(sortBy: string): void {
    switch (sortBy) {
      case "sortDesc":
        // this.fa.sort((a, b) => a.strPlayer.localeCompare(b.strPlayer));
        this.favoritePlayersList.sort((a,b)=>a.strPlayer.localeCompare(b.strPlayer))
        break;
      case "sortAsc":
        this.favoritePlayersList.sort((a,b)=> b.strPlayer.localeCompare(a.strPlayer))
        break;
    }
  }
}
