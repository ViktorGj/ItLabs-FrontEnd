import { Component, OnInit, Input } from '@angular/core';
import { PortalComponent } from '../portal/portal.component';

@Component({
  selector: 'app-portal-header',
  templateUrl: './portal-header.component.html',
  styleUrls: ['./portal-header.component.scss']
})
export class PortalHeaderComponent implements OnInit {

  constructor(private portalComponent: PortalComponent) { }
  cartQuantity: number;

  ngOnInit() {
    this.cartQuantity = localStorage.length;
  }

}
