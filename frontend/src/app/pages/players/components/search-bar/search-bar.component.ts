import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PlayerService } from "../../../../services/player.service";
import { Player } from "../../../../models/player.model";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.sass"],
})
export class SearchBarComponent implements OnInit {
  searchForm!: FormGroup;
  private fb = inject(FormBuilder);
  private playerService = inject(PlayerService);
  players!: Player[];

  ngOnInit() {
    this.searchForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  public onSearch() {
    this.playerService.setSelectedPlayer(this.searchForm.value.name)

  }
}
