import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  currentYear: any;
  brandTitle = '';

  constructor() {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.brandTitle = environment.brandTitle;
  }
}
