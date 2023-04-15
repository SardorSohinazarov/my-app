import { Component } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private dialog : Dialog){}
  title = 'my-app';
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
  }
}
