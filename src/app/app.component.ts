import { Component , OnInit, ViewChild} from "@angular/core";
import { MatDialog} from "@angular/material/dialog";
import { DialogComponent } from "./dialog/dialog.component";
import { ApiService } from "./services/api.service";
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private dialog : MatDialog, private api: ApiService){}
  
  displayedColumns: string[] = ['productName', 'category', 'price', 'data', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
    ngOnInit(): void{
      this.getAllProducts()
    }

  title = 'Phone Store';
  openDialog() {
    this.dialog.open(DialogComponent,{
      width:"50%"
    }).afterClosed().subscribe(res =>{
      if(res == "save"){
        this.getAllProducts()
      }
    });
  }

  getAllProducts(){
    this.api.getProducts()
      .subscribe(
        {
          next:(res) => {
            this.dataSource = new MatTableDataSource(res)
            this.dataSource.paginator = this.paginator
            this.dataSource.sort = this.sort
          },
          error:() => {
            alert("Something went wrong while getting products")
          }
        }
      )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any){
    this.dialog.open(DialogComponent,{
      width: '50%',
      data: row
    })
    .afterClosed().subscribe(res =>{
      if(res == "update"){
        this.getAllProducts()
      }
    });
  }

  deleteProduct(id: number){
    this.api.deleteProduct(id)
    .subscribe({
        next:(res) => {
          alert("Product deleted successfully")
          this.getAllProducts()
        },
        error:() => {
          alert("Something went wrong while deleting products")
        }
      })
  }
}
