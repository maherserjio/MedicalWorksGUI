import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";


@Injectable({ providedIn: 'root' })
export class dataService {
  params: any = new HttpParams();
  baseUrl: string = "https://localhost:44393/"; //  Our API Is served under this host
   
  constructor(private http: HttpClient) {
  }

  // CLAIM CRUD
  getClaims() {
    return this.http.get(this.baseUrl + 'api/Claim');
  }

  getFilteredClaims(claimsFilter: any) {
    return this.http.post(this.baseUrl + 'api/Claim/filter', claimsFilter);
  }

  getClaim(id: any) {
   return this.http.get(this.baseUrl + 'api/Claim/' + id, id);
  }

  createClaim(claim: any) {
    return this.http.post(this.baseUrl + 'api/Claim', claim, { withCredentials: true });
  }

  updateClaim(claim: any, id: number) {
    return this.http.patch(this.baseUrl + 'api/Claim/' + id, claim, { withCredentials: true });
  }

  deleteClaim(id: any) {
    return this.http.delete(this.baseUrl + 'api/Claim/' + id);
  }


    // Policy CRUD

  createPolicy(policy: any) {
    return this.http.post(this.baseUrl + 'api/Policy', policy, { withCredentials: true });
  }

  getPolicy(id: any) {
    return this.http.get(this.baseUrl+ 'api/Policy/' + id, id);
  }

  getPolicies() {
    return this.http.get(this.baseUrl + 'api/Policy');
  }

  updatePolicy(policy: any, id: number) {
    return this.http.patch(this.baseUrl + 'api/Policy/' + id, policy, { withCredentials: true });
  }
  deletePolicy(id: any) {
    return this.http.delete(this.baseUrl + 'api/Policy/' + id);
  }




  // We need those to populate our Radio group and dropdownlist
  getGenders() {
    return this.http.get(this.baseUrl + 'api/Gender' );
  }


  getRelationships() {
    return this.http.get(this.baseUrl + 'api/Relationship');
  }

}
