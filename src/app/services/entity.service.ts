import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  private path:string;
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient,
              private tokenService: TokenService) { }

  getOne(id) {
    return this.http.get(this.apiUrl + this.path + "/" + id);
  }

  getAll(page?: number, size?: number) {
    return this.http.get(this.apiUrl + this.path + "?page=" + page + "&size=" + size);
  }

  findAll() {
    return this.http.get(this.apiUrl + this.path);
  }

  create(entity, params?) {
    return this.http.post(this.apiUrl + this.path, entity, params);
  }

  update(entity) {
    return this.http.put(this.apiUrl + this.path, entity);
  }

  delete(id) {
    return this.http.delete(this.apiUrl + this.path + "/" + id);
  }

  paginatedSearch(searchDto, page, size) {
    return this.http.post(this.apiUrl + this.path + "?page=" + page + "&size=" + size , searchDto);
  }

  search(searchDto) {
    return this.http.post(this.apiUrl + this.path , searchDto);
  }

  setPath(path: string) {
    this.path = path;
  }

  getDownloadUrl(id) {
    return this.apiUrl + this.path + "/" + id + "?access_token=" + this.tokenService.getToken();
  } 

}
