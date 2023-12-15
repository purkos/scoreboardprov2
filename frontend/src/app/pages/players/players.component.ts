// players.component.ts
import {Component, inject, OnInit} from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player.model';

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.sass'],
})
export class PlayersComponent implements OnInit {
    private playerService = inject(PlayerService);
    selectedPlayer: string = '';
    players: Player[] = []; // Make sure Player is the correct type

    ngOnInit() {
        this.playerService.selectedPlayer$.subscribe((playerName) => {
            this.selectedPlayer = playerName;
            if (playerName) {
                this.playerService.getPlayersDetails(playerName).subscribe(
                    (data) => {
                        this.players = data;
                        console.log(data); // Assuming data is an array of players
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            }
        });
    }
}
