import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UploadModule } from './upload/upload.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EditArticalComponent } from './upload/edit-artical/edit-artical.component';

@NgModule({
  declarations: [
    AppComponent,
    EditArticalComponent
  ],
  imports: [
    BrowserModule,
    UploadModule,
    FormsModule,ReactiveFormsModule,
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
