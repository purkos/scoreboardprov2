import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PlayerService } from "../../../../services/player.service";
import { Player } from "../../../../models/player.model";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.sass"],
})
export class SearchBarComponent implements OnInit {
  @Output() playerName = new EventEmitter<string>();
  searchForm!: FormGroup;
  private fb = inject(FormBuilder);

  players!: Player[];

  ngOnInit() {
    this.searchForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  public onSearch() {
    // this.playerService.setSelectedPlayer(this.searchForm.value.name)
    this.playerName.emit(this.searchForm.value.name);
  }
}
