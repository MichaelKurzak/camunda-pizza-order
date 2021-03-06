import {Component, OnInit} from '@angular/core';
import {PopupService} from '../../services/popup.service';
import {EmitterMessages} from "../../model/emitter-messages";

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {

  constructor(private popupService: PopupService) {
    this.popupService.emitChange(EmitterMessages.ORDER_SUMMARY);
    this.popupService.changeEmitted$.subscribe(text => {
      if (text === EmitterMessages.ORDER_APPROVED) {
        document.getElementById('title-text').innerHTML = 'Thank you!<br />Your order has been <span class="text-orange">approved.</span>';
      }
      if (text === EmitterMessages.ORDER_DECLINED) {
        document.getElementById('title-text').innerHTML = 'Thank you!<br />Your order has been <span class="text-orange">declined.</span>';
      }
    });
  }

  ngOnInit() {
  }

}
