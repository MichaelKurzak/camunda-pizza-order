import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PopupService} from "../../services/popup.service";
import {DataService} from "../../services/data.service";
import {EmitterMessages} from "../../model/emitter-messages";

@Component({
  selector: 'app-pizzeria-answered',
  templateUrl: './pizzeria-answered.component.html',
  styleUrls: ['./pizzeria-answered.component.css']
})
export class PizzeriaAnsweredComponent implements OnInit {

  public answersMap: { [index: number]: string } = {
    1: 'Hello, I\'d like to order some pizza.',
    2: 'Oh, sorry, wrong number!',
    3: '... (uncomfortable silence)'
  };

  public reactionMap: { [index: number]: string } = {
    1: 'Superb choice! Please look at the delicious pizzas we offer.',
    2: 'No problem. Have a nice day!',
    3: 'Omg, I\'m calling the police!'
  };

  public additionsMap: { [index: number]: string } = {
    1: 'Extra crust',
    2: 'Extra cheese',
    3: 'Additional ham'
  };

  public pickAdditions: boolean = false;
  public additionsPicked: boolean = false;
  public delivery: boolean = false;

  constructor(private router: Router,
              private popupService: PopupService,
              public data: DataService) {

    popupService.changeEmitted$.subscribe(
      text => {
        if (text === EmitterMessages.PIZZA_PICKED) {
          this.pizzaPickedAnimation();
        }
      });
  }

  ngOnInit() {}

  chooseAction(key: string) {
    for (let mapKey in this.answersMap) {
      if (mapKey !== key) {
        document.getElementById(mapKey + '-answer').className = 'display-none';
      } else {
        document.getElementById(mapKey + '-answer').className = 'conversation-tile';
        document.getElementById(mapKey + '-answer-paragraph').className = 'your-answer';
      }
    }
    this.createResponse(key);
    this.showPopupWithPizzas();
  }

  private createResponse(key: string) {
    document.getElementById('reaction-img').className = 'tile-hidden tile-img-start-animation';
    document.getElementById('reaction-text').innerText = this.reactionMap[key];
    document.getElementById('reaction-text').className = 'tile-hidden tile-text-start-animation';
  }

  private showPopupWithPizzas() {
    setTimeout(() => {
        this.popupService.emitChange(EmitterMessages.PICK_PIZZA);
      }
      , 2000);
  }

  private pizzaPickedAnimation() {
    document.getElementById('your-pick').className = 'your-answer';
    document.getElementById('picked-img').className = 'tile-hidden tile-img-start-animation';
    document.getElementById('picked-text').className = 'tile-hidden tile-text-start-animation';
    this.pickAdditions = true;
  }

  chooseAddition(key: string) {
    this.data.variables.additions = this.additionsMap[key];
    this.additionsPicked = true;
    for (let mapKey in this.additionsMap) {
      if (mapKey !== key) {
        document.getElementById(mapKey + '-addition').className = 'display-none';
      } else {
        document.getElementById(mapKey + '-addition').className = 'conversation-tile';
        document.getElementById(mapKey + '-addition-paragraph').className = 'your-answer';
      }
    }
    setTimeout(() => {
        this.delivery = true;
        setTimeout(() => {
            document.getElementById('calling-tab').className += ' calling-tab-end-animation';
            setTimeout(() => {
                this.router.navigate(['write-address']);
              }
              , 500);
          }
          , 2000);
      }
      , 1000);
  }
}
