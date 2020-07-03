import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AppService } from '../app.service';
import * as algoliasearch from "algoliasearch";
const searchClient = algoliasearch(
    'X5I45PX5A1',
    'd344813a13a6a7918a0eefb1e1000666'
);
@Injectable({
    providedIn: 'root'
})
export class ProductListingResolver implements Resolve<any> {
    constructor( private appService: AppService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject)=>{
            searchClient.searchForFacetValues([{
                indexName: 'product',
                params: {
                    facetName: 'categoryLabel',
                    facetQuery: '',
                    filters: 'NOT status:draft'
                }
              }]).then(
                (data : any)=>{
                  console.log(data);
                  let finalObj = data[0].facetHits;
                  finalObj.forEach(obj => { obj.isRefined = false; })
                  resolve(finalObj);
                }
              )
              
        })
    }
}  