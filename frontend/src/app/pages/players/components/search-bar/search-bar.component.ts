import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlayerService} from "../../../../services/player.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent implements OnInit{
  private fb = inject(FormBuilder)
  private playerService = inject(PlayerService)
  searchForm!:FormGroup;
  constructor() {

  }
  ngOnInit() {
    this.searchForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(3)]],
    })
  }
  onSearch() {
    this.playerService.setSelectedPlayer(this.searchForm.value.name);
  }
}
