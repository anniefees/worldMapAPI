import { Component, inject, ElementRef  } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './map.component.html',
})

export class MapComponent {
  name: any;
  capital: string;
  region: string;
  incomeLevel: string;
  longitude: string;
  latitude: string ;
  data: any= [];
  dataPath: any= [];
  currCountryCode: string = 'au'; //As an example, I set it to Australia’s code
  private httpClient = inject(HttpClient);

  constructor(private elementRef: ElementRef) {
    this.name = '';
    this.capital = '';
    this.region = '';
    this.incomeLevel  = '';
    this.longitude= '';
    this.latitude = '';
  }

  private ngAfterViewInit() {
    const svgElement = this.elementRef.nativeElement.querySelector('svg');
    svgElement.querySelectorAll('path').forEach((path: SVGPathElement) => {
      path.addEventListener('click', () => {
        this.handleClick(path.id); //trying to figure out how to get this to lazy load call this function from infoTable
      });//attaches a click event to each SVG path and retrieves the id of the country clicked
    });
  }
  private handleClick(pathId: string) {// Handle the click event for the specific path and return path ID to the console
    this.currCountryCode = pathId;
    this.fetchData(this.currCountryCode); //calls the function to actually retrieve the data
  }

  private displayInfo(infoFromApi: any){ //sets the values for the table
    this.name = infoFromApi[1][0].name;
    this.capital = infoFromApi[1][0].capitalCity;
    this.region = infoFromApi[1][0].region.value;
    this.incomeLevel  = infoFromApi[1][0].incomeLevel.value;
    this.longitude= infoFromApi[1][0].latitude;
    this.latitude = infoFromApi[1][0].longitude;
  }

  private fetchData(countryCode: string): void{
    let url = 'https://api.worldbank.org/v2/country/'+countryCode+'?format=json'; //concanates the url with the countryCode
    this.httpClient.get(url) //retrieves the url
    .subscribe((posts) => {
      this.data = posts; 
      this.displayInfo(this.data); //calls method to display data

    });
  }
    
   
  

};
