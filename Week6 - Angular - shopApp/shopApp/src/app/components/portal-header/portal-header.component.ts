import { Component, OnInit, Input } from '@angular/core';
import { PortalComponent } from '../portal/portal.component';

@Component({
  selector: 'app-portal-header',
  templateUrl: './portal-header.component.html',
  styleUrls: ['./portal-header.component.scss']
})
export class PortalHeaderComponent implements OnInit {

  constructor(private portalComponent: PortalComponent) { }
  @Input() quantity: number;

  ngOnInit() {

  }


}
