import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UploadService } from '../../services/file-upload.service';
@Component({
  selector: 'app-edit-artical',
  templateUrl: './edit-artical.component.html',
  styleUrls: ['./edit-artical.component.scss']
})
export class EditArticalComponent implements OnInit {
  editForm: FormGroup;
  submitted: false;
 

  constructor(private actRoute: ActivatedRoute,private router: Router, public fb: FormBuilder,public uploadService: UploadService) { }

  ngOnInit() {
    this.updateArtical();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getArtical(id);
    this.editForm = this.fb.group({
      Image: ['', [Validators.required]],
      ImageDesc: ['', [Validators.required, ]],
      
    })
  }
  getArtical(id: any) {
    throw new Error("Method not implemented.");
  }
  updateArtical() {
    throw new Error("Method not implemented.");
  }
  updateProfile(e) {
    this.editForm.get('designation').setValue(e, {
      onlySelf: true
    })
  }
  get myForm() {
    return this.editForm.controls;
  }
  getArticals(id) {
    this.uploadService.getArticals().subscribe(data => {
      this.editForm.setValue({
        Image: data['Image'],
        ImageDesc: data['ImageDesc'],
        
      });
    });
  }
  updateArticals() {
    this.editForm = this.fb.group({
      Image: ['', [Validators.required]],
      ImageDesc: ['', [Validators.required,]],
      
    })
  }
  // submitForm() {
    
  //   if (!this.editForm.valid) {
  //     return false;
  //   } else {
  //     if (window.confirm('Are you sure?')) {
  //       let id = this.actRoute.snapshot.paramMap.get('id');
  //       this.uploadService.updateArticals(id, this.editForm.value)
  //         .subscribe(res => {
  //           console.log('Content updated successfully!')
  //         }, (error) => {
  //           console.log(error)
  //         })
  //     }
  //   }
  // }
}
