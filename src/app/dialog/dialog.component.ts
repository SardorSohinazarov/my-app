import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent{
  actionBtn: string = "Save"
  conditionProduct : string[] = ["New","Second Hand", "B/Y"]
  productForm !: FormGroup
  constructor(
    private formBuilder : FormBuilder,
    private api : ApiService, 
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any
  ){}
  
  ngOnInit(): void{
    this.productForm = this.formBuilder.group({
      productName :["", Validators.required],
      category :["", Validators.required],
      price :["", Validators.required],
      comment :["", Validators.required],
      data :["", Validators.required]
    })
    if(this.editData){
      this.actionBtn = "Update"
      this.productForm.controls['productName'].setValue(this.editData.productName)
      this.productForm.controls['category'].setValue(this.editData.category)
      this.productForm.controls['price'].setValue(this.editData.price)
      this.productForm.controls['data'].setValue(this.editData.data)
    }
    console.log(this.editData)
  }

  AddProduct(){
    if(!this.editData)
    {
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
    }else{
      this.updateProduct()
    }
  }

  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next:() => {
        alert("Product was updated succesffully")
        this.productForm.reset()
        this.dialogRef.close("update")
      },
      error:() =>{
        alert("Something went wrong while updating")
      }
    })
  }

  deleteProduct() {
    this.api.deleteProduct(this.editData.id)
    .subscribe({
      next:() => {
        alert("Product was deleted succesffully")
        this.productForm.reset()
        this.dialogRef.close("delete")
      },
      error:() =>{
        alert("Something went wrong while deleting")
      }
    })
  }
}
