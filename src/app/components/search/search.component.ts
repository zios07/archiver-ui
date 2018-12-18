import { Component, OnInit, ViewChild } from "@angular/core";
import { EntityService } from "src/app/services/entity.service";
import { SearchDto } from "src/app/models/SearchDto";
import { ToastrService } from "ngx-toastr";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { Archive } from "../../models/Archive";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  dto: SearchDto = new SearchDto();
  showTable: boolean = false;
  columns = [
    {
      columnDef: "consumer",
      header: "Institute",
      cell: (row: Archive) => `${row.consumer.institute}`
    },
    {
      columnDef: "id",
      header: "Transaction Id",
      cell: (row: Archive) => `${row.consumer.transactionId}`
    },
    {
      columnDef: "legalContext",
      header: "Legal Context",
      cell: (row: Archive) => `${row.consumer.legalContext}`
    },
    {
      columnDef: "keyValue",
      header: "KeyValue",
      cell: (row: Archive) => `${row.consumer.keyValue}`
    },
    {
      columnDef: "externalTimestamp",
      header: "External Timestamp",
      cell: (row: Archive) => `${row.consumer.externalTimestamp}`
    }
  ];

  dataSource: MatTableDataSource<Archive>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = [];
  archivesDetails = [];

  constructor(
    private entityService: EntityService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.columns.forEach(element => {
      this.displayedColumns.push(element.columnDef);
    });
  }

  search() {
    this.entityService.setPath("/archives/search");
    this.entityService.search(this.dto).subscribe(
      (resp: any) => {
        this.archivesDetails = resp.details;
        this.showTable = true;
        this.dataSource = new MatTableDataSource<Archive>(resp.archives);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.toastr.error(error.toString());
      }
    );
  }

  download(id) {
    this.entityService.setPath("/archives/download");
    window.location.href = this.entityService.getDownloadUrl(id);
  }
}
