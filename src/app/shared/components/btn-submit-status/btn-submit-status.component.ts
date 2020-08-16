import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Location } from '@angular/common';

import {
  BTN_SUBMIT_STATUS,
  BTN_SUBMIT_SHOW_BACK_BTN,
} from '../../../core/models/btn-submit/btn-submit-status.type';

@Component({
  selector: 'app-btn-submit-status',
  templateUrl: './btn-submit-status.component.html',
  styleUrls: ['./btn-submit-status.component.scss'],
})
export class BtnSubmitStatusComponent implements OnInit, OnChanges {
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() status: BTN_SUBMIT_STATUS = '';
  @Input() backButton: BTN_SUBMIT_SHOW_BACK_BTN = 'hide';
  showBackButton = false;

  constructor(private location: Location) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.backButton === 'hide') {
      this.showBackButton = false;
      return;
    }
    if (this.backButton === 'show') {
      this.showBackButton = true;
      return;
    }
    if (this.backButton === 'onSuccess') {
      if (this.status === 'success') {
        this.showBackButton = true;
      } else {
        this.showBackButton = false;
      }
    }
  }

  goBack() {
    this.location.back();
  }
}
