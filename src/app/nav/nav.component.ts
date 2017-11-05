import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import {ElasticsearchService} from '../elasticsearch.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isConnected = false;

  form: FormGroup;
  status: string;

  constructor(private route: ActivatedRoute, private router: Router, private fbuilder: FormBuilder, private es: ElasticsearchService, private cd: ChangeDetectorRef ) {
    this.isConnected = false;

    this.form = fbuilder.group({
      index: '',
    });
  }

  ngOnInit() {
    this.isUserLoggedIn();
    this.es.isAvailable().then(() => {
      this.status = 'OK';
      this.isConnected = true;
    }, error => {
      this.status = 'ERROR';
      this.isConnected = false;
      console.error('Server is down', error);
    }).then(() => {
      this.cd.detectChanges();
    });
  }

  onSubmit(value) {

    this.es.createIndex({ index: value.index}).then(
      result => {
        console.log(result);
        alert('Index added, see log for more info');
      }, error => {
        alert('Something went wrong, see log for more info');
        console.error(error);
      }
    );
  }

  isUserLoggedIn()
  {
  	/*this.router.events.subscribe(val => {

            if (val instanceof RoutesRecognized) {

                console.log(val.state.root.firstChild.params);

            }
        });*/
  	//this.route.params.subscribe( params => console.log(params['name']) );
  		/*console.log(params);
        	if(params == {})
        		return false;
        	else
        		return true;
      	});*/
  }
}
