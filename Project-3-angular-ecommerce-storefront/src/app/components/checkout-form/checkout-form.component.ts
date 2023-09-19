import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cart-item';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule} from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css'],
})
export class CheckoutFormComponent {
  checkoutItems: CartItem[] = [];

  name: string = 'Enter Name';
  address: string = 'Enter Address';
  cardnum: number = 10000000000000000;
  totalCost: number = 0;
  myFormControl = new FormControl('', [Validators.minLength(5), Validators.pattern('^[0-9]+$')]);

  nameValid: boolean = true;
  addressValid: boolean = true;
  cardNumValid: boolean = true;
  cardNumLarge: boolean =false;
  cardNumSmall: boolean =false;


  constructor(
    private cartService: CartService,
    private router: Router,
    private fb: FormBuilder,
  ) {


  }

  nameChanged(): void {
    console.log(this.name);
    if (this.name.length < 6)  {
      this.nameValid = false;
    } else {
      this.nameValid = true;
    }
  }

  cardNumChanged(): void {
    console.log(this.cardnum);

    if(this.cardnum > 9999999999999999) {
      this.cardNumValid = false;
      this.cardNumLarge=true;
    } else if (this.cardnum < 10000000000000000){
      this.cardNumValid = false;
      this.cardNumSmall=true;
    }
    else {
      this.cardNumSmall=false;
      this.cardNumLarge=false;
      this.cardNumValid=true;
    }

  }

  addressChanged(): void {

    if (this.address.length < 10)  {
      this.addressValid = false;
    } else {
      this.addressValid = true;
    }
  }


  ngOnInit(): void {
    this.checkoutItems = this.cartService.GetAllItems();

    this.totalCost = this.cartService.GetTotalCost();
  }

  onSubmit(): void {
    this.router.navigate(['/confirmation', this.name]);
  }
}
