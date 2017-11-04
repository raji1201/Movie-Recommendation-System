import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  isUserLoggedIn()
  {
  	/*this.router.events.subscribe(val => {

            if (val instanceof RoutesRecognized) {

                console.log(val.state.root.firstChild.params);

            }
        });*/
  	//this.activatedRoute.params.subscribe( params => console.log(params) );
  		/*console.log(params);
        	if(params == {})
        		return false;
        	else
        		return true;
      	});*/
  }
}
