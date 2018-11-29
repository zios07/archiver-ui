import { Component, OnInit } from '@angular/core';
import { EntityService } from 'src/app/services/entity.service';
import { SearchDto } from 'src/app/models/SearchDto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  dto:SearchDto = new SearchDto();

  constructor(private entityService: EntityService,
              private toastr: ToastrService) {
    
  }

  ngOnInit() {
    
  }

  search() {
    console.log(this.dto);
    this.entityService.setPath('/archives/search');
    this.entityService.search(this.dto).subscribe(resp => {
      this.toastr.info(resp.toString());
    }, error => {
      this.toastr.error(error.toString());
    })
  }

}
