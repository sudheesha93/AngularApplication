import { Component, OnInit } from '@angular/core'; 
import { IProduct } from './product';
import { ProductService } from './product.service' ;

@Component({ 
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

    pageTitle: string= 'Product List';
    imageWidth: number=50;
    imageMargin: number=2;
    
    _listFilter: string;
    get listFilter():string{
        return this._listFilter;
    }
    set listFilter(value:string){
        this._listFilter=value;
        this.filteredProducts=this.listFilter? this.performFilter(this.listFilter): this.products;
    }

    showImage: boolean=false;
    
    filteredProducts: IProduct[];
    products: IProduct[] =[];

    toggleImage(): void {
        this.showImage =! this.showImage;
    }

    onRatingClicked(message : string): void{
        this.pageTitle='Product List: ' + message;

    }
    // from the OnInit interface
    ngOnInit(): void{
        this.products=this.productService.getProducts();
        this.filteredProducts=this.products;
    }

    constructor(private productService: ProductService){}
 

    performFilter(filterBy: string): IProduct[]{
        filterBy=filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct)=>
        product.productName.toLocaleLowerCase().indexOf(filterBy)!==-1);
    }
}