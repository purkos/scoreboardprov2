import {Component, inject, Input} from '@angular/core';
import { Player } from "../../../models/player.model";
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.sass"],
})
export class PlayerComponent {
  @Input() playerInfo!: Player;

  public authService = inject(AuthService);

}
