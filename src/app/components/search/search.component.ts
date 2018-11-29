import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityService } from 'src/app/services/entity.service';
import { SearchDto } from 'src/app/models/SearchDto';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Archive } from '../../models/Archive';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  dto:SearchDto = new SearchDto();
  columns = [
    { columnDef: 'fileName',  header: 'Nom du fichier',     cell: (row: Archive) => `${row.fileName}` },
    { columnDef: 'id',  header: 'ID',     cell: (row: Archive) => `${row.id}`  }
  ];

  dataSource: MatTableDataSource<Archive>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = [];

  constructor(private entityService: EntityService,
              private toastr: ToastrService) {
    
  }

  ngOnInit() {
    this.columns.forEach(element => {
      this.displayedColumns.push(element.columnDef); 
    });
    this.displayedColumns.push('actions');
  }

  search() {
    this.entityService.setPath('/archives/search');
    this.entityService.search(this.dto).subscribe((resp: any) => {
      this.dataSource = new MatTableDataSource<Archive>(resp);
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.toastr.error(error.toString());
    })
  }

  download(row) {
    this.entityService.setPath('/archives/download')
    window.location.href = this.entityService.getDownloadUrl(row.id);
  }

}
