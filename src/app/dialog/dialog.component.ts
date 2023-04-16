import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent{
  conditionProduct : string[] = ["New","Second Hand", "B/Y"]
  productForm !: FormGroup
  constructor(private formBuilder : FormBuilder, private api : ApiService, private dialogRef: MatDialogRef<DialogComponent>){}
  
  ngOnInit(): void{
    this.productForm = this.formBuilder.group({
      productName :["", Validators.required],
      category :["", Validators.required],
      price :["", Validators.required],
      comment :["", Validators.required],
      data :["", Validators.required]
    })
  }

  AddProduct(){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:()=>{
          alert("Product was added succesfully")
          this.productForm.reset()
          this.dialogRef.close("save")
        },
        error:() =>{
          alert("Something went wrong while adding")
        }
      })
    }
  }
}
