// players.component.ts
import { Component, inject, OnInit } from "@angular/core";
import { PlayerService } from "../../services/player.service";
import { Player } from "../../models/player.model";
import {AuthService} from '../../services/auth.service';

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.sass"],
})
export class PlayersComponent implements OnInit {
  private playerService = inject(PlayerService);
  public isLoading: boolean = false;
  selectedPlayer: string = "";
  players!: Player[];

  ngOnInit() {
    // this.playerService.selectedPlayer$.subscribe((playerName) => {
    //   this.selectedPlayer = playerName;
    //   if (playerName) {
    //     this.playerService.getPlayersDetails(playerName).subscribe(
    //       (data) => {
    //         this.players = data;
    //         console.log(data); // Assuming data is an array of players
    //       },
    //       (error) => {
    //         console.error(error);
    //       },
    //     );
    //   }
    // });
    this.playerService.selectedPlayer$.subscribe((playerName)=> {
      this.selectedPlayer = playerName
      if(playerName) {
        this.searchPlayer(playerName)
      }
    })
  }
  private searchPlayer(playerName: string) {
    this.isLoading= true;
    this.playerService.searchPlayer(playerName).subscribe(
      (players) => {
        this.players = players;
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false
      },
    );
  }
}
