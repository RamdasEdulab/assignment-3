import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,NgForm } from "@angular/forms";
import { UploadService } from "../../services/file-upload.service";
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
 preview: string;
  form: FormGroup;
  percentDone: any = 0;
  articals = [];
  

  

  constructor(public dialogRef: MatDialogRef<DialogComponent>, 
    public fb: FormBuilder,
    
    public fileUploadService: UploadService
  ) {
    // Reactive Form
    this.form = this.fb.group({
      ImageDesc: [''],
      Image: ['']
    })
  }
  
  

  ngOnInit():void { }
    uploadFile(event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({
        Image: file
      });
      this.form.get('Image').updateValueAndValidity()
  
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result as string;
      }
      reader.readAsDataURL(file)
    }
  
    submitForm() {
      this.fileUploadService.addUser(
        this.form.value.ImageDesc,
        this.form.value.Image
      ).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.percentDone = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.percentDone}%`);
            break;
          case HttpEventType.Response:
            console.log('article successfully created!', event.body);
            this.percentDone = false;
           
        }
      })
    }
}
  