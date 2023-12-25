import {Component, ElementRef, inject, Input, OnInit, ViewChild} from '@angular/core';
import { AuthService } from "../../../../services/auth.service";


 interface HistoryActions {
  history_id: number;
  user_id: number;
  action_description: string;
  short_desc: string;
  timestamp: Date;
}
@Component({
  selector: "app-history-actions",
  templateUrl: "./history-actions.component.html",
  styleUrls: ["./history-actions.component.sass"],
})
export class HistoryActionsComponent implements OnInit {
  public actionsHistory!: HistoryActions[];
  private authService = inject(AuthService);
  @ViewChild('actions',) action!: ElementRef<HTMLElement>

  actionsMenu = {
    menuNumber: 0,
    isOpened: false,
  };

  ngOnInit() {
    this.authService.getHistoryActions().subscribe((response) => {
      this.actionsHistory = response;
    });
  }

  public openActionMenu(index: number): boolean {
    this.actionsMenu.isOpened = false;
    this.actionsMenu.menuNumber = index;
    this.actionsMenu.isOpened = true;
    return this.actionsMenu.isOpened;
  }
  public deleteAction(action_id: number): void {
    this.authService.deleteHistoryAction(action_id).subscribe((response) => {
      this.actionsHistory = this.actionsHistory.filter((action) => {
        this.actionsMenu.isOpened = false;
        return action.history_id !== action_id;
      });
    });
  }
  public sortHistoryActions(sortBy: string): void {
    switch (sortBy) {
      case "sortDesc":
        this.actionsHistory.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        break;
      case "sortAsc":
        this.actionsHistory.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        break;
    }
  }
}
