import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

/* 
use those apis to get user geolocations and nationality all apis accept get request
https://backofficeapi.khaleejgate.com/api/GetAllCountriesByLangName?LangCode=en
returns all countries with country codes
*********
https://api.ipify.org/?format=json
returns users ip adress
*********
use ip adress to get user geo location and country
https://ipapi.co/${ip-adress}/json/
*/

@Injectable({
  providedIn: 'root'
})
export class MyApisService {

  constructor(private _http:HttpClient) { }
  GetAllCountries():Observable<any>{
    return this._http.get<Countries>(`https://backofficeapi.khaleejgate.com/api/GetAllCountriesByLangName?LangCode=en`)
  }
  getUserIpAdress():Observable<any>{
    return this._http.get<ipAddress>(`https://api.ipify.org/?format=json`)
  }
  getGeoLocation(ip_adress):Observable<any>{
    return this._http.get<GeoLocation>(`https://ipapi.co/${ip_adress}/json/`)
  }

}
export interface ipAddress {
  ip:any

}
export interface Countries {
  pseudoCountryCode: string,
  countryName: any,
  regionName: string,
  phoneCode: number
}

export interface GeoLocation {
  ip: number,
  network:number,
  version: string,
  city: string,
  region: string,
  region_code: string,
  country: string,
  country_name: string,
  country_code: string,
  country_code_iso3: string,
  country_capital: string,
  country_tld: string,
  continent_code: string,
  in_eu: false,
  postal: null,
  latitude: number,
  longitude: number,
  timezone: string,
  utc_offset:number,
  country_calling_code: number,
  currency: string,
  currency_name: string,
  languages: string,
  country_area:number,
  country_population: number,
  asn: string,
  org: string
}