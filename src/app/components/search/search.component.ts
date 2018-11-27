import { Component, OnInit } from '@angular/core';
import { EntityService } from '../../services/entity.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  dateFrom;
  dateTo;

  constructor(private entityService: EntityService) {
    
  }

  ngOnInit() {
    
  }

  search() {
    console.log(this.dateFrom);
    console.log(this.dateTo);
    this.entityService.setPath('/search?from' + this.dateFrom + "&to=" + this.dateTo);
    this.entityService.findAll().subscribe(resp => {
      console.log(resp);
    }, error => {
      console.log(error);
    })
  }

}
