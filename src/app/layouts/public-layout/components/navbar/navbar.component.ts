import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { AppBarPositionMode } from '@progress/kendo-angular-navigation'
import { Align } from '@progress/kendo-angular-popup'
import * as svgIcons from '@progress/kendo-svg-icons'
import { TokenService } from 'src/app/services/token/token.service'

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {  
  @ViewChild('anchor', { static: false })
  public anchor!: ElementRef<HTMLElement> // Add the definite assignment assertion here
  public allIcons = svgIcons
  public isUserLogIn: boolean = false;
  public positionMode: AppBarPositionMode = 'sticky'
  public kendokaAvatar =
    'https://www.telerik.com/kendo-angular-ui-develop/components/navigation/appbar/assets/kendoka-angular.png'
  public margin = { horizontal: -46, vertical: 7 }
  public popupAlign: Align = { horizontal: 'right', vertical: 'top' }
  public show = false
  public activeLink = ''
  public isRouteLogin=false;
  public isRouteRegister=false;
  public navLinks = [
    { path: '/', text: 'Home' },
    { path: '/about', text: 'About' },
    { path: '/pricing', text: 'Pricing' },
    { path: '/videos', text: 'Videos' },
    { path: '/testimonials', text: 'Testimonials' },
    { path: '/contact', text: 'Contact' },
  ]

  ngOnInit() {
    this.checkRoute(this.router)

    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.checkRoute(event)
      }  
    })  
    this.activeLink = this.router.url
    // SUBSCRIBE TO THE TOKEN STATUS
    this.tokenService.getTokenStatus().subscribe((status) => {
      this.isUserLogIn = status;
      console.log(this.isUserLogIn);
      
      // UPDATE YOUR BOOLEAN VALUE OR TRIGGER ANY OTHER ACTION HERE
    });  
  }
  
  public checkRoute(event: any){
    const getCurrentRoute= event.url
    const currentRoute=getCurrentRoute.split('/').at(1)
    if(currentRoute === 'register'){
      this.isRouteRegister=true;
      this.isRouteLogin=false;
    }  
    else if(currentRoute === 'login'){
      this.isRouteLogin=true;
      this.isRouteRegister=false;
    }  
    else{
      this.isRouteLogin=false;
      this.isRouteRegister=false;
    }  
}

  onClickLink(link: string) {
    this.activeLink = link
    // Navigate to a specific route
    this.router.navigate([link])
  }
  public onToggle(): void {
    this.show = !this.show
  }

  constructor (
    private zone: NgZone, 
    private router: Router,
    private tokenService: TokenService
  ) {
    // Assign a value to the anchor property in the constructor
    // if you have a specific ElementRef instance to assign.
    // Otherwise, it will be assigned by ViewChild in the lifecycle hook.
  }

  public onButtonClick(): void {
    console.log('click')
  }
  public ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('resize', () => {
        if (this.show) {
          this.zone.run(() => this.onToggle())
        }
      })
    })

  }

  public logout (){
    this.tokenService.removeToken()
    this.router.navigate(['login']);
  }

}
