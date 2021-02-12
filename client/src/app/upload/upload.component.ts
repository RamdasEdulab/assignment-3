import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { UploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent {
  Articals: any = [];
  constructor(public dialog: MatDialog, public uploadService: UploadService) {  this.getArticals();}

  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent, { width: '50%', height: '50%' });
  }


ngOnInit() { }

  getArticals() {
    this.uploadService.getArticals().subscribe((res) => {
      this.Articals = res['articals'];
    })
  }

}
