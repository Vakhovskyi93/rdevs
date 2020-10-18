import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from "@angular/router";
import {select, Store} from "@ngrx/store";
import {DateState} from "../modules/date/date.reducer";
import {Observable} from "rxjs";
import {selectDate, selectUpdateDate} from "../modules/date/date.selector";
import {UpdateDate} from "../modules/date/date.actions";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  date  = new Date()
  day = this.date.getDate()
  year = this.date.getFullYear()
  month = this.date.getMonth()
  longMonth;
  templateYear;
  modalDay;

  public day$: Observable<any> = this.store.pipe(select(selectDate))
  public month$: Observable<any> = this.store.pipe(select(selectUpdateDate))

  constructor(
    public nativeElement:   ElementRef,
    private router: Router,
    private store: Store<DateState>
  ) {}

  ngOnInit(): void {
    this.year = new Date().getFullYear()
    this.drawMonth();
  }
  getLustMonth(){
    this.month = this.month - 1;
    this.date = new Date( this.year, this.month - 1);
    this.drawMonth();
  }
  getNextMonth(){
    this.month = this.month + 1;
    this.date = new Date( this.year, this.month + 1);
    this.drawMonth();
  }
  drawMonth(){
    this.templateYear = new Date( this.year,this.month).getFullYear()
    let firstDay = new Date(this.year, this.month).getDay();
    this.longMonth = new Date(this.year,this.month).toLocaleString('en', {
      month: 'long'
    })
    let amountOfDays = new Date(this.year, this.month+1, 0).getDate();
    let days = document.getElementById('days')
    days.innerHTML = '';
    let lustMonth = new Date(this.year, this.month, 0).getDate()
    for (let i = firstDay; i > 0; i-- ){
      days.insertAdjacentHTML('afterbegin', `<div class="dayCellStyle lustMonth" > ${lustMonth}</div>`)
      lustMonth -= 1
    }
    for (let i = 0; i < (amountOfDays); i++ ){
      if (new Date().getMonth() == this.date.getMonth()&& new Date().getFullYear() == this.date.getFullYear() && i == this.day - 1) {
        days.insertAdjacentHTML('beforeend', `<div  class="dayCell dayCellStyle today"  >${i+1}</div>` )
      } else {
        days.insertAdjacentHTML('beforeend', `<div  class="dayCell dayCellStyle"  >${i+1}</div>` )
      }

    }
    let dayCellStyle = this.nativeElement.nativeElement.getElementsByClassName('dayCellStyle')
    let next = 0

    for( let i = dayCellStyle.length; i % 7 !== 0; i++){
      next += 1

      days.insertAdjacentHTML('beforeend', `<div  class="dayCellStyle nextMonth" >${next }</div>` )
    }

    for( let i = 0; i < dayCellStyle.length; i++){
      dayCellStyle[i].addEventListener('click', (e) => {
        for(  let i = 0; i < dayCellStyle.length; i++){ dayCellStyle[i].classList.remove( 'choosed' ) }
        if ( e.target.classList.contains('nextMonth') ) this.getNextMonth()
        if ( e.target.classList.contains('lustMonth') ) this.getLustMonth()
        if ( e.target.classList.contains('dayCell') ) {
          e.target.classList.add('choosed')
          this.modalDay = new Date( this.year,this.month, e.target.textContent ).toLocaleDateString( 'en-US', {weekday: 'long', day: '2-digit'})
          this.store.dispatch( new UpdateDate({day: this.modalDay, month:this.longMonth} ) )
        }
      })
    }

  }

  resetSelectedDate(){
    this.modalDay = ''
    this.drawMonth()

  }

}
